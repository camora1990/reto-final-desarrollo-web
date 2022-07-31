import BoardServices from "../model/services/board.service.js";
import { PopUp } from "../utilities/popUps.js";
import { boardDetailsView } from "../view/boardDetails.view.js";

export class BoardDetailsController {
  #boardService;
  #boardDetailsView;
  constructor() {
    this.#boardService = new BoardServices();
    this.#boardDetailsView = new boardDetailsView();
  }

  async init() {
    ;
    const params = new URLSearchParams(window.location.search);
    const boardId = params.get("board");
    if (boardId) {
      try {
        
        const board = await this.#boardService.getBoardById(boardId);
        this.#boardDetailsView.createViewBoardDetails(board);
      } catch (error) {
        const message = error.response?.data.message || error.message;
        PopUp.errorPopUp(message).then(() => window.location.assign("index.html"));
      }
    } else {
      window.location.assign("index.html");
    }
  }
}

const boardDetailsController = new BoardDetailsController();
boardDetailsController.init();
