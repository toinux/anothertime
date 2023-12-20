package org.antonus.anothertime.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.model.*;
import org.antonus.anothertime.types.SeparatorAnimation;
import org.antonus.anothertime.types.TimeAnimation;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.Closeable;
import java.io.IOException;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;

import static org.antonus.anothertime.utils.ColorUtils.dimColor;

@Service
@Slf4j
@RequiredArgsConstructor
public class AnothertimeService implements Closeable {

    // Tick interval in ms.
    public static final int TICK_INTERVAL = 65;
    private static final DateTimeFormatter FORMAT_HOUR = DateTimeFormatter.ofPattern("HH");
    private static final DateTimeFormatter FORMAT_MINUTES = DateTimeFormatter.ofPattern("mm");
    private static final DateTimeFormatter FORMAT_HOUR_AND_MINUTES = DateTimeFormatter.ofPattern("HHmm");

    @Value("${anothertime.awtrix-topic}/custom/anothertime")
    private String anothertimeTopic;

    private final ObjectMapper objectMapper;

    private final IMqttClient publisher;

    private final AwtrixService awtrixService;
    private final AnothertimeProperties anothertimeProperties;

    private final WidgetService widgetService;
    private final IconsService iconsService;

    @Override
    public void close() {
        try {
            publisher.disconnect();
            publisher.close();
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
    }

    private Color defaultColorIfNull(Color color) {
        return iconsService.defaultColorIfNull(color);
    }
    private List<Draw> drawTime(LocalTime time) {

        Color hourColor = defaultColorIfNull(anothertimeProperties.getTime().getHourColor());
        Color minutesColor = defaultColorIfNull(anothertimeProperties.getTime().getMinutesColor());
        Color separatorColor = defaultColorIfNull(anothertimeProperties.getTime().getSeparatorColor());


        var drawList = new ArrayList<Draw>();

        // TODO : xpos = 6 si pas de widgets
        int xpos = 0;


        boolean odd = time.getSecond() % 2 > 0;

        float sepms = time.getLong(ChronoField.MILLI_OF_SECOND) / 1000f;
        float seppct = 0;
        var separatorAnimation = anothertimeProperties.getTime().getSeparator();
        if (separatorAnimation != SeparatorAnimation.NONE) {
            if (odd) {
                switch (separatorAnimation) {
                    case FADE -> seppct = (float) ((Math.cos(2 * Math.PI * sepms + Math.PI) + 1) * 0.5);
                    case BLINK -> seppct = 1;
                }
                separatorColor = dimColor(separatorColor, seppct);
            } else {
                separatorColor = null;
            }
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
            for(int i = 0; i < 4; i++) {
                Color timeColor = i < 2 ? hourColor : minutesColor;
                // digit changed
                if (timeString.charAt(i) != previous.charAt(i)) {
                    // dran next on top of previous
                    switch (anothertimeProperties.getTime().getAnimation()) {
                        case SCROLL -> {
                            var ypos = (int) Math.floor(animationPct * 8);
                            drawList.add(new Text(xpos, 1 + ypos - 8, String.valueOf(timeString.charAt(i)), timeColor));
                            drawList.add(new Text(xpos, 1 + ypos, String.valueOf(previous.charAt(i)), timeColor));

                        }
                        case FADE -> {
                            char digitToPrint = ((animationPct < 0.5) ? previous : timeString).charAt(i);
                            drawList.add(new Text(xpos, 1, String.valueOf(digitToPrint), dimColor(timeColor, (float) ((Math.cos(2 * Math.PI * animationPct) + 1) * 0.5))));
                        }
                    }

                } else {
                    // digit did not change, no animation
                    drawList.add(new Text(xpos, 1, String.valueOf(timeString.charAt(i)), timeColor));
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
            drawList.add(new Text(xpos, 1, time.format(FORMAT_HOUR), hourColor));
            if (null != separatorColor) {
                drawList.add(new Text(xpos + 8, 1, ":", separatorColor));
            }
            drawList.add(new Text(xpos + 10, 1, time.format(FORMAT_MINUTES), minutesColor));
        }

        return drawList;
    }

    private List<Draw> drawSeconds(LocalTime time) {

        Color secondsColor = iconsService.defaultColorIfNull(anothertimeProperties.getSeconds().getColor());
        Color secondsBackgroundColor = iconsService.defaultColorIfNull(anothertimeProperties.getSeconds().getBackgroundColor(), Color.BLACK);

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

        if (secondsBackgroundColor != Color.BLACK) {
            drawList.add(new Line(0,7, secondsProgressSize - 1, 7, secondsBackgroundColor));
        }
        if (second > 0) {
            drawList.add(new Line(0, 7, second * secondsProgressSize / 60, 7, secondsColor));
        }

        return drawList;
    }

    private List<Draw> drawWeek() {

        List<Draw> drawList = new ArrayList<>();

        Color weekDaysColor = iconsService.defaultColorIfNull(anothertimeProperties.getWeek().getWeekColor(), Color.darkGray);
        Color currentDayColor = iconsService.defaultColorIfNull(anothertimeProperties.getWeek().getDayColor());

        DayOfWeek firstDay = anothertimeProperties.getWeek().getStartSunday() ? DayOfWeek.SUNDAY : DayOfWeek.MONDAY;
        WeekFields weekFields = WeekFields.of(firstDay, 1);
        int weekday = LocalDate.now().get(weekFields.dayOfWeek());

        int xpos = 18;
        switch (anothertimeProperties.getWeek().getStyle()) {
            case LARGE -> {
                drawList.add(new Line(xpos, 7, 31, 7, weekDaysColor));
                drawList.add(new Line(xpos+(weekday-1)*2, 7, xpos+(weekday-1)*2+1, 7, currentDayColor));
            }
            case PROGRESS -> {
                drawList.add(new Line(xpos, 7, 31, 7, weekDaysColor));
                drawList.add(new Line(xpos, 7, xpos+(weekday-1)*2+1, 7, currentDayColor));
            }
            case DOTTED -> {
                drawList.add(new Line(xpos, 7, 31, 7, Color.black));
                for (int i = 0; i < 7; i++) {
                    if (i == weekday - 1) {
                        drawList.add(new Pixel(xpos+i*2,7,currentDayColor));
                    } else {
                        drawList.add(new Pixel(xpos+i*2,7,weekDaysColor));
                    }
                }
            }
            case DOTTED2 -> {
                drawList.add(new Line(xpos, 7, 31, 7, Color.black));
                for (int i = 0; i < 7; i++) {
                    if (i == weekday - 1) {
                        drawList.add(new Line(xpos, 7, xpos+1,7,currentDayColor));
                        xpos += 3;
                    } else {
                        drawList.add(new Pixel(xpos, 7, weekDaysColor));
                        xpos += 2;
                    }
                }
            }
        }

        return drawList;
    }

    @Scheduled(fixedDelay = TICK_INTERVAL)
    @Async
    public void tick() throws MqttException, IOException {

        // Do nothing if current app is not anothertime
        if (anothertimeProperties.getPauseIfHidden() && !"anothertime".equals(awtrixService.getCurrentApp())) {
            return;
        }

        MqttMessage message = new MqttMessage();

        LocalTime time = LocalTime.now();


        List<Draw> drawList = new ArrayList<>();
        drawList.addAll(drawTime(time));

        drawList.addAll(drawSeconds(time));

        widgetService.drawWidget().ifPresent(drawList::addAll);

        drawList.addAll(drawWeek());

        AwtrixPayload payload = AwtrixPayload.builder().draw(drawList).build();
        //awtrixClient.sendCustomAnothertime(payload);
//        awtrixClient.sendCustomAnothertime(objectMapper.writeValueAsString(payload));
        message.setPayload(objectMapper.writeValueAsBytes(payload));
        message.setQos(0);
        publisher.publish(anothertimeTopic, message);
    }

}
