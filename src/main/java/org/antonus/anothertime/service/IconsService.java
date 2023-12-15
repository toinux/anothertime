package org.antonus.anothertime.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.awt.*;

import static org.antonus.anothertime.utils.ColorUtils.*;

@Service
@RequiredArgsConstructor
public class IconsService {

    private final AwtrixService awtrixService;

    public int[] getIcon(String iconName, String defaultIcon) {
        return awtrixService.getIcon(iconName, defaultIcon);
    }

    @Cacheable(value = "icons", keyGenerator = "dimmedIconKeyGenerator")
    public int[] getDimmedIcon(String iconName, String defaultIcon, float dim) {
        int[] icon = getIcon(iconName, defaultIcon);
        if (dim >= 1 || null == icon) {
            return icon;
        }
        int[] result = new int[icon.length];
        for (int i = 0; i < icon.length ; i++) {
            result[i] = rgb888(dimColor(Color.decode(Integer.toString(icon[i])), dim));
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
