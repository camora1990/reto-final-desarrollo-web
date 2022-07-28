package org.sofka.mykrello.controller;

import org.sofka.mykrello.model.domain.TaskDomain;
import org.sofka.mykrello.model.service.TaskService;
import org.sofka.mykrello.utilities.MyResponseUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(value = "*")
@RequestMapping(value = "/api/v1/task")
@RestController
public class TaskController {

    @Autowired
    private MyResponseUtility response;

    @Autowired
    private TaskService taskService;

    @GetMapping("/{id}")
    public ResponseEntity<MyResponseUtility> getTask(@PathVariable(name = "id") Integer taskId) {
        var task = taskService.findById(taskId);
        response.newResponse(true, "Task", task);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<MyResponseUtility> createTask(@RequestBody TaskDomain task) {
        var newTask = taskService.create(task);
        response.newResponse(false, "task created", newTask);
        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MyResponseUtility> deleteTask(@PathVariable(name = "id") Integer taskId) {
        var tasDeleted = taskService.delete(taskId);
        response.newResponse(false, "task deleted", tasDeleted);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/board-task/{idBoard}")
    public ResponseEntity<MyResponseUtility> getTasks(@PathVariable(name = "idBoard") Integer idBoard) {
        var tasks = taskService.findAllTasksById(idBoard);
        response.newResponse(false, "list taks by board", tasks);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{idBoard}/{idColum}")
    public ResponseEntity<MyResponseUtility> getTaskByColumn(@PathVariable("idBoard") Integer idBoartd, @PathVariable("idColum") Integer idColum) {
        var taks = taskService.findAllByColumnAndAndBoard(idColum, idBoartd);
        response.newResponse(false, "list tasks by colum and board", taks);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MyResponseUtility> updateTask(@PathVariable("id") Integer taskId, @RequestBody TaskDomain task) {
        var taskUpdate = taskService.update(taskId, task);
        response.newResponse(false, "Task updated successfully", taskUpdate);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
