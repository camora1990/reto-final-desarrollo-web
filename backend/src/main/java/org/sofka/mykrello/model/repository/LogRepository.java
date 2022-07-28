package org.sofka.mykrello.model.repository;

import org.sofka.mykrello.model.domain.LogDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<LogDomain, Integer> {


    @Query(value = "DELETE FROM LogDomain WHERE taskId= 28")
    @Modifying
    void deleteByTask(Integer taskId);
    List<LogDomain> findLogDomainByTaskId(Integer taskId);


}


