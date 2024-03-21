package org.antonus.anothertime.mapstruct;

import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.model.AnothertimePropertiesDto;
import org.mapstruct.*;
import org.mapstruct.control.DeepClone;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL,
        mappingControl = DeepClone.class)
public interface AnothertimePropertiesWithNullStragegyMapper {

    void updateFromDto(AnothertimePropertiesDto dto, @MappingTarget AnothertimeProperties properties);

}
