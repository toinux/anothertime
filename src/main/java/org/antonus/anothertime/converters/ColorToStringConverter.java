package org.antonus.anothertime.converters;


import tools.jackson.core.JacksonException;
import tools.jackson.core.JsonGenerator;
import tools.jackson.databind.SerializationContext;
import tools.jackson.databind.ValueSerializer;

import java.awt.*;

public class ColorToStringConverter extends ValueSerializer<Color> {

    @Override
    public void serialize(Color value, JsonGenerator gen, SerializationContext ctxt) throws JacksonException {
        if (value.getAlpha() == 0) {
            gen.writeNull();
        } else {
            gen.writeString("#" + Integer.toHexString(value.getRGB()).substring(2));
        }
    }
}
