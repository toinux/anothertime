package org.antonus.anothertime.widget;

import org.antonus.anothertime.model.Draw;

import java.util.List;

public interface Widget {
    List<Draw> drawList(int offset, float dim);

    Boolean enabled();

    default Boolean outboundOffset(int offset) {
        return Math.abs(offset) > 7;
    }
}
