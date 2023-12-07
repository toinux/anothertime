package org.antonus.anothertime.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.Objects;

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

    public Color defaultColorIfNull(Color color) {
        return Objects.requireNonNullElseGet(color, () -> rbg888(awtrixService.getSettings().TCOL()));
    }
}
