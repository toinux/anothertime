package org.antonus.anothertime.config;

import lombok.Data;
import org.antonus.anothertime.types.SeparatorAnimation;
import org.antonus.anothertime.types.TimeAnimation;
import org.antonus.anothertime.types.WeekStyle;
import org.antonus.anothertime.types.WidgetAnimation;
import org.antonus.anothertime.widget.HumidityWidget;
import org.antonus.anothertime.widget.TemperatureWidget;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.awt.*;

@ConfigurationProperties(prefix = "anothertime")
@Data
public class AnothertimeProperties {
    private String brokerUrl = "tcp://localhost:1883";
    private String awtrixUrl = "http://192.168.1.92";
    private String awtrixTopic = "awtrix_xxx";
    private Boolean pauseIfHidden = false;
    private TimeProperties time = new TimeProperties();
    private WeekProperties week = new WeekProperties();
    private WidgetsProperties widgets = new WidgetsProperties();
    private SecondsProperties seconds = new SecondsProperties();

    @Data
    public static class SecondsProperties {
        private Color color;
    }
    @Data
    public static class TimeProperties {
        private TimeAnimation animation = TimeAnimation.SCROLL;
        private SeparatorAnimation separator = SeparatorAnimation.NONE;
        private Color hourColor;
        private Color minutesColor;
        private Color separatorColor;
    }

    @Data
    public static class WeekProperties {
        private Boolean startSunday = false;
        private WeekStyle style = WeekStyle.DOTTED2;
        private Color dayColor;
        private Color weekColor = Color.darkGray;
    }


    @Data
    public static class WidgetsProperties {
        private WidgetAnimation animation = WidgetAnimation.SCROLL;
        private CalendarWidgetProperties calendar = new CalendarWidgetProperties();
        private TemperatureWidgetProperties temperature = new TemperatureWidgetProperties();
        private HumidityWidgetProperties humidity = new HumidityWidgetProperties();
        private Boolean enabled = true;

        @Data
        public static class WidgetProperties {
            private Boolean enabled = true;
            private Color color;
        }

        @Data
        public static class CalendarWidgetProperties extends WidgetProperties {
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
