package org.antonus.anothertime.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AwtrixPayload {
    private String text;
    private List<Draw> draw;
}
