package org.antonus.anothertime.rest;

import org.antonus.anothertime.model.AwtrixSettings;
import org.antonus.anothertime.model.AwtrixStats;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PostExchange;

public interface AwtrixClient {

    @PostExchange("/api/custom?name=anothertime")
    void sendCustomAnothertime(@RequestBody String payload);

    @GetExchange("/api/stats")
    AwtrixStats stats();

    @GetExchange("/api/settings")
    AwtrixSettings settings();

    @GetExchange("/ICONS/{iconName}")
    byte[] getIcon(@PathVariable String iconName);
}
