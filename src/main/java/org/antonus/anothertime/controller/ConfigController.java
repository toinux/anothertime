package org.antonus.anothertime.controller;

import lombok.RequiredArgsConstructor;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ConfigController {

    private final AnothertimeProperties anothertimeProperties;

    @GetMapping("/config")
    AnothertimeProperties getConfig() {
        return anothertimeProperties;
    }

}
