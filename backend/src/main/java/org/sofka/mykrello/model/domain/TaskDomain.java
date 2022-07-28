package org.sofka.mykrello.model.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "krl_task")
@JsonIgnoreProperties(value = {"logs"}, allowGetters = true, allowSetters = false)
public class TaskDomain implements Serializable {

    private static final long serialVersionUID = 1L;

    @PreUpdate
    public void preUpdate() {
        if (this.updatedAt == null)
            this.updatedAt = Instant.now();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tsk_id", nullable = false)
    private Integer id;

    @Column(name = "tsk_name")
    private String name;

    @Column(name = "tsk_description")
    private String description;

    @Column(name = "clm_id_column")
    private Integer column;

    @Column(name = "brd_id_board")
    private Integer board;

    @Column(name = "tsk_delivery_date")
    private Instant delivery;

    @Column(name = "tsk_created_at")
    private Instant createdAt = Instant.now();

    @Column(name = "tsk_updated_at")
    private Instant updatedAt;

    @JsonManagedReference(value = "log-task")
    @OneToMany(mappedBy = "task",fetch = FetchType.EAGER, targetEntity = LogDomain.class)
    private List<LogDomain> logs = new ArrayList<>();

    @JoinColumn(name = "clm_id_column",insertable = false,updatable = false)
    @JsonIgnore
    @JsonBackReference(value = "column-tasks")
    @ManyToOne(fetch = FetchType.EAGER)
    private ColumnDomain columnDomain;

}
