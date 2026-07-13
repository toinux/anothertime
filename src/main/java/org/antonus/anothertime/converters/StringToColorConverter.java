package org.antonus.anothertime.converters;


import org.antonus.anothertime.config.ColorConverter;
import tools.jackson.core.JacksonException;
import tools.jackson.core.JsonParser;
import tools.jackson.databind.DeserializationContext;
import tools.jackson.databind.ValueDeserializer;

import java.awt.*;

public class StringToColorConverter extends ValueDeserializer<Color> {

    private final ColorConverter colorConverter;

    public StringToColorConverter(ColorConverter colorConverter) {
        this.colorConverter = colorConverter;
    }

    @Override
    public Color deserialize(JsonParser p, DeserializationContext ctxt) throws JacksonException {
        return colorConverter.convert(p.getString());
    }
}
