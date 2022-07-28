package org.sofka.mykrello.model.service;

import org.sofka.mykrello.model.domain.ColumnDomain;
import org.sofka.mykrello.model.domain.LogDomain;
import org.sofka.mykrello.model.domain.TaskDomain;
import org.sofka.mykrello.model.repository.ColumnRepository;
import org.sofka.mykrello.model.repository.TaskRepository;
import org.sofka.mykrello.model.service.interfaces.TaskServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskService implements TaskServiceInterface {

    @Autowired
    private LogService logService;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ColumnRepository columnRepository;


    @Override
    public List<TaskDomain> findAllTasksById(Integer idBoard) {
        return taskRepository.findAllByBoard(idBoard);
    }

    @Override
    public TaskDomain findById(Integer id) {
        return taskRepository.findById(id).orElse(null);

    }

    @Override
    @Transactional(readOnly = false)
    public TaskDomain create(TaskDomain task) {

        var newTask = taskRepository.save(task);
        var colum = columnRepository.findById(task.getColumn()).orElse(null);
        var log = new LogDomain(newTask.getId(), colum, colum);
        logService.create(log);
        return newTask;
    }

    @Override
    @Transactional(readOnly = false)
    public TaskDomain update(Integer id, TaskDomain task) {
        var verifyTask = taskRepository.findById(id).orElse(null);
        if (verifyTask == null) return null;
        var description = task.getDescription() == null ? verifyTask.getDescription() : task.getDescription();
        var name = task.getName() == null ? verifyTask.getName() : task.getName();
        var delivery = task.getDelivery() == null ? verifyTask.getDelivery() : task.getDelivery();

        verifyTask.setDescription(description);
        verifyTask.setDelivery(delivery);
        verifyTask.setName(name);

        return taskRepository.save(verifyTask);
    }

    @Override
    @Transactional(readOnly = false)
    public TaskDomain delete(Integer id) {
        var task = taskRepository.findById(id).orElse(null);
        if (task == null) return null;
        logService.deleteAllByTaskId(task.getId());
        taskRepository.deleteById(id);
        return task;
    }

    @Override
    public List<TaskDomain> findAllByColumnAndAndBoard(Integer idColumn, Integer idBoard) {
        return taskRepository.findAllByColumnAndAndBoard(idColumn, idBoard);
    }

    @Override
    @Transactional(readOnly = false)
    public TaskDomain changeColumn(Integer id, TaskDomain task) {
        var verifyTask = taskRepository.findById(id).orElse(null);
        if(verifyTask == null) return null;
        var newColumn = columnRepository.findById(task.getColumn()).orElse(null);
        if(newColumn == null) return null;
        var log = new LogDomain(id, verifyTask.getColumnDomain(), newColumn);
        verifyTask.setColumn(newColumn.getId());
        logService.create(log);
        taskRepository.save(verifyTask);
        return verifyTask;
    }


}
