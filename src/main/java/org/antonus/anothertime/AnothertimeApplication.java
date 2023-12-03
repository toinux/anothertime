package org.antonus.anothertime;

import jakarta.annotation.PreDestroy;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.rest.AwtrixClient;
import org.antonus.anothertime.service.AnothertimeService;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import java.util.List;
import java.util.UUID;

@SpringBootApplication
@EnableConfigurationProperties(AnothertimeProperties.class)
@EnableScheduling
@EnableAsync
public class AnothertimeApplication {

    public static void main(String[] args) {
        SpringApplication.run(AnothertimeApplication.class, args);
    }

    @Bean
    AwtrixClient awtrixClient(RestClient.Builder builder, AnothertimeProperties anothertimeProperties) {

        RestClient restClient = builder.baseUrl(anothertimeProperties.getApiUrl()).requestFactory(new JdkClientHttpRequestFactory()).build();

        return HttpServiceProxyFactory.builder()
                .exchangeAdapter(RestClientAdapter.create(restClient))
                .build()
                .createClient(AwtrixClient.class);
    }

}
