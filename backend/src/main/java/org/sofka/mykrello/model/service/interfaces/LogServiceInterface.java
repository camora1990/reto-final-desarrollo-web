package org.sofka.mykrello.model.service.interfaces;

import java.util.List;

import org.sofka.mykrello.model.domain.LogDomain;
import org.sofka.mykrello.model.domain.TaskDomain;

public interface LogServiceInterface {
    public List<LogDomain> findByTask(Integer task);
    public LogDomain create(LogDomain log);

    public void deleteAllByTaskId(Integer taskId);
}
