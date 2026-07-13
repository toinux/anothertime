package org.antonus.anothertime.model;

public record AwtrixStats(
        Integer type,
        Integer lux,
        Integer ldr_raw,
        Integer ram,
        Integer bri,
        Integer temp,
        Integer hum,
        Long uptime,
        Integer wifi_signal,
        Long messages,
        String version,
        Boolean indicator1,
        Boolean indicator2,
        Boolean indicator3,
        String app,
        String uid,
        Boolean matrix,
        String ip_address
) {
}
