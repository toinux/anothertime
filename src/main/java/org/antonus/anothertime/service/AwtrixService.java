package org.antonus.anothertime.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.antonus.anothertime.model.AwtrixStats;
import org.antonus.anothertime.rest.AwtrixClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.PixelGrabber;
import java.io.ByteArrayInputStream;

import static org.antonus.anothertime.utils.ColorUtils.rgb888;

@Service
@RequiredArgsConstructor
@Slf4j
public class AwtrixService {

    private final ObjectMapper objectMapper;
    private final AwtrixClient awtrixClient;

    @Getter
    private AwtrixStats awtrixStats = null;

    @Getter
    private String currentApp = "anothertime";

    @Cacheable(value = "icons", sync = true)
    public int[] getIcon(String iconName) {
        try {
            Image image = ImageIO.read(new ByteArrayInputStream(awtrixClient.getIcon(iconName)));
            return imageToBmp(image);
        } catch (Exception e) {
            log.error("Could not retrieve icon {} : {}", iconName, e.getMessage());
        }
        return null;
    }

    @SneakyThrows
    public void handleStats(MqttMessage message) {
        this.awtrixStats = objectMapper.readValue(message.getPayload(), AwtrixStats.class);
    }

    public void handleCurrentApp(MqttMessage message) {
        currentApp = new String(message.getPayload());
    }

    private static int[] imageToBmp(Image image) throws InterruptedException {

        int[] pixelArray = new int[8 * 8];
        PixelGrabber pg = new PixelGrabber(image, 0, 0, 8, 8, pixelArray, 0, 8);
        pg.grabPixels();

        for (int i = 0; i < 8 * 8; i++) {
            pixelArray[i] = rgb888(new Color(pixelArray[i]));
        }

        return pixelArray;
    }


}
