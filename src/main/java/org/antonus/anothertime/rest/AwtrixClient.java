package org.antonus.anothertime.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.antonus.anothertime.model.AwtrixPayload;
import org.antonus.anothertime.model.AwtrixStats;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestClient;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PostExchange;

import java.util.List;

@Service
public interface AwtrixClient {

    @PostExchange("/custom?name=anothertime")
    public void sendCustomAnothertime(@RequestBody String payload);

    @GetExchange("/stats")
    public AwtrixStats stats();
}
