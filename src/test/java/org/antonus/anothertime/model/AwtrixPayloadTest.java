package org.antonus.anothertime.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.json.JsonMapper;

import java.awt.*;
import java.util.ArrayList;

class AwtrixPayloadTest {

    JsonMapper jsonMapper = new JsonMapper();

    @Test
    void testSerialization() {

        var drawList = new ArrayList<Draw>();

        drawList.add(new Pixel(1, 2, Color.black));
        drawList.add(new Pixel(3, 4, Color.blue));
        drawList.add(new Rectangle(3, 4, 5, 6, Color.green));
        drawList.add(new Bitmap(1, 2, 3, 4, new int[]{4, 5, 6, 7}));

        AwtrixPayload payload = AwtrixPayload.builder()
                .text("mon texte")
                .draw(drawList)
                .build();

        Assertions.assertEquals("{\"text\":\"mon texte\",\"draw\":[{\"dp\":[1,2,[0,0,0]]},{\"dp\":[3,4,[0,0,255]]},{\"dr\":[3,4,5,6,[0,255,0]]},{\"db\":[1,2,3,4,[4,5,6,7]]}]}", jsonMapper.writeValueAsString(payload));
    }
}