package org.antonus.anothertime.icons;

import java.util.TreeMap;

public class AnimatedIcon {
    int duration = 0;
    TreeMap<Integer, AnimatedFrame> frames = new TreeMap<>();

    public void addFrame(int index, int delay, int[] frame) {
        frames.put(duration, new AnimatedFrame(index, frame));
        duration += delay;
    }

    public AnimatedFrame getFrame() {
        if (duration == 0) {
            return frames.firstEntry().getValue();
        }
        return frames.floorEntry((int)(System.currentTimeMillis() % duration)).getValue();
    }

}
