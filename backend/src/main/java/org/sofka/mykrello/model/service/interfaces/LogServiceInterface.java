package org.sofka.mykrello.model.service.interfaces;

import org.sofka.mykrello.model.domain.LogDomain;

import java.util.List;

/**
 * Interfaz con los metodo para implementar en el servicio de log
 * @author Camilo Morales S - juan Camilo Castañeada
 * @version 1.0.0
 */

public interface LogServiceInterface {
    /**
     * Metodo para implementar en el servicio y obtener la lista de logs pertenecientes a una tarea
     * @param task - id de la tarea
     * @return Retorna una lista con todos los registros del log pertenecientes a una tarea
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    public List<LogDomain> findByTask(Integer task);

    /**
     * Metodo para implementar la creacion de registros log
     * @param log - Objeto de tipo log con los campos a crear
     * @return Retorna el log creado
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    public LogDomain create(LogDomain log);

    /**
     * Metodo para eliminar todos los logs pertenecientes a una tarea
     * @param taskId - id de la tarea
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    public void deleteAllByTaskId(Integer taskId);
}
