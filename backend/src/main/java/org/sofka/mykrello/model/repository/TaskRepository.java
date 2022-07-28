package org.sofka.mykrello.model.repository;

import org.sofka.mykrello.model.domain.TaskDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskDomain, Integer> {

    /**
     * Metodo para personalizado para obtener las tareas por id del tablero
     * @param idBoard - id del tablero
     * @return Lista de tareas pertenecientes al tablero
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    List<TaskDomain> findAllByBoard(Integer idBoard);

    /**
     * Metodo personalizado para obtener el tablero de una columna especifica
     * @param idColumn - id de la columna
     * @param idBoard - id del tablero
     * @return Lista de tareas pertenecientes a la columna y al tablero
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    List<TaskDomain> findAllByColumnAndAndBoard(Integer idColumn, Integer idBoard);
}
