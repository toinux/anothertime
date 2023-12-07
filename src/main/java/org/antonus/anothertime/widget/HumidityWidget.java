package org.antonus.anothertime.widget;

import lombok.RequiredArgsConstructor;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.config.AnothertimeProperties.WidgetsProperties.HumidityWidgetProperties;
import org.antonus.anothertime.model.AwtrixStats;
import org.antonus.anothertime.model.Bitmap;
import org.antonus.anothertime.model.Draw;
import org.antonus.anothertime.model.Text;
import org.antonus.anothertime.service.AwtrixService;
import org.antonus.anothertime.service.IconsService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.antonus.anothertime.utils.ColorUtils.dimColor;

@Component
@ConditionalOnProperty(value = "anothertime.widgets.humidity.enabled", matchIfMissing = true)
@RequiredArgsConstructor
public class HumidityWidget implements Widget {

    private final AwtrixService awtrixService;
    private final IconsService iconsService;
    private final AnothertimeProperties anothertimeProperties;
    public final static String DEFAULT_ICON = "smallhumidity.gif";

    @Override
    public List<Draw> drawList(int offset, float dim) {

        HumidityWidgetProperties properties = anothertimeProperties.getWidgets().getHumidity();
        Color color = dimColor(iconsService.defaultColorIfNull(properties.getColor()), dim);

        List<Draw> drawList = new ArrayList<>();

        var humidityIcon = iconsService.getDimmedIcon(properties.getIcon(), DEFAULT_ICON, dim);

        boolean hasIcon = null != humidityIcon;

        if (outboundOffset(offset)) {
            return Collections.emptyList();
        }

        int xpos = 19;

        AwtrixStats awtrixStats = awtrixService.getAwtrixStats();

        // Won't manage 100%, cap to 99%
        int humidity = null == awtrixStats ? 0 : Math.min(awtrixStats.hum(),99);

        if (humidity < 10) {
            xpos += 4;
        }

        if (hasIcon) {
            drawList.add(new Bitmap(xpos, offset, 8, 8, humidityIcon));
            xpos += 3;
        }

        drawList.add(new Text(xpos + 3, 1 + offset, String.valueOf(humidity), color));

        return drawList;

    }
}
