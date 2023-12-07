package org.antonus.anothertime.rest;

import org.antonus.anothertime.model.AwtrixSettings;
import org.antonus.anothertime.model.AwtrixStats;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PostExchange;

@Service
public interface AwtrixClient {

    @PostExchange("/api/custom?name=anothertime")
    public void sendCustomAnothertime(@RequestBody String payload);

    @GetExchange("/api/stats")
    public AwtrixStats stats();

    @GetExchange("/api/settings")
    public AwtrixSettings settings();

    @GetExchange("/ICONS/{iconName}")
    public byte[] getIcon(@PathVariable String iconName);
}
