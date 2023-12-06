package org.antonus.anothertime.config;

import lombok.Data;
import org.antonus.anothertime.animationtypes.SeparatorAnimation;
import org.antonus.anothertime.animationtypes.TimeAnimation;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.awt.*;

@ConfigurationProperties(prefix = "anothertime")
@Data
public class AnothertimeProperties {
    private String brokerUrl = "tcp://localhost:1883";
    private String awtrixUrl = "http://192.168.1.92";
    private String awtrixTopic = "awtrix_xxx";
    private Boolean pauseIfHidden = false;
    private Time time = new Time();
    private Color defaultColor = Color.WHITE;

    @Data
    public static class Time {
        private TimeAnimation animation = TimeAnimation.SCROLL;
        private SeparatorAnimation separator = SeparatorAnimation.NONE;
    }
}
