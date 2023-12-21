package org.antonus.anothertime.widget;

import lombok.RequiredArgsConstructor;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.config.AnothertimeProperties.WidgetsProperties.HumidityWidgetProperties;
import org.antonus.anothertime.model.Bitmap;
import org.antonus.anothertime.model.Draw;
import org.antonus.anothertime.model.Text;
import org.antonus.anothertime.service.IconsService;
import org.antonus.anothertime.service.SensorService;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.antonus.anothertime.utils.ColorUtils.dimColor;

@Component
@RequiredArgsConstructor
public class HumidityWidget implements Widget {

    private final SensorService sensorService;
    private final IconsService iconsService;
    private final AnothertimeProperties anothertimeProperties;
    public final static String DEFAULT_ICON = "smallhumidity.gif";

    @Override
    public Boolean enabled() {
        return anothertimeProperties.getWidgets().getHumidity().getEnabled();
    }

    @Override
    public List<Draw> drawList(int offset, float dim) {

        if (outboundOffset(offset)) {
            return Collections.emptyList();
        }

        HumidityWidgetProperties properties = anothertimeProperties.getWidgets().getHumidity();
        Color color = dimColor(iconsService.defaultColorIfNull(properties.getColor()), dim);

        List<Draw> drawList = new ArrayList<>();

        var humidityIcon = iconsService.getDimmedIcon(properties.getIcon().getName(), DEFAULT_ICON, dim);

        boolean hasIcon = null != humidityIcon;

        int xpos = 19;

        // Won't manage 100%, cap to 99%
        int humidity = Math.min(sensorService.getHumidity(),99);

        if (humidity < 10) {
            xpos += 4;
        }

        if (hasIcon) {
            drawList.add(new Bitmap(xpos + properties.getIcon().getX(), offset + properties.getIcon().getY(), 8, 8, humidityIcon));
            xpos += 3;
        }

        drawList.add(new Text(xpos + 3, 1 + offset, String.valueOf(humidity), color));

        return drawList;

    }
}
