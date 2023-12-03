package org.antonus.anothertime.model;

import com.fasterxml.jackson.annotation.JsonValue;

import java.awt.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class Bitmap extends Draw {

    public Bitmap(int x, int y, int w, int h, int[] bmp) {
        super("db", bmp, x, y, w, h);
    }

}
