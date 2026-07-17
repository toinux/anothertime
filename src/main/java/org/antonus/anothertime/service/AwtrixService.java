package org.antonus.anothertime.service;

import com.hivemq.client.mqtt.mqtt3.message.publish.Mqtt3Publish;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.antonus.anothertime.icons.AnimatedIcon;
import org.antonus.anothertime.model.AwtrixSettings;
import org.antonus.anothertime.model.AwtrixStats;
import org.antonus.anothertime.rest.AwtrixClient;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import tools.jackson.databind.json.JsonMapper;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.metadata.IIOMetadata;
import javax.imageio.metadata.IIOMetadataNode;
import javax.imageio.stream.ImageInputStream;
import java.awt.*;
import java.awt.image.PixelGrabber;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Iterator;

@Service
@RequiredArgsConstructor
@Slf4j
public class AwtrixService {

    private final JsonMapper jsonMapper;
    private final AwtrixClient awtrixClient;
    private final ResourceLoader resourceLoader;

    @Getter
    private AwtrixStats awtrixStats = null;

    @Getter
    private String currentApp = "anothertime";

    @Cacheable(value = "icons", sync = true)
    public AnimatedIcon getIcon(String iconName, String defaultIcon) {
        if (null == iconName || iconName.isBlank() || iconName.equalsIgnoreCase("default")) {
            return getDefaultIcon(defaultIcon);
        }
        try {
            return decodeIcon(awtrixClient.getIcon(iconName));
        } catch (Exception e) {
            log.info("could not load icon {}, loading default icon {} instead", iconName, defaultIcon);
            return getDefaultIcon(defaultIcon);
        }
    }

    private static AnimatedIcon decodeIcon(byte[] iconBytes) throws IOException, InterruptedException {
        ImageReader ir = null;
        try (ImageInputStream iis = ImageIO.createImageInputStream(new ByteArrayInputStream(iconBytes))) {
            Iterator<ImageReader> readers = ImageIO.getImageReaders(iis);
            if (!readers.hasNext()) {
                throw new IOException("no ImageReader found for this icon format");
            }

            ir = readers.next();
            ir.setInput(iis, false);

            boolean isAnimatedGif = "gif".equalsIgnoreCase(ir.getFormatName());
            int numFrames = isAnimatedGif ? ir.getNumImages(true) : 1;

            AnimatedIcon animatedIcon = new AnimatedIcon();
            for (int i = 0; i < numFrames; i++) {
                int delay = isAnimatedGif ? getFrameDelay(ir, i) : 0;
                animatedIcon.addFrame(i, delay, imageToBmp(ir.read(i)));
            }

            return animatedIcon;
        } finally {
            if (ir != null) {
                ir.dispose();
            }
        }
    }


    private static int getFrameDelay(ImageReader reader, int frameIndex) throws IOException {
        // Get the metadata of the current frame
        int imageMetadataIndex = reader.getMinIndex() + frameIndex;
        IIOMetadata imageMetadata = reader.getImageMetadata(imageMetadataIndex);
        String metaFormatName = imageMetadata.getNativeMetadataFormatName();

        IIOMetadataNode root = (IIOMetadataNode) imageMetadata.getAsTree(metaFormatName);
        NodeList children = root.getElementsByTagName("GraphicControlExtension");

        if (children.getLength() == 0) return 0;

        Node delayNode = children.item(0).getAttributes().getNamedItem("delayTime");
        return delayNode != null ? Integer.parseInt(delayNode.getNodeValue()) * 10 : 0; // * 10 to onvert to milliseconds

    }

    private AnimatedIcon getDefaultIcon(String defaultIcon) {
        if (null == defaultIcon) {
            return null;
        }
        try {
            return decodeIcon(resourceLoader.getResource("classpath:icons/" + defaultIcon).getContentAsByteArray());
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
    public void handleStats(Mqtt3Publish message) {
        this.awtrixStats = jsonMapper.readValue(message.getPayloadAsBytes(), AwtrixStats.class);
    }

    public void handleCurrentApp(Mqtt3Publish message) {
        currentApp = new String(message.getPayloadAsBytes());
    }

    private static int[] imageToBmp(Image image) throws InterruptedException {

        int[] pixelArray = new int[8 * 8];
        PixelGrabber pg = new PixelGrabber(image, 0, 0, 8, 8, pixelArray, 0, 8);
        pg.grabPixels();

        for (int i = 0; i < 8 * 8; i++) {
            pixelArray[i] &= 0x00FFFFFF; // conversion rgb888
        }

        return pixelArray;
    }


}
