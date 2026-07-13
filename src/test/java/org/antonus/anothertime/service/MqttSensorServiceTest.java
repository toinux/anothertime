package org.antonus.anothertime.service;

import com.hivemq.client.mqtt.mqtt3.message.publish.Mqtt3Publish;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MqttSensorServiceTest {

    private final MqttSensorService sensorService = new MqttSensorService();

    @Test
    void handleJson() {
        Mqtt3Publish message = Mqtt3Publish.builder()
                .topic("pipo")
                .payload("""
                        {
                            "humidity": -1.1,
                            "temperature": 19
                        }
                        """.getBytes())
                .build();

        sensorService.handleJson(message, "$.humidity", "$.temperature");

        assertEquals(19, sensorService.getTemperature());
        assertEquals(-1, sensorService.getHumidity());
    }

    @Test
    void handleHumidity() {
        Mqtt3Publish message = Mqtt3Publish.builder()
                .topic("pipo")
                .payload("-1.2".getBytes())
                .build();

        sensorService.handleHumidity(message);

        assertEquals(-1, sensorService.getHumidity());
    }

    @Test
    void handleTemperature() {
        Mqtt3Publish message = Mqtt3Publish.builder()
                .topic("pipo")
                .payload("12.9".getBytes())
                .build();

        sensorService.handleTemperature(message);

        assertEquals(13, sensorService.getTemperature());
    }
}