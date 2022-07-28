package org.sofka.mykrello.controller;

import org.sofka.mykrello.model.domain.TaskDomain;
import org.sofka.mykrello.model.service.TaskService;
import org.sofka.mykrello.utilities.MyResponseUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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

/**
 * Controlador para realizar las consultas correspondientes a las tareas
 *
 * @author Camilo Morales S - juan Camilo Castañeada
 * @version 1.0.0
 */

@CrossOrigin(value = "*")
@RequestMapping(value = "/api/v1/task")
@RestController
public class TaskController {

    /**
     * Inyección de dependencia componente de respuestas
     */
    @Autowired
    private MyResponseUtility response;

    /**
     * Inyección de dependencia servicios de las tareas
     */
    @Autowired
    private TaskService taskService;


    /**
     * Enpoint para eliminar una tarea por id
     *
     * @param taskId - id de la tarea a eliminar
     * @return Respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<MyResponseUtility> deleteTask(@PathVariable(name = "id") Integer taskId) {
        try {
            var tasDeleted = taskService.delete(taskId);
            if (tasDeleted == null) {
                response.newResponse(true, "Task not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            response.newResponse(false, "task deleted", tasDeleted);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (DataAccessException e) {
            response.newResponse(true, e.getCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            response.newResponse(true, e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * Obtiene una tarea por id
     *
     * @return respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @GetMapping("/{id}")
    public ResponseEntity<MyResponseUtility> getTask(@PathVariable(name = "id") Integer taskId) {
        try {
            var task = taskService.findById(taskId);
            response.newResponse(true, "Task", task);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            response.newResponse(true, e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para obtener l as tarea por tablero
     *
     * @param idBoard - id del tablero
     * @return Respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @GetMapping("/board-task/{idBoard}")
    public ResponseEntity<MyResponseUtility> getTasks(@PathVariable(name = "idBoard") Integer idBoard) {
        try {
            var tasks = taskService.findAllTasksById(idBoard);
            response.newResponse(false, "list taks by board", tasks);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            response.newResponse(true, e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para obtener las tareas por tablero y por columna
     *
     * @param idBoartd - id del tablero
     * @param idColum  -id de la columna
     * @return Respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @GetMapping("/{idBoard}/{idColum}")
    public ResponseEntity<MyResponseUtility> getTaskByColumn(@PathVariable("idBoard") Integer idBoartd, @PathVariable("idColum") Integer idColum) {
        try {
            var taks = taskService.findAllByColumnAndAndBoard(idColum, idBoartd);
            response.newResponse(false, "list tasks by colum and board", taks);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            response.newResponse(true, e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Endpoint para creacion de tarea
     *
     * @param task - Objeto de tipo tarea
     * @return Respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @PostMapping("/")
    public ResponseEntity<MyResponseUtility> createTask(@RequestBody TaskDomain task) {

        try {
            var newTask = taskService.create(task);
            if (newTask == null) {
                response.newResponse(true, "Column or board not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            response.newResponse(false, "task created", newTask);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (DataAccessException e) {
            response.newResponse(true, e.getCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            response.newResponse(true, e.getCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    /**
     * Endpoint para actualizar la tarea por id
     *
     * @param taskId - id de la tarea a actualizar
     * @param task   - Objeto de tipo tarea con los campos a actualizar
     * @return Respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @PutMapping("/{id}")
    public ResponseEntity<MyResponseUtility> updateTask(@PathVariable("id") Integer taskId, @RequestBody TaskDomain task) {
        try {
            var taskUpdate = taskService.update(taskId, task);
            if (taskUpdate == null) {
                response.newResponse(true, "Task not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            response.newResponse(false, "Task updated successfully", taskUpdate);
            return new ResponseEntity<>(response, HttpStatus.OK);

        }catch (DataAccessException e ){
            response.newResponse(true, e.getCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }catch (RuntimeException e ){
            response.newResponse(true, e.getCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    /**
     * Endopint para cambiar la tarea de columna
     *
     * @param taskId - id de la tarea
     * @param task   - Objeto tipo tarea con la columna a cambiar
     * @return Respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @PutMapping("/change-column/{id}")
    public ResponseEntity<MyResponseUtility> chageColumn(@PathVariable("id") Integer taskId, @RequestBody TaskDomain task) {
        try {
            var taskUpdate = taskService.changeColumn(taskId, task);
            if (taskUpdate == null) {
                response.newResponse(true, "Task or column not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            response.newResponse(false, "succesful column change", taskUpdate);
            return new ResponseEntity<>(response, HttpStatus.OK);

        }catch (DataAccessException e ){
            response.newResponse(true, e.getCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }catch (RuntimeException e ){
            response.newResponse(true, e.getCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

}
