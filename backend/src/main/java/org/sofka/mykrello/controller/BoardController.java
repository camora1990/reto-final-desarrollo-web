package org.sofka.mykrello.controller;

import org.sofka.mykrello.model.domain.BoardDomain;
import org.sofka.mykrello.model.service.BoardService;
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
 * Controlador para realizar las consultas correspondientes al Board
 *
 * @author Camilo Morales S - juan Camilo Castañeada
 * @version 1.0.0
 */

@RestController
@RequestMapping(value = "/api/v1/board")
@CrossOrigin(value = "*")
public class BoardController {

    /**
     * Inyección de dependencia componente de respuestas
     */
    @Autowired
    private MyResponseUtility response;

    /**
     * Inyección de dependencia servicios del board
     */
    @Autowired
    private BoardService boardService;


    /**
     * Obtiene todos los tableros
     *
     * @return respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @GetMapping(path = "/")
    public ResponseEntity<MyResponseUtility> index() {
        var data = boardService.getAll();
        response.newResponse(false,"List boards",data );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Obtiene el tablero por id
     * @param id - id del tablearo a obtener
     * @return respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @GetMapping(path = "/{id}")
    public ResponseEntity<MyResponseUtility> getBoardById(@PathVariable(value = "id") Integer id) {
        var data = boardService.findById(id);
        response.newResponse(false,"Board",data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Endpoint para crear un tablero
     * @param board - Objeto tipo tablero a crear
     * @return respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @PostMapping(path = "/")
    public ResponseEntity<MyResponseUtility> create(@RequestBody BoardDomain board) {
        try {
            var data = boardService.create(board);
            response.newResponse(false,"Board created",data);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }catch (DataAccessException e ){
            response.newResponse(true, e.getCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }catch (RuntimeException e ){
            response.newResponse(true, e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * Endpoint para actualizar el tablero
     * @param id - Id de tablero a actualizar
     * @param board - Objeto de tipo tablero con los campos a actualizar
     * @return respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @PutMapping(path = "/{id}")
    public ResponseEntity<MyResponseUtility> put(@PathVariable(value = "id") Integer id,
                                                 @RequestBody BoardDomain board) {

        try {
            var data = boardService.update(id, board);
            if (data == null) {
                response.newResponse(true, "Board not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            response.newResponse(false, "Board updated successfully",data);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (DataAccessException e){
            response.newResponse(true, e.getCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }catch (RuntimeException e ){
            response.newResponse(true, e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * EndPoint para eliminar un rablero
     * @param id Id del tablero a borrar
     * @return respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<MyResponseUtility> delete(@PathVariable(value = "id") Integer id) {
       try {
           var data = boardService.delete(id);
           if (data == null) {
               response.newResponse(true, "Board not found");
               return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
           }
           return new ResponseEntity<>(response, HttpStatus.OK);

       }catch (DataAccessException e){
           response.newResponse(true, e.getCause().getMessage());
           return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
       }catch (RuntimeException e ){
           response.newResponse(true, e.getMessage());
           return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
       }

    }


}
