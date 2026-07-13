package org.antonus.anothertime.service;

import com.hivemq.client.mqtt.mqtt3.message.publish.Mqtt3Publish;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class MqttSensorService implements  SensorService {

    private int temperature = 0;
    private int humidity = 0;

    public void handleJson(Mqtt3Publish message, String humidityPath, String temperaturePath) {
        try {
            DocumentContext jsonContext = JsonPath.parse(new String(message.getPayloadAsBytes()));
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

    public void handleHumidity(Mqtt3Publish message) {
        try {
            humidity = Math.round((float) Double.parseDouble(new String(message.getPayloadAsBytes())));
        } catch (Exception e) {
            try {
                log.error("could not read humidity : {}",new String(message.getPayloadAsBytes()), e);
            } catch (Exception ee) {
                log.error("could not read humidity",e);
            }
        }

    }

    public void handleTemperature(Mqtt3Publish message) {
        try {
            temperature = Math.round((float) Double.parseDouble(new String(message.getPayloadAsBytes())));
        } catch (Exception e) {
            try {
                log.error("could not read temperature : {}",new String(message.getPayloadAsBytes()), e);
            } catch (Exception ee ) {
                log.error("could not read temperature", e);
            }

        }
    }
}
