package org.antonus.anothertime.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.antonus.anothertime.animationtypes.SeparatorAnimation;
import org.antonus.anothertime.animationtypes.TimeAnimation;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.model.*;
import org.antonus.anothertime.rest.AwtrixClient;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.Closeable;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AnothertimeService implements Closeable {

    // Tick interval in ms.
    private static final int TICK_INTERVAL = 65;
    private static final DateTimeFormatter FORMAT_HOUR = DateTimeFormatter.ofPattern("HH");
    private static final DateTimeFormatter FORMAT_MINUTES = DateTimeFormatter.ofPattern("mm");
    private static final DateTimeFormatter FORMAT_HOUR_AND_MINUTES = DateTimeFormatter.ofPattern("HHmm");

    @Value("${anothertime.awtrix-topic}/custom/anothertime")
    private String anothertimeTopic;

    private final ObjectMapper objectMapper;

    private final IMqttClient publisher;
    private final AwtrixClient awtrixClient;

    private final CacheManager cacheManager;
    private final AwtrixService awtrixService;
    private final AnothertimeProperties anothertimeProperties;

    @Override
    public void close() {
        try {
            publisher.disconnect();
            publisher.close();
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
    }

    private List<Draw> drawTime(LocalTime time) {

        var drawList = new ArrayList<Draw>();

        // TODO : xpos = 6 si pas de widgets
        int xpos = 0;


        boolean odd = time.getSecond() % 2 > 0;

        float sepms = time.getLong(ChronoField.MILLI_OF_SECOND) / 1000f;
        float seppct = 0;
        var separatorAnimation = anothertimeProperties.getTime().getSeparator();
        Color separatorColor = null;
        if (separatorAnimation == SeparatorAnimation.NONE) {
            separatorColor = Color.white;
        } else if (odd) {
            switch (separatorAnimation) {
                case FADE -> seppct = (float) ((Math.cos(2 * Math.PI * sepms + Math.PI) + 1) * 0.5);
                case BLINK -> seppct = 1;
            }
            separatorColor = dimColor(Color.white, seppct);
        }

        int timeAnimationDuration = switch (anothertimeProperties.getTime().getAnimation()) {
            case TimeAnimation.SCROLL -> 8 * TICK_INTERVAL;
            case TimeAnimation.FADE -> 16 * TICK_INTERVAL;
            default -> 0;
        };

        // number of ms since the beginning of this minute
        long millis = 0;
        if (timeAnimationDuration > 0) {
            millis = time.getLong(ChronoField.MILLI_OF_SECOND) + time.getSecond() * 1000;
        }

        // Animation during the first animationDuration in ms of the first minute
        if (millis < timeAnimationDuration) {

            // percentage of the animation (0 = started, 1 = finished)
            float animationPct = (float) millis / timeAnimationDuration;
            String timeString = time.format(FORMAT_HOUR_AND_MINUTES);
            String previous = time.minus(Duration.ofMinutes(1)).format(FORMAT_HOUR_AND_MINUTES);
            // calculate which digits changed
            boolean[] o = new boolean[4];
            for(int i = 0; i < 4; i++) {
                // digit changed
                if (timeString.charAt(i) != previous.charAt(i)) {
                    // dran next on top of previous
                    switch (anothertimeProperties.getTime().getAnimation()) {
                        case SCROLL -> {
                            var ypos = (int) Math.floor(animationPct * 8);
                            drawList.add(new Text(xpos, 1 + ypos - 8, String.valueOf(timeString.charAt(i)), Color.white));
                            drawList.add(new Text(xpos, 1 + ypos, String.valueOf(previous.charAt(i)), Color.white));

                        }
                        case FADE -> {
                            if (animationPct < 0.5) {
                                drawList.add(new Text(xpos, 1, String.valueOf(previous.charAt(i)), dimColor(Color.white, 1 - 2 * animationPct)));
                            } else {
                                drawList.add(new Text(xpos, 1, String.valueOf(timeString.charAt(i)), dimColor(Color.white, 2 * animationPct - 1)));
                            }
                        }
                    }

                } else {
                    // digit did not change, no animation
                    drawList.add(new Text(xpos, 1, String.valueOf(timeString.charAt(i)), Color.white));
                }
                // shift 4 characters after drawing for a digit
                xpos += 4;

                // add the separator after the second digit
                if (i == 1 ) {
                    if (null != separatorColor) {
                        drawList.add(new Text(xpos, 1, ":", separatorColor));
                    }
                    xpos += 2;
                }

            }
        } else {
            // no animation
            drawList.add(new Text(xpos, 1, time.format(FORMAT_HOUR), Color.white));
            if (null != separatorColor) {
                drawList.add(new Text(xpos + 8, 1, ":", separatorColor));
            }
            drawList.add(new Text(xpos + 10, 1, time.format(FORMAT_MINUTES), Color.white));
        }

        return drawList;
    }

    private List<Draw> drawSeconds(LocalTime time) {

        List<Draw> drawList = new ArrayList<>();
        /*
        Private Sub drawSeconds

	Dim secondsProgressSize As Int = 17

	Select Case secondsStyle
		Case "progress"
			Dim second As Int = DateTime.GetSecond(DateTime.Now)
			If Not(secondsBackgroundColor = Null) Then
				App.drawLine(0, 7, secondsProgressSize - 1, 7, secondsBackgroundColor)
			End If
			If second > 0 Then
				App.drawLine(0, 7, Floor(second * secondsProgressSize / 60), 7, secondsColor)
			End If

		Case "k2000"

			If Not(k2000Animation.IsInitialized) Then
				k2000Animation = makeK2000Animation(secondsProgressSize, 12, secondsColor, secondsBackgroundColor)
			End If

			Dim now As Long = DateTime.Now
			DateTime.TimeFormat = "S"
			Dim duration As Int = 2 * 1000
			Dim millis As Int = (DateTime.Time(now) + DateTime.GetSecond(now) * 1000) Mod duration
			Dim pct As Float = millis / duration
			Dim frame As Int = secondsProgressSize * 2 * pct
			App.drawBMP(0,7,k2000Animation.Get(frame),secondsProgressSize,1)

	End Select

End Sub
        * */
        int secondsProgressSize = 17;
        int second = time.getSecond();

        if (second > 0) {
            drawList.add(new Line(0, 7, second * secondsProgressSize / 60, 7, Color.white));
        }

        return drawList;
    }

    private List<Draw> drawWidgetTemperature(int offset) throws IOException, InterruptedException {

        List<Draw> drawList = new ArrayList<>();

        var temperatureIcon = awtrixService.getIcon("temperaturesmall.gif");

        // TODO: gérer l'icone
        boolean hasIcon = null != temperatureIcon;

        if (outboundOffset(offset)) {
            return Collections.emptyList();
        }
        int xpos = 19;

        AwtrixStats awtrixStats = awtrixService.getAwtrixStats();
        int temp = null == awtrixStats ? 0 : awtrixStats.temp();
        boolean tempNegative = false;
        if (temp < 0) {
            tempNegative = true;
            temp = Math.abs(temp);
        }

        if (temp < 10) {
            xpos += 4;
        }

        boolean tooLarge = temp > 99;
        if (tooLarge) {
            xpos -= 4;
        }

        if (hasIcon && !tooLarge) {
            drawList.add(new Bitmap(tempNegative ? (temp > 9 ? xpos - 1 : xpos - 3) : xpos, offset, 8, 8, temperatureIcon));
            xpos += 3;
        }

        // smaller '-' sign
        if (tempNegative) {
            if (!hasIcon || temp < 10) {
                drawList.add(new Line(xpos + 1, 3 + offset, xpos + 2, 3 + offset, Color.white));
            } else {
                // Very small space : shift - sign next to the temperature digits when temperature icon
                drawList.add(new Line(xpos + 2, 3 + offset, xpos + 3, 3 + offset, Color.white));
            }
        }

        drawList.add(new Text(xpos + 3, 1 + offset, String.valueOf(temp), Color.white));

        // smaller ° sign
        if (!hasIcon || tooLarge) {
            drawList.add(new Pixel(31, 1 + offset, Color.white));
        }

        return drawList;
    }

    private boolean outboundOffset(int offset) {
        return Math.abs(offset) > 7;
    }

    private Color dimColor(Color color, float percent) {
        return new Color((int) (color.getRed() * percent), (int) (color.getGreen() * percent), (int) (color.getBlue() * percent));
    }

    @Scheduled(fixedDelay = TICK_INTERVAL)
    @Async
    public void tick() throws MqttException, IOException, InterruptedException {

        // Do nothing if current app is not anothertime
        if (anothertimeProperties.getPauseIfHidden() && !"anothertime".equals(awtrixService.getCurrentApp())) {
            return;
        }

        MqttMessage message = new MqttMessage();

        LocalTime time = LocalTime.now();


        List<Draw> drawList = new ArrayList<>();
        drawList.addAll(drawTime(time));

        drawList.addAll(drawSeconds(time));

        // TODO: gérer le loop des widgets
        drawList.addAll(drawWidgetTemperature(0));

        AwtrixPayload payload = AwtrixPayload.builder().draw(drawList).build();
        //awtrixClient.sendCustomAnothertime(payload);
//        awtrixClient.sendCustomAnothertime(objectMapper.writeValueAsString(payload));
        message.setPayload(objectMapper.writeValueAsBytes(payload));
        message.setQos(0);
        publisher.publish(anothertimeTopic, message);
    }

}
