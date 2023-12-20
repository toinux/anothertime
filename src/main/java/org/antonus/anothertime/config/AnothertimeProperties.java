package org.antonus.anothertime.config;

import lombok.Data;
import org.antonus.anothertime.types.*;
import org.antonus.anothertime.widget.CalendarWidget;
import org.antonus.anothertime.widget.HumidityWidget;
import org.antonus.anothertime.widget.TemperatureWidget;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.awt.*;

@ConfigurationProperties(prefix = "anothertime")
@Data
public class AnothertimeProperties {
    private String brokerUrl;
    private String brokerUsername;
    private String brokerPassword;
    private String awtrixUrl;
    private String awtrixTopic;
    private Boolean pauseIfHidden = false;
    private TimeProperties time = new TimeProperties();
    private WeekProperties week = new WeekProperties();
    private WidgetsProperties widgets = new WidgetsProperties();
    private SecondsProperties seconds = new SecondsProperties();
    private SensorType sensorType = SensorType.AWTRIX;
    private MqttSensorProperties mqttSensor = new MqttSensorProperties();

    @Data
    public static class MqttSensorProperties {
        private String topic;
        private String humidity;
        private String temperature;
    }

    @Data
    public static class SecondsProperties {
        private Color color;
        private Color backgroundColor;
    }
    @Data
    public static class TimeProperties {
        private TimeAnimation animation = TimeAnimation.FADE;
        private SeparatorAnimation separator = SeparatorAnimation.FADE;
        private Color hourColor;
        private Color minutesColor;
        private Color separatorColor;
    }

    @Data
    public static class WeekProperties {
        private Boolean startSunday = false;
        private WeekStyle style = WeekStyle.DOTTED2;
        private Color dayColor;
        private Color weekColor;
    }


    @Data
    public static class WidgetsProperties {
        private WidgetAnimation animation = WidgetAnimation.SCROLL;
        private CalendarWidgetProperties calendar = new CalendarWidgetProperties();
        private TemperatureWidgetProperties temperature = new TemperatureWidgetProperties();
        private HumidityWidgetProperties humidity = new HumidityWidgetProperties();

        @Data
        public static class WidgetProperties {
            private Boolean enabled = true;
            private Color color;
        }

        @Data
        public static class CalendarWidgetProperties extends WidgetProperties {
            private CalendarStyle style = CalendarStyle.ICON;
            private String icon = CalendarWidget.DEFAULT_ICON;
            private Color headColor;
            private Color bodyColor;
            private Color textColor;
        }

        @Data
        public static class TemperatureWidgetProperties extends WidgetProperties {
            private Boolean fahrenheit = false;
            private String icon = TemperatureWidget.DEFAULT_ICON;
        }

        @Data
        public static class HumidityWidgetProperties extends WidgetProperties {
            private String icon = HumidityWidget.DEFAULT_ICON;
        }
    }


}
