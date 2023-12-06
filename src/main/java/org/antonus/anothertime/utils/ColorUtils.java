package org.antonus.anothertime.utils;

import java.awt.*;

public class ColorUtils {
    public static Color dimColor(Color color, float percent) {
        return new Color((int) (color.getRed() * percent), (int) (color.getGreen() * percent), (int) (color.getBlue() * percent));
    }

/*    public static int[] dimIcon(int[] icon, float dim) {
        System.out.println((new BigDecimal(dim)).setScale(2, RoundingMode.FLOOR));
        int[] result = new int[icon.length];
        for (int i = 0; i < icon.length ; i++) {
            result[i] = rgb888(dimColor(Color.decode(Integer.toString(icon[i])), dim));
        }
        return result;
    }*/

    public static int rgb888(Color color) {
        return color.getRed() << 16 | color.getGreen() << 8 | color.getBlue();
    }
}
