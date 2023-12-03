package org.antonus.anothertime.model;

import java.awt.*;

public class Line extends Draw {
    public Line(int x0, int y0, int x1, int y1, Color cl) {
        super("dl", cl, x0, y0, x1, y1);
    }
}
