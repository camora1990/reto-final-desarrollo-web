import { PopUp } from "../../utilities/popUps.js";
/**
 * Clase para crear modal de creacion
 * @class ModalFormBoard
 * @author Camilo Morales Sanchez - Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
export class ModalFormBoard {
  #newBoard;
  #boardController;

  constructor(boardController) {
    this.#newBoard = {};
    this.#boardController = boardController;
  }
  /**
   * Obtiene el modal para crear Board
   * @returns - Modal para la creacion del board
   */
  get modalForm() {
    const modal = `<div
        class="modal fade"
        id="boardModal"
        tabindex="-1"
        aria-labelledby="boardModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content card-custom text-light">
            <div class="modal-header">
              <h5 class="modal-title" id="boardModalLabel"></h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="form" data-edit=false>
                <div class="form-floating">
                  <textarea
                    class="form-control bg-transparent text-light"
                    placeholder="Leave a comment here"
                    id="floatingNameBoard"
                    style="height: 100px"
                    name="name"
                    required
                  ></textarea>
                  <label for="floatingNameBoard">Nombre del tablero</label>
                </div>
                <div class="modal-footer">
                  <button id="submit-button" type="submit" class="btn btn-success">
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  `;
    const frangment = document.createElement("template");
    frangment.innerHTML = modal;
    frangment.content
      .getElementById("form")
      .addEventListener("submit", this.#submitFormBoard());
    return frangment.content;
  }
  /**
   * Evento submit del formulario de creacion
   * @returns - retorna el evento para crear el board
   */
  #submitFormBoard() {
    return (event) => {
      event.preventDefault();
      const isEdit = (event.target.dataset.edit);
      if (isEdit == "true") {
        const boardEdit = { [event.target[0].name]: event.target[0].value };
        const idBoard = event.target.dataset.idboard;
        this.#editBoard(boardEdit, idBoard);
        event.target.dataset.edit="false"
        return;
      }
      this.#createBoard();
    };
  }
  /**
  * Metodo para crear un board
  */
  #createBoard() {
    const input = document.getElementById("floatingNameBoard");
    const { name, value } = input;
    this.#newBoard = { ...this.#newBoard, [name]: value };
    const message = "Estas seguro de agregar este board";
    PopUp.confirmationPopUp(message).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.#boardController.createBoard(this.#newBoard);
          PopUp.messageSuccess("Tablero creado con exito");
          setTimeout(() => {
            location.reload();
          }, 1500);
        } catch (error) {
          PopUp.error(error.message);
        }
      }
    });
  }
  /**
   * Metodo para editar un board
   * @param {Object} board -  board a editar
   * @param {number} idBoard - id del board
   */
  #editBoard(board, idBoard) {
    const message = "Estas seguro de editar este board"; 
    PopUp.confirmationPopUp(message).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.#boardController.editBoard(board,idBoard);
          PopUp.messageSuccess("Tablero actualizado con exito");
          setTimeout(() => {
            location.reload();
          }, 1500);
        } catch (error) {
          PopUp.error(error.message);
        }
      }
    });
  }
}
