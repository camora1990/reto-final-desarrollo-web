import BoardServices from "../model/services/board.service.js";
import { PopUp } from "../utilities/popUps.js";
import { IndexView } from "../view/index.view.js";

/**
 * Controlador de los tableros
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */

class IndexController {
  #boardservice;
  #boardView;
  /**
   * Constructor de clase para iniciar parametros
   */
  constructor() {
    this.#boardservice = new BoardServices(); //se crea una instacia de los servicios
    this.#boardView = new IndexView(this); //se crea una instacia de la vista
  }
  /**
   * Crea todos los tableros disponibles
   */
  async init() {
    try {
      const boards = await this.#boardservice.getBoards();     // Obtienen todos los tableros
      this.#boardView.init(boards);   
                               // Le pasa los tableros obtenidos a la vista 
    } catch (error) {
      PopUp.errorPopUp(error.response?.data.message||error.message);
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

const indexController = new IndexController();

indexController.init();
