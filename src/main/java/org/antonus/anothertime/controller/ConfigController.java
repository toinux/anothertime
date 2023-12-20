package org.antonus.anothertime.controller;

import lombok.RequiredArgsConstructor;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.mapstruct.AnothertimePropertiesMapper;
import org.antonus.anothertime.model.AnothertimePropertiesDto;
import org.antonus.anothertime.service.SettingsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ConfigController {

    private final AnothertimeProperties anothertimeProperties;
    private final AnothertimePropertiesMapper mapper;
    private final SettingsService settingsService;

    @GetMapping("/config")
    AnothertimePropertiesDto getConfig() {
        return mapper.map(anothertimeProperties);
    }

    @PostMapping("/config")
    void postConfig(@RequestBody AnothertimePropertiesDto anothertimePropertiesDto) {
        mapper.updateFromDto(anothertimePropertiesDto, anothertimeProperties);
    }

    @PostMapping("/save")
    void save() {
        settingsService.saveSettings();
    }
}
