package org.antonus.anothertime.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.mapstruct.AnothertimePropertiesMapper;
import org.antonus.anothertime.mapstruct.AnothertimePropertiesWithNullStragegyMapper;
import org.antonus.anothertime.model.AnothertimePropertiesDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import tools.jackson.databind.json.JsonMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class SettingsService {
    private final AnothertimeProperties anothertimeProperties;
    private final JsonMapper jsonMapper;
    private final AnothertimePropertiesMapper mapper;
    private final AnothertimePropertiesWithNullStragegyMapper nullStragegyMapper;
    @Value("file:./anothertime-settings.json")
    private Resource settingsResource;

    @PostConstruct
    public void loadSettings() {
        if (settingsResource.exists()) {
            try {
                log.info("anothertime-settings.json found, applying settings");
                AnothertimePropertiesDto anothertimePropertiesDto = jsonMapper.readValue(settingsResource.getFile(), AnothertimePropertiesDto.class);
                nullStragegyMapper.updateFromDto(anothertimePropertiesDto, anothertimeProperties);
            } catch (Exception e) {
                log.error("could not load anothertime-settings.json : {}", e.getMessage());
            }
        } else {
            log.info("anothertime-settings.json not found");
        }
    }

    @SneakyThrows
    public void saveSettings() {
        jsonMapper.writeValue(settingsResource.getFile(), mapper.map(anothertimeProperties));
        log.info("settings saved to {}", settingsResource.getFile());
    }
}
