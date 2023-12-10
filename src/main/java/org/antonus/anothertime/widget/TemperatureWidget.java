package org.antonus.anothertime.widget;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.config.AnothertimeProperties.WidgetsProperties.TemperatureWidgetProperties;
import org.antonus.anothertime.model.*;
import org.antonus.anothertime.service.IconsService;
import org.antonus.anothertime.service.SensorService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.antonus.anothertime.utils.ColorUtils.dimColor;

@Component
@ConditionalOnProperty(value = "anothertime.widgets.temperature.enabled", matchIfMissing = true)
@RequiredArgsConstructor
public class TemperatureWidget implements Widget {

    private final SensorService sensorService;
    private final IconsService iconsService;
    private final AnothertimeProperties anothertimeProperties;
    public static final String DEFAULT_ICON = "temperaturesmall.gif";

    @Override
    @SneakyThrows
    public List<Draw> drawList(int offset, float dim) {

        if (outboundOffset(offset)) {
            return Collections.emptyList();
        }

        List<Draw> drawList = new ArrayList<>();

        TemperatureWidgetProperties properties = anothertimeProperties.getWidgets().getTemperature();
        Color color = dimColor(iconsService.defaultColorIfNull(properties.getColor()), dim);

        var temperatureIcon = iconsService.getDimmedIcon(properties.getIcon(), DEFAULT_ICON, dim);

        boolean hasIcon = null != temperatureIcon;

        int xpos = 19;

        int temp = getTemperature();
        boolean tempNegative = false;
        if (temp < 0) {
            tempNegative = true;
            temp = Math.abs(temp);
        }

        if (temp < 10) {
            xpos += 4;
        }

        boolean tooLarge = temp > 99;
        if (tooLarge) {
            xpos -= 3;
        }

        if (hasIcon && !tooLarge) {
            drawList.add(new Bitmap(tempNegative ? (temp > 9 ? xpos - 1 : xpos - 3) : xpos, offset, 8, 8, temperatureIcon));
            xpos += 3;
        }

        // smaller '-' sign
        if (tempNegative) {
            if (!hasIcon || temp < 10) {
                drawList.add(new Line(xpos, 3 + offset, xpos + 1, 3 + offset, color));
            } else {
                // Very small space : shift - sign next to the temperature digits when temperature icon
                drawList.add(new Line(xpos + 1, 3 + offset, xpos + 2, 3 + offset, color));
            }
        }

        drawList.add(new Text(xpos + 3, 1 + offset, String.valueOf(temp), color));

        // smaller ° sign
        if (!hasIcon || tooLarge) {
            drawList.add(new Pixel(31, 1 + offset, color));
        }

        return drawList;
    }

    private int getTemperature() {
        int temp = sensorService.getTemperature();
        if (anothertimeProperties.getWidgets().getTemperature().getFahrenheit()) {
            return (int) (temp * 1.8 + 32);
        }
        return temp;
    }
}
