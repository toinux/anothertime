package org.antonus.anothertime.service;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.paho.client.mqttv3.MqttMessage;

@Data
@Slf4j
public class MqttSensorService implements  SensorService {

    private int temperature = 0;
    private int humidity = 0;

    public void handleJson(MqttMessage message, String humidityPath, String temperaturePath) {
        try {
            DocumentContext jsonContext = JsonPath.parse(new String(message.getPayload()));
            humidity = jsonContext.read(humidityPath);
            temperature = jsonContext.read(temperaturePath);
        } catch (Exception e) {
            log.error("could not read humidity or temperature : {}", e.getMessage());
        }
    }

    public void handleHumidity(MqttMessage message) {
        try {
            humidity = Math.round((float) Double.parseDouble(new String(message.getPayload())));
        } catch (Exception e) {
            log.error("could not read humidity : {}", e.getMessage());
        }

    }

    public void handleTemperature(MqttMessage message) {
        try {
            temperature = Math.round((float) Double.parseDouble(new String(message.getPayload())));
        } catch (Exception e) {
            log.error("could not read temperature : {}", e.getMessage());
        }
    }
}
