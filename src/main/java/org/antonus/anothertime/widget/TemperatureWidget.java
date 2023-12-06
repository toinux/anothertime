package org.antonus.anothertime.widget;

import lombok.SneakyThrows;
import org.antonus.anothertime.model.*;
import org.antonus.anothertime.service.AwtrixService;
import org.antonus.anothertime.service.IconsService;

import java.awt.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.antonus.anothertime.utils.ColorUtils.dimColor;

public class TemperatureWidget implements Widget {

    private final AwtrixService awtrixService;
    private final IconsService iconsService;
    public TemperatureWidget(AwtrixService awtrixService, IconsService iconsService) {
        this.iconsService = iconsService;
        this.awtrixService = awtrixService;
    }

    @Override
    @SneakyThrows
    public List<Draw> drawList(int offset, float dim) {

        List<Draw> drawList = new ArrayList<>();

        Color color = dimColor(Color.white, dim);

        var temperatureIcon = iconsService.getIcon("temperaturesmall.gif");
        if (dim < 1) {
            temperatureIcon = iconsService.getDimmedIcon("temperaturesmall.gif", dim);
        }

        // TODO: gérer l'icone
        boolean hasIcon = null != temperatureIcon;

        if (outboundOffset(offset)) {
            return Collections.emptyList();
        }
        int xpos = 19;

        AwtrixStats awtrixStats = awtrixService.getAwtrixStats();
        int temp = null == awtrixStats ? 0 : awtrixStats.temp();
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
            xpos -= 4;
        }

        if (hasIcon && !tooLarge) {
            drawList.add(new Bitmap(tempNegative ? (temp > 9 ? xpos - 1 : xpos - 3) : xpos, offset, 8, 8, temperatureIcon));
            xpos += 3;
        }

        // smaller '-' sign
        if (tempNegative) {
            if (!hasIcon || temp < 10) {
                drawList.add(new Line(xpos + 1, 3 + offset, xpos + 2, 3 + offset, color));
            } else {
                // Very small space : shift - sign next to the temperature digits when temperature icon
                drawList.add(new Line(xpos + 2, 3 + offset, xpos + 3, 3 + offset, color));
            }
        }

        drawList.add(new Text(xpos + 3, 1 + offset, String.valueOf(temp), color));

        // smaller ° sign
        if (!hasIcon || tooLarge) {
            drawList.add(new Pixel(31, 1 + offset, color));
        }

        return drawList;
    }
}
