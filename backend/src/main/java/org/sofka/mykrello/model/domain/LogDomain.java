package org.sofka.mykrello.model.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.annotation.Transient;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.Instant;

@Data
@Entity
@Table(name = "krl_log")
@JsonIgnoreProperties(value = {"task"}, allowSetters = false, allowGetters = true)
public class LogDomain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id", nullable = false, updatable = false)
    private Integer id;

    @Column(name = "tsk_id_task")
    private Integer taskId;

    @Column(name = "clm_id_previous")
    private Integer previous;

    @Column(name = "clm_id_current")
    private Integer current;

    @Column(name = "log_created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @JoinColumn(name = "tsk_id_task", insertable = false, updatable = false)
    @JsonBackReference(value = "log-task")
    @ManyToOne(fetch = FetchType.LAZY)
    @Transient
    private TaskDomain task;

    public LogDomain(Integer taskId, Integer previous, Integer current) {
        this.taskId = taskId;
        this.previous = previous;
        this.current = current;
    }

    public LogDomain() {

    }
}
