package org.antonus.anothertime.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.awt.*;
import java.util.ArrayList;

class AwtrixPayloadTest {

    ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void testSerialization() throws JsonProcessingException {

        var drawList = new ArrayList<Draw>();

        drawList.add(new Pixel(1, 2, Color.black));
        drawList.add(new Pixel(3, 4, Color.blue));
        drawList.add(new Rectangle(3, 4, 5, 6, Color.green));
        drawList.add(new Bitmap(1, 2, 3, 4, new int[]{4, 5, 6, 7}));

        AwtrixPayload payload = AwtrixPayload.builder()
                .text("mon texte")
                .draw(drawList)
                .build();

        Assertions.assertEquals("{\"text\":\"mon texte\",\"draw\":[{\"dp\":[1,2,[0,0,0]]},{\"dp\":[3,4,[0,0,255]]},{\"dr\":[3,4,5,6,[0,255,0]]},{\"db\":[1,2,3,4,[4,5,6,7]]}]}", objectMapper.writeValueAsString(payload));
    }
}