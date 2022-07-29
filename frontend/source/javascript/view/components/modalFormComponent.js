import { PopUp } from "../../utilities/popUps.js";

/**
 * Clase para crear el modal de creacion
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */
export class ModalFormBoard {

  #newBoard
  #boardController 

  constructor(boardController) {
    this.#newBoard = {}
    this.#boardController = boardController;
  }
  /**
   * Obtiene el modal para crear Board
   * @returns - Modal para la creacion del board
   */
  get modalForm() {
    const modal = `<div
        class="modal fade"
        id="boardNewModal"
        tabindex="-1"
        aria-labelledby="boardNewModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content card-custom text-light">
            <div class="modal-header">
              <h5 class="modal-title" id="boardNewModalLabel">Crear tablero</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="form">
                <div class="form-floating">
                  <textarea
                    class="form-control bg-transparent"
                    placeholder="Leave a comment here"
                    id="floatingNameBoard"
                    style="height: 100px"
                    name="name"
                    required
                  ></textarea>
                  <label for="floatingNameBoard">Nombre del tablero</label>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-success">
                    Crear tablero
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
    frangment.content.getElementById("form").addEventListener("submit",this.#submitForm())
    return frangment.content;
  }

  #submitForm(){return event => {
    const input = document.getElementById("floatingNameBoard")
    const {name, value} = input
    this.#newBoard = {...this.#newBoard, [name]:value}
    const message = "Estas segura de agregar este board"
    PopUp.confirmationPopUp(message).then(async(result) => {
      try {
        const board = await this.#boardController.createBoard(this.#newBoard);
        new BoardComponent();
      } catch (error) {
        
      }
    })
  }
}

}
