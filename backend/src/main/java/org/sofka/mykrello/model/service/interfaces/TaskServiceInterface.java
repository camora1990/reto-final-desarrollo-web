package org.sofka.mykrello.model.service.interfaces;

import java.util.List;

import org.sofka.mykrello.model.domain.ColumnDomain;
import org.sofka.mykrello.model.domain.TaskDomain;

public interface TaskServiceInterface {
    public List<TaskDomain> findAllTasksById(Integer idBoard);
    public TaskDomain findById(Integer id);
    public TaskDomain create(TaskDomain task);
    public TaskDomain update(Integer id, TaskDomain task);
    public TaskDomain delete(Integer id);

    public  List<TaskDomain> findAllByColumnAndAndBoard(Integer idColumn, Integer idBoard);

    public TaskDomain changeColumn(Integer id, TaskDomain task);
}
