package org.antonus.anothertime.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.awt.*;

import static org.antonus.anothertime.utils.ColorUtils.dimColor;
import static org.antonus.anothertime.utils.ColorUtils.rgb888;

@Service
@RequiredArgsConstructor
public class IconsService {

    private final AwtrixService awtrixService;

    public int[] getIcon(String iconName) {
        return awtrixService.getIcon(iconName);
    }

    @Cacheable(value = "icons", keyGenerator = "dimmedIconKeyGenerator")
    public int[] getDimmedIcon(String iconName, float dim) {
        int[] icon = getIcon(iconName);
        int[] result = new int[icon.length];
        for (int i = 0; i < icon.length ; i++) {
            result[i] = rgb888(dimColor(Color.decode(Integer.toString(icon[i])), dim));
        }
        return result;
    }
}
