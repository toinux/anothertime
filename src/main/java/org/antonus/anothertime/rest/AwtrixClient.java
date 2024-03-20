package org.antonus.anothertime.rest;

import org.antonus.anothertime.model.AwtrixSettings;
import org.antonus.anothertime.model.AwtrixStats;
import org.antonus.anothertime.model.FileIcon;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PostExchange;

import java.util.List;

public interface AwtrixClient {

    @PostExchange("/api/custom?name=anothertime")
    void sendCustomAnothertime(@RequestBody String payload);

    @GetExchange("/api/stats")
    AwtrixStats stats();

    @GetExchange("/api/settings")
    AwtrixSettings settings();

    @GetExchange("/ICONS/{iconName}")
    byte[] getIcon(@PathVariable String iconName);

    @GetExchange(value = "/list?dir=/ICONS")
    List<FileIcon> getIcons();
}
