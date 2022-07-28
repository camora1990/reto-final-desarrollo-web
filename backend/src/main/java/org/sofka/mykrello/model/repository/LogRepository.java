package org.sofka.mykrello.model.repository;

import org.sofka.mykrello.model.domain.LogDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<LogDomain, Integer> {

    /**
     * Query personalizada para eliminar el log por id de tarea
     * @param taskId - id de la tarea
     * @author Camilo Morales S - juan Camilo Castañeada
     */

    @Query(value = "DELETE FROM LogDomain WHERE taskId= :taskId")
    @Modifying
    void deleteByTask(@Param("taskId") Integer taskId);

    /**
     * Metodo personalizado para obtener los logs por tarea
     * @param taskId - id de la tarea
     * @return Lista de logs pertenecientes a la tarea
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    List<LogDomain> findLogDomainByTaskId(Integer taskId);


}


