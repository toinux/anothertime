package org.antonus.anothertime.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.antonus.anothertime.model.AwtrixSettings;
import org.antonus.anothertime.model.AwtrixStats;
import org.antonus.anothertime.rest.AwtrixClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ResourceLoader;
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
    private final ResourceLoader resourceLoader;

    @Getter
    private AwtrixStats awtrixStats = null;

    @Getter
    private String currentApp = "anothertime";

    @Cacheable(value = "icons", sync = true)
    public int[] getIcon(String iconName, String defaultIcon) {
        if (null == iconName || iconName.isBlank() || iconName.equalsIgnoreCase("default")) {
            return getDefaultIcon(defaultIcon);
        }
        try {
            return imageToBmp(ImageIO.read(new ByteArrayInputStream(awtrixClient.getIcon(iconName))));
        } catch (Exception e) {
            log.info("could not load icon {}, loading default icon {} instead", iconName, defaultIcon);
            return getDefaultIcon(defaultIcon);
        }
    }

    private int[] getDefaultIcon(String defaultIcon) {
        if (null == defaultIcon) {
            return null;
        }
        try {
            return imageToBmp(ImageIO.read(resourceLoader.getResource("classpath:icons/" + defaultIcon).getInputStream()));
        } catch (Exception e) {
            log.error("Could not load default icon {} : {}", defaultIcon, e.getMessage());
        }
        return null;
    }

    @Cacheable(value = "settings", sync = true)
    public AwtrixSettings getSettings() {
        return awtrixClient.settings();
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
