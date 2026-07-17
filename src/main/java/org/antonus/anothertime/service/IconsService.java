package org.antonus.anothertime.service;

import lombok.RequiredArgsConstructor;
import org.antonus.anothertime.icons.AnimatedFrame;
import org.antonus.anothertime.utils.ColorUtils;
import org.springframework.stereotype.Service;

import java.awt.*;

import static org.antonus.anothertime.utils.ColorUtils.rbg888;

@Service
@RequiredArgsConstructor
public class IconsService {

    private final AwtrixService awtrixService;

    public int[] getDimmedIcon(String iconName, String defaultIcon, float dim) {

        AnimatedFrame animatedFrame = awtrixService.getIcon(iconName, defaultIcon).getFrame();
        int[] icon = animatedFrame.frame();

        if (dim >= 1 || null == icon) {
            return icon;
        }

        int[] result = new int[icon.length];
        for (int i = 0; i < icon.length; i++) {
            result[i] = ColorUtils.dimRgb888(icon[i], dim);
        }

        return result;
    }


    public Color defaultColorIfNull(Color color, Color defaultColor) {
        // little trick : consider colors with alpha=0 as default awtrix color
        // if null, color would not be updated from REST api
        if (null == color || color.getAlpha() == 0) {
            return null == defaultColor ? rbg888(awtrixService.getSettings().TCOL()) : defaultColor;
        } else {
            return color;
        }
    }

    public Color defaultColorIfNull(Color color) {
        return defaultColorIfNull(color, null);
    }
}
