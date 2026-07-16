package org.antonus.anothertime.utils;

import java.awt.*;

public class ColorUtils {
    public static Color dimColor(Color color, float percent) {
        return new Color((int) (color.getRed() * percent), (int) (color.getGreen() * percent), (int) (color.getBlue() * percent));
    }

    public static int dimRgb888(int rgb, float dim) {
        int r = (int) (((rgb >> 16) & 0xFF) * dim);
        int g = (int) (((rgb >> 8) & 0xFF) * dim);
        int b = (int) ((rgb & 0xFF) * dim);
        return (r << 16) | (g << 8) | b;
    }

    public static Color rbg888(int color) {
        int red = (color >> 16) & 0xFF;
        int green = (color >> 8) & 0xFF;
        int blue = color & 0xFF;
        return new Color(red, green, blue);
    }
}
