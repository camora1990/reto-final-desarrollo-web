package org.sofka.mykrello.model.domain.dto;

import lombok.Data;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
public class BoardDTO {
    private Integer id;
    private String name;
    private Instant updatedAt;
    private Instant createdAt;
    private List<ColumnDTO> columns = new ArrayList<>();

    public BoardDTO(Integer id, String name, Instant updatedAt, Instant createdAt) {
        this.id = id;
        this.name = name;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }
}
