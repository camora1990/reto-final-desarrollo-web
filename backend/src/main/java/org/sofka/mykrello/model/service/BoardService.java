package org.sofka.mykrello.model.service;

import org.sofka.mykrello.model.domain.BoardDomain;
import org.sofka.mykrello.model.domain.ColumnForBoardDomain;
import org.sofka.mykrello.model.domain.dto.BoardDTO;
import org.sofka.mykrello.model.domain.dto.ColumnDTO;
import org.sofka.mykrello.model.repository.BoardRepository;
import org.sofka.mykrello.model.repository.ColumnForBoardRepository;
import org.sofka.mykrello.model.repository.ColumnRepository;
import org.sofka.mykrello.model.repository.LogRepository;
import org.sofka.mykrello.model.repository.TaskRepository;
import org.sofka.mykrello.model.service.interfaces.BoardServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Servicios Board
 * @author Camilo Morales S - juan Camilo Castañeada
 * @version 1.0.0
 */
@Service
public class BoardService implements BoardServiceInterface {


    /**
     * Inyeccion dependencia repositorio board
     */
    @Autowired
    private BoardRepository boardRepository;

    /**
     * Inyeccion dependencia repositorio column
     */
    @Autowired
    private ColumnRepository columnRepository;

    /**
     * Inyeccion dependencia repositorio columForBoard
     */
    @Autowired
    private ColumnForBoardRepository columnForBoardRepository;

    /**
     * Inyeccion dependencia repositorio task
     */
    @Autowired
    private TaskRepository taskRepository;

    /**
     * Inyeccion dependencia repositorio log
     */
    @Autowired
    private LogRepository logRepository;


    @Override
    @Transactional(readOnly = true)
    public List<BoardDomain> getAll() {
        return boardRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public BoardDTO findById(Integer id) {
        var board = boardRepository.findById(id).orElse(null);
        if (board == null) return null;
        var colums = columnRepository.findAll();
        var boardDTO = new BoardDTO(board.getId(), board.getName(), board.getUpdatedAt(),board.getCreatedAt());
        colums.forEach(colum->{
            var taskColum = taskRepository.findAllByColumnAndAndBoard(colum.getId(), boardDTO.getId());
            boardDTO.getColumns().add(new ColumnDTO(colum.getId(),colum.getName(),colum.getCreatedAt(),colum.getUpdatedAt(),taskColum));
        });


        return boardDTO;
    }

    @Override
    @Transactional
    public BoardDomain create(BoardDomain board) {
        var newBoard = boardRepository.save(board);
        var columns = columnRepository.findAll();
        if (!columns.isEmpty()) {
            columns.forEach(column -> {
                var columnForBoard = new ColumnForBoardDomain();
                columnForBoard.setColumn(column);
                columnForBoard.setBoard(newBoard);
                columnForBoardRepository.save(columnForBoard);
            });
        }
        return newBoard;
    }

    @Override
    @Transactional
    public BoardDomain update(Integer id, BoardDomain board) {
        var verifyBoard = boardRepository.findById(id).orElse(null);
        if (verifyBoard == null) return null;
        board.setId(id);
        return boardRepository.save(board);
    }

    @Override
    @Transactional
    public BoardDomain delete(Integer id) {
        var optionalBoard = boardRepository.findById(id);
        if (optionalBoard.isPresent()) {
            var board = optionalBoard.get();
            var columnsForBoard = board.getColumnsForBoard();
            if (!columnsForBoard.isEmpty()) {
                for (ColumnForBoardDomain column: columnsForBoard){
                    deleteTasks(column.getColumn().getId(), board.getId());            // Borrado en casacda tareas
                }
                columnForBoardRepository.deleteAll(columnsForBoard);
            }
            boardRepository.delete(optionalBoard.get());
            return optionalBoard.get();
        }
        return null;
    }

    @Transactional
    public void deleteTasks(Integer idColumn, Integer idBoard){
        var tasks = taskRepository.findAllByColumnAndAndBoard(idColumn,idBoard);
        if (!tasks.isEmpty()) {
          tasks.forEach(task-> {
              logRepository.deleteByTask(task.getId());                               // Elimina los logs correspondientes a la tarea
              taskRepository.deleteById(task.getId());                                // Elimina la tarea
          });

        }

    }

}
