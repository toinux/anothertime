package org.antonus.anothertime.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.model.*;
import org.antonus.anothertime.rest.AwtrixClient;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.Closeable;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class AnothertimeService implements Closeable {

    // Tick interval in ms.
    private static final long TICK_INTERVAL = 20L;
    private static final DateTimeFormatter FORMAT_HOUR = DateTimeFormatter.ofPattern("HH");
    private static final DateTimeFormatter FORMAT_MINUTES = DateTimeFormatter.ofPattern("mm");
    private static final String TOPIC = "awtrix_986dd0/custom/anothertime";

    private final ObjectMapper objectMapper;

    private final IMqttClient publisher;
    private final AwtrixClient awtrixClient;

    private int i = 0;

    public AnothertimeService(AnothertimeProperties anothertimeProperties, ObjectMapper objectMapper, AwtrixClient awtrixClient) throws MqttException {

        publisher = new MqttClient(anothertimeProperties.getBrokerUrl(), UUID.randomUUID().toString(), new MemoryPersistence());
        MqttConnectOptions options = new MqttConnectOptions();
        options.setAutomaticReconnect(true);
        options.setCleanSession(true);
        options.setConnectionTimeout(10);
        publisher.connect(options);

        this.objectMapper = objectMapper;
        this.awtrixClient = awtrixClient;

    }

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

        // TODO : xpos = 6 si pas de widgets
        int xpos = -1;


        boolean odd = time.getSecond() % 2 > 0;

        float sepms = time.getLong(ChronoField.MILLI_OF_SECOND) / 1000f;
        float seppct = 0;
        if (odd) {
            seppct = (float) ((Math.cos(2 * Math.PI * sepms + Math.PI) + 1) * 0.5);
        } else {
            seppct= 0;
        }

        Color separatorColor = new Color(seppct, seppct, seppct);


        // no animation
        xpos = xpos + 2;

        Draw hourDraw = new Text(xpos, 1, time.format(FORMAT_HOUR), Color.white);
        Draw sepDraw = new Text(xpos + 8, 1, ":", separatorColor);
        Draw minutesDraw = new Text(xpos + 10, 1, time.format(FORMAT_MINUTES), Color.white);

        return List.of(hourDraw, sepDraw, minutesDraw);

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

        drawList.add(new Line(0, 7, second * secondsProgressSize / 60, 7, Color.white));

        return drawList;
    }

    private Color dimColor(Color color, float percent) {
        return new Color((int)(color.getRed() * percent), (int)(color.getGreen() * percent), (int)(color.getBlue() * percent));
    }

    @Scheduled(fixedDelay = TICK_INTERVAL)
    @Async
    public void tick() throws MqttException, JsonProcessingException {
        MqttMessage message = new MqttMessage();

        LocalTime time = LocalTime.now();



        List<Draw> drawList = new ArrayList<>();
        drawList.addAll(drawTime(time));

        drawList.addAll(drawSeconds(time));


        AwtrixPayload payload = AwtrixPayload.builder().draw(drawList).build();
        //awtrixClient.sendCustomAnothertime(payload);
//        awtrixClient.sendCustomAnothertime(objectMapper.writeValueAsString(payload));
        message.setPayload(objectMapper.writeValueAsBytes(payload));
        message.setQos(0);
        publisher.publish(TOPIC, message);
    }

    private static int rgb888(Color color) {
        return color.getRed() << 16 | color.getGreen() << 8 | color.getBlue();
    }

}
