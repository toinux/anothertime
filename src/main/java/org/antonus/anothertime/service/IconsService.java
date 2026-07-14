package org.antonus.anothertime.service;

import lombok.RequiredArgsConstructor;
import org.antonus.anothertime.icons.AnimatedFrame;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.awt.*;
import java.math.BigDecimal;
import java.math.RoundingMode;

import static org.antonus.anothertime.utils.ColorUtils.*;

@Service
@RequiredArgsConstructor
public class IconsService {

    private final AwtrixService awtrixService;
    private final CacheManager cacheManager;

    public int[] getDimmedIcon(String iconName, String defaultIcon, float dim) {
        Cache cache = cacheManager.getCache("dimmedicons");
        Assert.notNull(cache, "cache 'icons' must not be null");

        AnimatedFrame animatedFrame = awtrixService.getIcon(iconName, defaultIcon).getFrame();

        int[] icon = animatedFrame.frame();
        if (dim >= 1 || null == icon) {
            return icon;
        }

        BigDecimal rounded = (new BigDecimal(dim)).setScale(2, RoundingMode.FLOOR);
        String cache_key = iconName+"_"+defaultIcon+"_"+rounded+"_"+animatedFrame.index();
        return cache.get(cache_key, () -> {
            int[] result = new int[icon.length];
            for (int i = 0; i < icon.length ; i++) {
                result[i] = rgb888(dimColor(Color.decode(Integer.toString(icon[i])), dim));
            }
            return result;
        });

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
