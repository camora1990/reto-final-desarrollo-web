import BoardServices from "../model/services/board.service.js";
import { PopUp } from "../utilities/popUps.js";
import { BoardView } from "../view/board.view.js";

/**
 * Controlador de los tableros
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */

class BoardController {
  #boardservice;
  #boardView;
  /**
   * Constructor de clase para iniciar parametros
   */
  constructor() {
    this.#boardservice = new BoardServices(); //se crea una instacia de los servicios
    this.#boardView = new BoardView(this); //se crea una instacia de la vista
  }
  /**
   * Creatodos los tableros disponibles
   */
  async init() {
    try {
      const boards = await this.#boardservice.getBoards();     // Obtienen todos los tableros
      this.#boardView.init(boards);
    } catch (error) {
      PopUp.errorPopUp(error.response?.message||error.message);
    }
  }

  /**
   * Funcion para eliminar un tablero por id
   * @param {Integer} idBoard - Id del board
   */
  async deleteBoard(idBoard) {
    try {
      await this.#boardservice.deleteBoard(idBoard);            // elimina tableros por id
    } catch (error) {
      PopUp.errorPopUp(error.response?.message||error.message);
    }
  }

  /**
   * funcion para crear un tablero 
   * @param {Object} data - Objeto para crear el tablero
   * @returns - Objeto de creacion
   */
  async createBoard(data) {
    try {
      return await this.#boardservice.createBoard(data);        // Crea el tablero segun el Objeto(data) pasado
    } catch (error) {
      PopUp.errorPopUp(error.response?.message||error.message);
    }
   
  }

  async editBoard(board,idBoard){
    try {
      return await this.#boardservice.editBoar(board,idBoard);  // Edita el tablero segun el objeto(data) pasado
    } catch (error) {
      PopUp.errorPopUp(error.response?.message||error.message);
    }
  }
}

const boardController = new BoardController();

boardController.init();
