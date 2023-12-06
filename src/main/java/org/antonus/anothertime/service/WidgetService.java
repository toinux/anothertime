package org.antonus.anothertime.service;

import org.antonus.anothertime.animationtypes.WidgetAnimation;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.model.Draw;
import org.antonus.anothertime.widget.HumidityWidget;
import org.antonus.anothertime.widget.TemperatureWidget;
import org.antonus.anothertime.widget.Widget;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WidgetService {
    private LocalTime activationTime;
    // TODO : à déterminer en fonction de l'animation
    // private int animationDuration;
    private final WidgetAnimation widgetAnimation;
    private final List<Widget> widgetList;
    private int current = 0;

    public WidgetService(AnothertimeProperties anothertimeProperties, AwtrixService awtrixService) {
        widgetAnimation = anothertimeProperties.getWidgets().getAnimation();
        widgetList = new ArrayList<>();
        AnothertimeProperties.WidgetsProperties widgets = anothertimeProperties.getWidgets();
        if (widgets.getEnabled()) {
            if (widgets.getTemperature().getEnabled()) {
                widgetList.add(new TemperatureWidget(awtrixService));
            }
            if (widgets.getHumidity().getEnabled()) {
                widgetList.add(new HumidityWidget(awtrixService));
            }
        }
    }

    public Optional<List<Draw>> drawWidget() {
        // TODO : gérer current + previous en cas d'animation
        if (widgetList.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(widgetList.get(current).drawList(0, 1));
    }

    @Scheduled(fixedDelay = 5000L)
    @Async
    public void next() {
        current++;
        if (current >= widgetList.size()) {
            current = 0;
        }
    }
}
