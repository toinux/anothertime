package org.antonus.anothertime.config;

import org.springframework.boot.context.properties.ConfigurationPropertiesBinding;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.lang.reflect.Field;

@Component
@ConfigurationPropertiesBinding
public final class ColorConverter implements Converter<Object, Color> {
    @Override
    public Color convert(Object source) {

        return switch (source) {
            case String s -> {
                try {
                    Field field = Color.class.getField(s.toLowerCase());
                    yield (Color) field.get(null);
                } catch (Exception ignored) {
                }

                yield decodeColor(s);
            }
            case Integer i -> decodeColor(Integer.toString(i));
            default -> null;
        };
    }

    private Color decodeColor(String s) {
        try {
            if ("null".equalsIgnoreCase(s) || "default".equalsIgnoreCase(s)) {
                // non-null color with alpha=0 for default awtrix color
                return new Color(0,0,0,0);
            }
            return Color.decode(s);
        } catch (NumberFormatException ignored) {
            return null;
        }
    }
}