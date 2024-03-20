package org.antonus.anothertime;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.github.benmanes.caffeine.cache.Caffeine;
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
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.util.Assert;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import java.awt.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
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
        Assert.notNull(anothertimeProperties.getAwtrixUrl(),"Please set anothertime.awtrix-url");
        RestClient restClient = builder
                .baseUrl(anothertimeProperties.getAwtrixUrl())
                .requestFactory(new JdkClientHttpRequestFactory())
                .messageConverters(httpMessageConverters -> {
                    var jsonConverter = new MappingJackson2HttpMessageConverter();
                    jsonConverter.setSupportedMediaTypes(List.of(new MediaType("text", "json")));
                    httpMessageConverters.add(jsonConverter);
                })
                .build();

        return HttpServiceProxyFactory.builder()
                .exchangeAdapter(RestClientAdapter.create(restClient))
                .build()
                .createClient(AwtrixClient.class);
    }

    @Bean
    @SneakyThrows
    IMqttClient publisher(AwtrixService awtrixService) {
        Assert.notNull(anothertimeProperties.getBrokerUrl(),"Please set anothertime.broker-url");
        IMqttClient publisher = new MqttClient(anothertimeProperties.getBrokerUrl(), UUID.randomUUID().toString(), new MemoryPersistence());
        MqttConnectOptions options = new MqttConnectOptions();
        if (null != anothertimeProperties.getBrokerUsername()) {
            options.setUserName(anothertimeProperties.getBrokerUsername());
        }
        if (null != anothertimeProperties.getBrokerPassword()) {
            options.setPassword(anothertimeProperties.getBrokerPassword().toCharArray());
        }
        options.setAutomaticReconnect(true);
        options.setCleanSession(true);
        options.setConnectionTimeout(10);
        publisher.connect(options);
        publisher.subscribe(anothertimeProperties.getAwtrixTopic()+"/stats", (topic, message) -> awtrixService.handleStats(message));
        publisher.subscribe(anothertimeProperties.getAwtrixTopic()+"/stats/currentApp", (topic, message) -> awtrixService.handleCurrentApp(message));
        return publisher;
    }

    @Bean
    @SneakyThrows
    SensorService sensorService(IMqttClient publisher, AwtrixService awtrixService) {
        return switch (anothertimeProperties.getSensorType()) {
            case AWTRIX -> new AwtrixSensorService(awtrixService);
            case MQTT -> {
                MqttSensorService mqttSensorService = new MqttSensorService();
                String topic = anothertimeProperties.getMqttSensor().getTopic();
                String humidity = anothertimeProperties.getMqttSensor().getHumidity();
                String temperature = anothertimeProperties.getMqttSensor().getTemperature();
                if (null == topic) {
                    publisher.subscribe(humidity, ((t, message) -> mqttSensorService.handleHumidity(message)));
                    publisher.subscribe(temperature, ((t, message) -> mqttSensorService.handleTemperature(message)));
                } else {
                    publisher.subscribe(topic, ((t, message) -> mqttSensorService.handleJson(message, humidity, temperature)));
                }
                yield mqttSensorService;
            }
        };
    }

    @Bean
    CaffeineCache iconsCache() {
        return new CaffeineCache("icons", Caffeine.newBuilder().expireAfterWrite(30, TimeUnit.DAYS).build());
    }

    @Bean
    CaffeineCache settingsCache() {
        return new CaffeineCache("settings", Caffeine.newBuilder().expireAfterWrite(30, TimeUnit.DAYS).build());
    }

    @Bean("dimmedIconKeyGenerator")
    public KeyGenerator keyGenerator() {
        return (target, method, params) -> {
            // param0 : icon
            // param1 : defaultIcon
            // param2 : dim

            var dim = (float) params[2];
            BigDecimal rounded = (new BigDecimal(dim)).setScale(2, RoundingMode.FLOOR);

            return  params[0] + "_" + params[1] + "_" + rounded;
        };
    }

    @Bean
    Module colorModule(ColorConverter colorConverter) {
        SimpleModule colorModule = new SimpleModule();
        colorModule.addSerializer(Color.class, new ColorToStringConverter());
        colorModule.addDeserializer(Color.class, new StringToColorConverter(colorConverter));
        return colorModule;
    }

}
