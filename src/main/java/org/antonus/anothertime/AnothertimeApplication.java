package org.antonus.anothertime;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.rest.AwtrixClient;
import org.antonus.anothertime.service.AwtrixService;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
@EnableConfigurationProperties(AnothertimeProperties.class)
@EnableScheduling
@EnableAsync
@EnableCaching
public class AnothertimeApplication {

    public static void main(String[] args) {
        SpringApplication.run(AnothertimeApplication.class, args);
    }

    @Bean
    AwtrixClient awtrixClient(RestClient.Builder builder, AnothertimeProperties anothertimeProperties) {

        RestClient restClient = builder.baseUrl(anothertimeProperties.getAwtrixUrl()).requestFactory(new JdkClientHttpRequestFactory()).build();

        return HttpServiceProxyFactory.builder()
                .exchangeAdapter(RestClientAdapter.create(restClient))
                .build()
                .createClient(AwtrixClient.class);
    }

    @Bean
    IMqttClient publisher(AnothertimeProperties anothertimeProperties, AwtrixService awtrixServiceService) throws MqttException {
        IMqttClient publisher = new MqttClient(anothertimeProperties.getBrokerUrl(), UUID.randomUUID().toString(), new MemoryPersistence());
        MqttConnectOptions options = new MqttConnectOptions();
        options.setAutomaticReconnect(true);
        options.setCleanSession(true);
        options.setConnectionTimeout(10);
        publisher.connect(options);
        publisher.subscribe(anothertimeProperties.getAwtrixTopic()+"/stats", (topic, message) -> awtrixServiceService.handleStats(message));
        return publisher;
    }

    @Bean
    CaffeineCache awtrixCache() {
        return new CaffeineCache("awtrix", Caffeine.newBuilder().expireAfterWrite(20, TimeUnit.SECONDS).build());
    }

    @Bean
    CaffeineCache iconsCache() {
        return new CaffeineCache("icons", Caffeine.newBuilder().expireAfterWrite(30, TimeUnit.DAYS).build());
    }


}
