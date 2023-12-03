package org.antonus.anothertime.model;

public record AwtrixStats(
        int type,
        int lux,
        int ldr_raw,
        int ram,
        int bri,
        int temp,
        int hum,
        long uptime,
        int wifi_signal,
        long messages,
        String version,
        boolean indicator1,
        boolean indicator2,
        boolean indicator3,
        String app,
        String uid,
        boolean matrix,
        String ip_address
) {
}
