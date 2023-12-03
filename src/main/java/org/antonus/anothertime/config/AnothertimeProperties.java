package org.antonus.anothertime.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "anothertime")
@Data
public class AnothertimeProperties {
    private String brokerUrl = "tcp://localhost:1883";
    private String apiUrl = "http://192.168.1.92/api";
}
