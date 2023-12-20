package org.antonus.anothertime.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.mapstruct.AnothertimePropertiesMapper;
import org.antonus.anothertime.model.AnothertimePropertiesDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SettingsService {
    private final AnothertimeProperties anothertimeProperties;
    private final ObjectMapper objectMapper;
    private final ResourceLoader resourceLoader;
    private final AnothertimePropertiesMapper mapper;
    @Value("file:./anothertime-settings.json")
    private Resource settingsResource;

    @PostConstruct
    public void loadSettings() {
        if (settingsResource.exists()) {
            try {
                log.info("anothertime-settings.json found, applying settings");
                AnothertimePropertiesDto anothertimePropertiesDto = objectMapper.readValue(settingsResource.getFile(), AnothertimePropertiesDto.class);
                mapper.updateFromDto(anothertimePropertiesDto, anothertimeProperties);
            } catch (Exception e) {
                log.error("could not load anothertime-settings.json : {}", e.getMessage());
            }
        } else {
            log.info("anothertime-settings.json not found");
        }
    }

    @SneakyThrows
    public void saveSettings() {
        objectMapper.writeValue(settingsResource.getFile(), mapper.map(anothertimeProperties));
        log.info("settings saved to {}", settingsResource.getFile());
    }
}
