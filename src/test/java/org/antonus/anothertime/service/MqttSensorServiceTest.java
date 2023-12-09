package org.antonus.anothertime.service;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MqttSensorServiceTest {

    private MqttSensorService sensorService = new MqttSensorService();
    @Test
    void handleJson() {
        MqttMessage message = new MqttMessage();
        message.setPayload("""
                {
                    "humidity": -1.1,
                    "temperature": 19.5
                }
                """.getBytes());
        sensorService.handleJson(message, "$.humidity", "$.temperature");
        assertEquals(20, sensorService.getTemperature());
        assertEquals(-1, sensorService.getHumidity());

    }

    @Test
    void handleHumidity() {
        MqttMessage message = new MqttMessage();
        message.setPayload("-1.2".getBytes());
        sensorService.handleHumidity(message);
        assertEquals(-1, sensorService.getHumidity());
    }

    @Test
    void handleTemperature() {
        MqttMessage message = new MqttMessage();
        message.setPayload("12.9".getBytes());
        sensorService.handleTemperature(message);
        assertEquals(13, sensorService.getTemperature());
    }
}