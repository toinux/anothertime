package org.antonus.anothertime;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.hivemq.client.mqtt.MqttClient;
import com.hivemq.client.mqtt.mqtt3.Mqtt3AsyncClient;
import com.hivemq.client.mqtt.mqtt3.message.connect.Mqtt3Connect;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.config.ColorConverter;
import org.antonus.anothertime.converters.ColorToStringConverter;
import org.antonus.anothertime.converters.StringToColorConverter;
import org.antonus.anothertime.rest.AwtrixClient;
import org.antonus.anothertime.service.AwtrixSensorService;
import org.antonus.anothertime.service.AwtrixService;
import org.antonus.anothertime.service.MqttSensorService;
import org.antonus.anothertime.service.SensorService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.http.converter.json.JacksonJsonHttpMessageConverter;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.util.Assert;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;
import tools.jackson.databind.JacksonModule;
import tools.jackson.databind.module.SimpleModule;

import java.awt.*;
import java.net.URI;
import java.util.ArrayList;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
@EnableConfigurationProperties(AnothertimeProperties.class)
@EnableScheduling
@EnableAsync
@EnableCaching
@RequiredArgsConstructor
public class AnothertimeApplication {

    private final AnothertimeProperties anothertimeProperties;

    public static void main(String[] args) {
        SpringApplication.run(AnothertimeApplication.class, args);
    }

    @Bean
    AwtrixClient awtrixClient(RestClient.Builder builder) {
        Assert.notNull(anothertimeProperties.getAwtrixUrl(), "Please set anothertime.awtrix-url");
        RestClient restClient = builder
                .baseUrl(anothertimeProperties.getAwtrixUrl())
                .requestFactory(new JdkClientHttpRequestFactory()).configureMessageConverters(httpMessageConverters -> {
                    var jsonConverter = new JacksonJsonHttpMessageConverter();
                    var mediaTypes = new ArrayList<>(jsonConverter.getSupportedMediaTypes());
                    mediaTypes.add(new MediaType("text", "json"));
                    jsonConverter.setSupportedMediaTypes(mediaTypes);
                    httpMessageConverters.withJsonConverter(jsonConverter);
                })
                .build();

        return HttpServiceProxyFactory.builder()
                .exchangeAdapter(RestClientAdapter.create(restClient))
                .build()
                .createClient(AwtrixClient.class);
    }

    @Bean
    @SneakyThrows
    Mqtt3AsyncClient mqttClient(AwtrixService awtrixService) {
        Assert.notNull(anothertimeProperties.getBrokerUrl(), "Please set anothertime.broker-url");

        var brokerUri = new URI(anothertimeProperties.getBrokerUrl());
        String host = brokerUri.getHost();
        int port = brokerUri.getPort() != -1 ? brokerUri.getPort() : 1883;

        var client = MqttClient.builder().useMqttVersion3()
                .identifier(UUID.randomUUID().toString())
                .serverHost(host)
                .serverPort(port)
                .buildAsync();


        if (null != anothertimeProperties.getBrokerUsername()) {
            var auth = Mqtt3Connect.builder().simpleAuth().username(anothertimeProperties.getBrokerUsername());

            if (null == anothertimeProperties.getBrokerPassword()) {
                client.connect(auth.applySimpleAuth().build());
            } else {
                client.connect(auth.password(anothertimeProperties.getBrokerPassword().getBytes()).applySimpleAuth().build());
            }
        } else {
            client.connect();
        }

        client.subscribeWith()
                .topicFilter(anothertimeProperties.getAwtrixTopic() + "/stats")
                .callback(awtrixService::handleStats)
                .send();

        client.subscribeWith()
                .topicFilter(anothertimeProperties.getAwtrixTopic() + "/stats/currentApp")
                .callback(awtrixService::handleCurrentApp)
                .send();

        return client;
    }

    @Bean
    @SneakyThrows
    SensorService sensorService(Mqtt3AsyncClient client, AwtrixService awtrixService) {
        return switch (anothertimeProperties.getSensorType()) {
            case AWTRIX -> new AwtrixSensorService(awtrixService);
            case MQTT -> {
                MqttSensorService mqttSensorService = new MqttSensorService();
                String topic = anothertimeProperties.getMqttSensor().getTopic();
                String humidity = anothertimeProperties.getMqttSensor().getHumidity();
                String temperature = anothertimeProperties.getMqttSensor().getTemperature();
                if (null == topic) {
                    client.subscribeWith()
                            .topicFilter(humidity)
                            .callback(mqttSensorService::handleHumidity)
                            .send();
                    client.subscribeWith()
                            .topicFilter(temperature)
                            .callback(mqttSensorService::handleTemperature)
                            .send();

                } else {
                    client.subscribeWith()
                            .topicFilter(topic)
                            .callback((message) -> mqttSensorService.handleJson(message, humidity, temperature))
                            .send();

                }
                yield mqttSensorService;
            }
        };
    }

    @Bean
    CacheManager cacheManager() {
        var cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(Caffeine.newBuilder().expireAfterWrite(30, TimeUnit.DAYS));
        return cacheManager;
    }

    @Bean
    JacksonModule colorModule(ColorConverter colorConverter) {
        SimpleModule colorModule = new SimpleModule();
        colorModule.addSerializer(Color.class, new ColorToStringConverter());
        colorModule.addDeserializer(Color.class, new StringToColorConverter(colorConverter));
        return colorModule;
    }

}
