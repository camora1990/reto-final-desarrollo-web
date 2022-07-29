package org.sofka.mykrello.model.domain.dto;

import lombok.Data;
import org.sofka.mykrello.model.domain.TaskDomain;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
public class ColumnDTO {

    private Integer id;

    private String name;

    private Instant createdAt;

    private Instant updatedAt;

    private List<TaskDomain> tasks = new ArrayList<>();

    public ColumnDTO(Integer id, String name, Instant createdAt, Instant updatedAt, List<TaskDomain> tasks) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.tasks = tasks;
    }
}
