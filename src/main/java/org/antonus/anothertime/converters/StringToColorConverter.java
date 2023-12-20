package org.antonus.anothertime.converters;


import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.antonus.anothertime.config.ColorConverter;

import java.awt.*;
import java.io.IOException;

public class StringToColorConverter extends JsonDeserializer<Color> {

    private final ColorConverter colorConverter;

    public StringToColorConverter(ColorConverter colorConverter) {
        this.colorConverter = colorConverter;
    }

    @Override
    public Color deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        return colorConverter.convert(p.getText());
    }
}
