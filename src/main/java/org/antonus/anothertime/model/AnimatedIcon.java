package org.antonus.anothertime.model;

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
            return frames.floorEntry(0).getValue();
        }
        // TODO : renvoyer l'entry directement pour avoir la clef que l'on pourrait utiliser dans le cache du dimmed icon ?
        return frames.floorEntry((int)(System.currentTimeMillis() % duration)).getValue();
    }

}
