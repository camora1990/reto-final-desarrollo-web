package org.sofka.mykrello.controller;

import org.sofka.mykrello.model.domain.BoardDomain;
import org.sofka.mykrello.model.service.BoardService;
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
        response.data = boardService.getAll();
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
        response.data = boardService.findById(id);
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
        response.data = boardService.create(board);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
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
        response.data = boardService.update(id, board);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * EndPoint para eliminar un rablero
     * @param id Id del tablero a borrar
     * @return respuesta personalizada
     * @author Camilo Morales S - juan Camilo Castañeada
     */
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<MyResponseUtility> delete(@PathVariable(value = "id") Integer id) {
        response.data = boardService.delete(id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


}
