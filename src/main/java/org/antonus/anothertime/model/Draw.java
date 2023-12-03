package org.antonus.anothertime.model;

import com.fasterxml.jackson.annotation.JsonValue;

import java.awt.*;
import java.util.*;
import java.util.List;

public abstract class Draw {
    private final String name;
    private final int[] values;
    private int[] bmp = null;
    private Color color = null;
    private String text = null;

    protected Draw(String name, Color color, int... values) {
        this.name = name;
        this.values = values;
        this.color = color;
    }
    protected Draw(String name, int[] bmp, int... values) {
        this.name = name;
        this.values = values;
        this.bmp = bmp;
    }

    protected Draw(String name, Color color, String text, int... values) {
        this.name = name;
        this.values = values;
        this.text = text;
        this.color = color;
    }

    @JsonValue
    public Map<String,List<Object>> toJson() {
        var data = new ArrayList<>(values.length + 1);
        for (int value: values) {
            data.add(value);
        }
        if (text != null) {
            data.add(text);
        }
        if (color != null) {
            data.add(new int[]{color.getRed(), color.getGreen(), color.getBlue()});
        }
        if (bmp != null) {
            data.add(bmp);
        }
        return Collections.singletonMap(name, data);
    }
}
