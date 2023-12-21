package org.antonus.anothertime.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Icon {
    private String name;
    private int x = 0;
    private int y = 0;
    public Icon(String name) {
        this.name = name;
    }
}
