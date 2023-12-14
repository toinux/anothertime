package org.antonus.anothertime.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.antonus.anothertime.config.AnothertimeProperties;


@Data
@NoArgsConstructor
public class AnothertimePropertiesDto {
    private AnothertimeProperties.TimeProperties time;
    private AnothertimeProperties.WeekProperties week;
    private AnothertimeProperties.WidgetsProperties widgets;
    private AnothertimeProperties.SecondsProperties seconds;
}