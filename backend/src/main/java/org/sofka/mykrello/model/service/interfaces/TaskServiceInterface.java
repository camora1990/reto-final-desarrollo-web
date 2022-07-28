package org.sofka.mykrello.model.service.interfaces;

import org.sofka.mykrello.model.domain.TaskDomain;

import java.util.List;

/**
 * Interfaz para implementar todos los metodos en el servicio de tareas
 * @author Camilo Morales S - juan Camilo Castañeada
 * @version 1.0.0
 */

public interface TaskServiceInterface {

    /**
     * Metodo para obtener la lista de tareas por el id del tablero
     * @param idBoard - id tablero
     * @return Lista de tareas pertenecientes al tablero
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    public List<TaskDomain> findAllTasksById(Integer idBoard);

    /**
     * Metodo para obtener una tarea por id
     * @param id - id de la tarea
     * @return Objeto tarea encontrada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    public TaskDomain findById(Integer id);

    /**
     * Metodo para crear una tarea
     * @param task - Objeto de tipo tarea
     * @return Objeto tarea creada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    public TaskDomain create(TaskDomain task);

    /**
     * Metodo para actualizar una tarea
     * @param id - id de la tarea a actualizar
     * @param task - Objeto de tipo tarea
     * @return Objeto de la tarea actualizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    public TaskDomain update(Integer id, TaskDomain task);

    /**
     * Metodo para eliminar una tarea por id
     * @param id - id de la tarea a eliminar
     * @return Objeto de la tarea eliminada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    public TaskDomain delete(Integer id);

    /**
     * Metodo para implementar en el servicio y encontrar todas las tareas pertenecientes a una columna y a un tablero
     * @param idColumn - id de la columna
     * @param idBoard - id del tablero
     * @return Lista de tareas
     * @author Camilo Morales S - juan Camilo Castañeada
     */

    public  List<TaskDomain> findAllByColumnAndAndBoard(Integer idColumn, Integer idBoard);

    /**
     * Medodo para cambiar la tarea de columna
     * @param id - id de la tarea
     * @param task - Objeto tarea con la columna a cambiar
     * @return Retorna la tarea actualizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    public TaskDomain changeColumn(Integer id, TaskDomain task);
}
