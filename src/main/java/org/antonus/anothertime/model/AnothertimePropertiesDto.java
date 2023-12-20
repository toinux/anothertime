package org.antonus.anothertime.model;

import org.antonus.anothertime.types.*;

import java.awt.*;

public record AnothertimePropertiesDto(
        TimeProperties time,
        WeekProperties week,
        WidgetsProperties widgets,
        SecondsProperties seconds
) {

    public record TimeProperties(
            TimeAnimation animation,
            SeparatorAnimation separator,
            Color hourColor,
            Color minutesColor,
            Color separatorColor
    ) {
    }

    public record WeekProperties(
            Boolean startSunday,
            WeekStyle style,
            Color dayColor,
            Color weekColor
    ) {
    }

    public record WidgetsProperties(
            WidgetAnimation animation,
            CalendarWidgetProperties calendar,
            TemperatureWidgetProperties temperature,
            HumidityWidgetProperties humidity
    ) {
        public record CalendarWidgetProperties(
                Boolean enabled,
                CalendarStyle style,
                Color color,
                String icon,
                Color headColor,
                Color bodyColor,
                Color textColor
        ) {
        }

        public record TemperatureWidgetProperties(Boolean enabled, Boolean fahrenheit, String icon, Color color) {
        }

        public record HumidityWidgetProperties(Boolean enabled, String icon, Color color) {
        }

    }

    public record SecondsProperties(Color color, Color backgroundColor) {
    }

}