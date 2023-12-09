package org.antonus.anothertime.service;

import lombok.RequiredArgsConstructor;
import org.antonus.anothertime.model.AwtrixStats;

@RequiredArgsConstructor
public class AwtrixSensorService implements SensorService {
    private final AwtrixService awtrixService;

    @Override
    public int getTemperature() {
        AwtrixStats awtrixStats = awtrixService.getAwtrixStats();
        return null == awtrixStats ? 0 : awtrixStats.temp();
    }

    @Override
    public int getHumidity() {
        AwtrixStats awtrixStats = awtrixService.getAwtrixStats();
        return null == awtrixStats ? 0 : awtrixStats.hum();
    }
}
