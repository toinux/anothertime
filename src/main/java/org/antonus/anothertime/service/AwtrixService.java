package org.antonus.anothertime.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.antonus.anothertime.model.AnimatedIcon;
import org.antonus.anothertime.model.AwtrixSettings;
import org.antonus.anothertime.model.AwtrixStats;
import org.antonus.anothertime.rest.AwtrixClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.metadata.IIOMetadata;
import javax.imageio.metadata.IIOMetadataNode;
import javax.imageio.stream.ImageInputStream;
import java.awt.*;
import java.awt.image.PixelGrabber;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

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
    public AnimatedIcon getIcon(String iconName, String defaultIcon) {
        if (null == iconName || iconName.isBlank() || iconName.equalsIgnoreCase("default")) {
            AnimatedIcon defaultAnimatedIcon = new AnimatedIcon();
            // TODO : animate default icon too
            defaultAnimatedIcon.addFrame(0, 0, getDefaultIcon(defaultIcon));
            return  defaultAnimatedIcon;
            // return getDefaultIcon(defaultIcon);
        }
        try {

            ImageReader ir = ImageIO.getImageReadersBySuffix("gif").next();
            ImageInputStream is = ImageIO.createImageInputStream(new ByteArrayInputStream(awtrixClient.getIcon(iconName)));
            ir.setInput(is, false);
            int numFrames = ir.getNumImages(true);
            AnimatedIcon animatedIcon = new AnimatedIcon();
            for (int i = 0; i < numFrames; i++) {
                animatedIcon.addFrame(i, getFrameDelay(ir, i), imageToBmp(ir.read(i)));
            }
            return animatedIcon;

            // return imageToBmp(ImageIO.read(new ByteArrayInputStream(awtrixClient.getIcon(iconName))));
        } catch (Exception e) {
            log.info("could not load icon {}, loading default icon {} instead", iconName, defaultIcon);
            AnimatedIcon defaultAnimatedIcon = new AnimatedIcon();
            // TODO : animate default icon too
            defaultAnimatedIcon.addFrame(0,0, getDefaultIcon(defaultIcon));
            return  defaultAnimatedIcon;
            //return getDefaultIcon(defaultIcon);
        }
    }

    private static int getFrameDelay(ImageReader reader, int frameIndex) throws IOException {
        // Get the metadata of the current frame
        int delay = 0;
        int imageMetadataIndex = reader.getMinIndex() + frameIndex;
        IIOMetadata imageMetadata = reader.getImageMetadata(imageMetadataIndex);
        String metaFormatName = imageMetadata.getNativeMetadataFormatName();

        IIOMetadataNode root = (IIOMetadataNode) imageMetadata.getAsTree(metaFormatName);
        NodeList children = root.getElementsByTagName("GraphicControlExtension");

        // Loop through GraphicControlExtension nodes to find delay time
        for (int i = 0; i < children.getLength(); i++) {
            Node nodeItem = children.item(i);
            NamedNodeMap attr = nodeItem.getAttributes();
            Node delayNode = attr.getNamedItem("delayTime");
            if (delayNode != null) {
                delay = Integer.parseInt(delayNode.getNodeValue()) * 10; // Convert to milliseconds
                break;
            }
        }
        return delay;
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
