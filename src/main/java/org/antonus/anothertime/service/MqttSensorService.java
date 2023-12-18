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
            humidity = jsonValueToInt(jsonContext.read(humidityPath));
            temperature = jsonValueToInt(jsonContext.read(temperaturePath));
        } catch (Exception e) {
            log.error("could not read humidity or temperature : {}", e.getMessage());
        }
    }

    private int jsonValueToInt(Object jsonValue) {
        return switch (jsonValue) {
            case Integer value -> value;
            case Double value -> Math.round(value.floatValue());
            default -> 0;
        };
    }

    public void handleHumidity(MqttMessage message) {
        try {
            humidity = Math.round((float) Double.parseDouble(new String(message.getPayload())));
        } catch (Exception e) {
            try {
                log.error("could not read humidity : {}",new String(message.getPayload()), e);
            } catch (Exception ee) {
                log.error("could not read humidity",e);
            }
        }

    }

    public void handleTemperature(MqttMessage message) {
        try {
            temperature = Math.round((float) Double.parseDouble(new String(message.getPayload())));
        } catch (Exception e) {
            try {
                log.error("could not read temperature : {}",new String(message.getPayload()), e);
            } catch (Exception ee ) {
                log.error("could not read temperature", e);
            }

        }
    }
}
