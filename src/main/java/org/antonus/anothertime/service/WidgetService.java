package org.antonus.anothertime.service;

import lombok.RequiredArgsConstructor;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.model.Draw;
import org.antonus.anothertime.types.WidgetAnimation;
import org.antonus.anothertime.widget.Widget;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.antonus.anothertime.service.AnothertimeService.TICK_INTERVAL;

@Service
@RequiredArgsConstructor
public class WidgetService {
    private long activationTime = System.currentTimeMillis();
    private final AnothertimeProperties anothertimeProperties;
    private final List<Widget> allWidgetList;
    private List<Widget> widgetList = Collections.emptyList();
    private int current = 0;
    private int previous = 0;

    public Optional<List<Draw>> drawWidget() {

        List<Draw> drawList = new ArrayList<>();

        WidgetAnimation widgetAnimation = anothertimeProperties.getWidgets().getAnimation();
        long animationDuration = switch (widgetAnimation) {
            case SCROLL -> 8 * TICK_INTERVAL;
            case FADE -> 16 * TICK_INTERVAL;
            default -> 0;
        };

        if (widgetList.isEmpty()) {
            return Optional.empty();
        }

        if (widgetAnimation == WidgetAnimation.NONE || widgetList.size() == 1) {
            return Optional.of(widgetList.get(current).drawList(0, 1));
        }

        long millis = System.currentTimeMillis() - activationTime;

        // Animation during the first animationDuration in ms after the last activationTime
        if (millis < animationDuration) {

            // percentage of the animation (0 = started, 1 = finished)
            float animationPct = (float) millis / animationDuration;

            switch (widgetAnimation) {
                case SCROLL -> {
                    int offset = (int) Math.floor(animationPct * 8);
                    drawList.addAll(widgetList.get(current).drawList(offset - 8, 1));
                    drawList.addAll(widgetList.get(previous).drawList(offset, 1));
                }
                case FADE -> {
                    float dim = (float) ((Math.cos(2 * Math.PI * animationPct) + 1) * 0.5);
                    drawList.addAll(widgetList.get((animationPct < 0.5) ? previous : current).drawList(0, dim));
                }
            }

        } else {
            drawList.addAll(widgetList.get(current).drawList(0, 1));
        }

        return Optional.of(drawList);
    }

    // TODO : parametrer ce delay, mais pas moins de 2 secondes
    @Scheduled(fixedDelay = 5000L)
    @Async
    public void next() {
        widgetList = allWidgetList.stream().filter(Widget::enabled).toList();
        activationTime = System.currentTimeMillis();
        previous = current;
        current++;
        if (current >= widgetList.size()) {
            current = 0;
        }
    }
}
