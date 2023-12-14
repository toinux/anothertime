package org.antonus.anothertime.converters;


import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.awt.*;
import java.io.IOException;

public class ColorToStringConverter extends JsonSerializer<Color> {


    @Override
    public void serialize(Color value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        if (value.getAlpha() == 0) {
            gen.writeNull();
        } else {
            gen.writeString("#" + Integer.toHexString(value.getRGB()).substring(2));
        }
    }
}
