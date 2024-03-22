package org.antonus.anothertime.controller;

import lombok.RequiredArgsConstructor;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.mapstruct.AnothertimePropertiesMapper;
import org.antonus.anothertime.model.AnothertimePropertiesDto;
import org.antonus.anothertime.model.FileIconDto;
import org.antonus.anothertime.rest.AwtrixClient;
import org.antonus.anothertime.service.SettingsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ConfigController {

    private final AnothertimeProperties anothertimeProperties;
    private final AnothertimePropertiesMapper mapper;
    private final SettingsService settingsService;
    private final AwtrixClient awtrixClient;

    @GetMapping("/config")
    AnothertimePropertiesDto getConfig() {
        return mapper.map(anothertimeProperties);
    }

    @PostMapping("/config")
    void postConfig(@RequestBody AnothertimePropertiesDto anothertimePropertiesDto) {
        mapper.updateFromDto(anothertimePropertiesDto, anothertimeProperties);
    }

    @PostMapping("/load")
    void load() {
        settingsService.loadSettings();
    }

    @PostMapping("/save")
    void save() {
        settingsService.saveSettings();
    }

    @GetMapping("/icons")
    List<FileIconDto> getIcons() {
        return awtrixClient.getIcons().stream()
                .filter(f -> "file".equalsIgnoreCase(f.type()))
                .map(f -> {
                    try {
                        return new FileIconDto(f.name(), URI.create(anothertimeProperties.getAwtrixUrl()).resolve("/ICONS/").resolve(f.name()).toURL());
                    } catch (MalformedURLException e) {
                       return  null;
                    }
                })
                .toList();
    }

}
