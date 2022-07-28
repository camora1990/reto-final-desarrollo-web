package org.sofka.mykrello.model.service;

import lombok.AllArgsConstructor;
import org.sofka.mykrello.model.domain.BoardDomain;
import org.sofka.mykrello.model.domain.ColumnForBoardDomain;
import org.sofka.mykrello.model.repository.BoardRepository;
import org.sofka.mykrello.model.repository.ColumnForBoardRepository;
import org.sofka.mykrello.model.repository.ColumnRepository;
import org.sofka.mykrello.model.service.interfaces.BoardServiceInterface;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class BoardService implements BoardServiceInterface {


    private BoardRepository boardRepository;


    private ColumnRepository columnRepository;


    private ColumnForBoardRepository columnForBoardRepository;

    @Override
    @Transactional(readOnly = true)
    public List<BoardDomain> getAll() {
        return boardRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public BoardDomain findById(Integer id) {
        var board = boardRepository.findById(id);
        return board.orElse(null);
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
                columnForBoardRepository.deleteAll(columnsForBoard); //  refactorizado
            }
            boardRepository.delete(optionalBoard.get());
            return optionalBoard.get();
        }
        return null;
    }

}
