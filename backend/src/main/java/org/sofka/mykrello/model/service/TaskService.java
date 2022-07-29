package org.sofka.mykrello.model.service;

import org.sofka.mykrello.model.domain.LogDomain;
import org.sofka.mykrello.model.domain.TaskDomain;
import org.sofka.mykrello.model.repository.ColumnRepository;
import org.sofka.mykrello.model.repository.TaskRepository;
import org.sofka.mykrello.model.service.interfaces.TaskServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Servicios Task
 * @author Camilo Morales S - juan Camilo Castañeada
 * @version 1.0.0
 */
@Service
public class TaskService implements TaskServiceInterface {


    /**
     * Inyeccion dependencia repositorio log
     */
    @Autowired
    private LogService logService;


    /**
     * Inyeccion dependencia repositorio task
     */
    @Autowired
    private TaskRepository taskRepository;


    /**
     * Inyeccion dependencia repositorio column
     */
    @Autowired
    private ColumnRepository columnRepository;


    /**
     * Inyeccion dependencia repositorio board
     */
    @Autowired
    private BoardService boardService;


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
        var verifyBoard = boardService.findById(task.getBoard());                            //Valida si el board existe en la base de datos
        if (verifyBoard == null) return null;

        var verifycolum = columnRepository.findById(task.getColumn()).orElse(null);
        if (verifycolum == null) return null;                                                            //Valida si la columna existe en la base de datos

        var newTask = taskRepository.save(task);
        var colum = columnRepository.findById(task.getColumn()).orElse(null);

        if (colum == null) return null;                                                                 //Valida si la columna existe en la base de datos
        var log = new LogDomain(newTask.getId(), colum.getId(), colum.getId());
        logService.create(log);
        return newTask;
    }

    @Override
    @Transactional(readOnly = false)
    public TaskDomain update(Integer id, TaskDomain task) {
        var verifyTask = taskRepository.findById(id).orElse(null);
        if (verifyTask == null) return null;                                                           //Valida si existe la tarea

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
        if (task == null) return null;                                             //Verifica si la tarea existe
        logService.deleteAllByTaskId(task.getId());                                //Elimina el log antes de eliminar la tarea
        taskRepository.deleteById(id);                                             //Elimina la tarea
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
        if(verifyTask == null) return null;                                                             //Verifica si la tarea existe

        var newColumn = columnRepository.findById(task.getColumn()).orElse(null);
        if(newColumn == null) return null;                                                              //Veirica si la columna a cambiar existe

        var log = new LogDomain(id, verifyTask.getColumn(), newColumn.getId());
        verifyTask.setColumn(newColumn.getId());

        logService.create(log);                                                                          //Crea el log del cambio
        taskRepository.save(verifyTask);                                                                 //guarda el cambio de columna
        return verifyTask;
    }


}
