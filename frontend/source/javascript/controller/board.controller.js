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
  async deleteBoard(idBoard) {
    try {
      await this.#boardservice.deleteBoard(idBoard);            // elimina tableros por id
    } catch (error) {
      PopUp.errorPopUp(error.response?.message||error.message);
    }
  }
}

const boardController = new BoardController();

boardController.init();
