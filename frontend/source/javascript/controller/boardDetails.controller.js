import BoardServices from "../model/services/board.service.js";
import { PopUp } from "../utilities/popUps.js";
import { boardDetailsView } from "../view/boardDetails.view.js";
/**
 * Clase controladora pára los tableros, encargada de utilizar el servicio y la vista de tableros
 * @class BoardDetailsController
 * @author Camilo Morales Sanchez - Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
export class BoardDetailsController {
  #boardService;
  #boardDetailsView;
  constructor() {
    this.#boardService = new BoardServices();                         //Instancia para el servicio de los tableros
    this.#boardDetailsView = new boardDetailsView();                  //Instancia para el servicio de la vista de los tableros
  }
  /**
   * Metodo que se comunica con el servicio y la vista de los tableros
   */
  async init() {
    const params = new URLSearchParams(window.location.search);
    const boardId = params.get("board");
    if (boardId) {
      try {
        const board = await this.#boardService.getBoardById(boardId);  //Obtiene tablero por id
        this.#boardDetailsView.createViewBoardDetails(board);          //Crea el tablero obtenido y se lo manda la vista
      } catch (error) {
        const message = error.response?.data.message || error.message;
        PopUp.errorPopUp(message).then(() =>
          window.location.assign("index.html")
        );
      }
    } else {
      window.location.assign("index.html");
    }
  }
}
/**
 * Instancia para exportar la clase BoardDetailsController() y poder ser importada desde otro lugar
 */
const boardDetailsController = new BoardDetailsController();
boardDetailsController.init();
