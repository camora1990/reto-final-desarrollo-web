import { PopUp } from "../../utilities/popUps.js";

/**
 * Clase para crear los componentes o tarjetas de los tableros
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */
export class BoardComponent {
  #board;
  #parentNode;
  #component;
  #boardController;
  /**
   * Constructor de clase con los parametros necesarios
   * @param {BoardModel} board 
   * @param {HTMLElement} parenNode 
   * @param {BoardController} boardController 
   */
  constructor(board, parenNode, boardController) {
    this.#boardController = boardController;
    this.#board = board;
    this.#parentNode = parenNode;
    this.#component = this.#createComponent(board);
    this.#addContent();
  }

  /**
   * Crea el componente o la card del board
   * @returns - retorna el componente creado (Nodo)
   */

  #createComponent() {
    const createdat = moment(this.#board.createdAt).format("l");
    const boardComponente = `<div class="col-12 col-md-6 col-lg-4 mb-3">
        <div class="card card-custom">
          <div class="card-body text-light">
            <h5 class="card-title">${this.#board.name}</h5>
            <p class="card-text"><i class="fa-solid fa-clock me-3"></i>
             <span class="text-muted">${createdat}</span>
            </p>
            <div class="d-flex justify-content-between">
              <a href="boardDetails.html?board=${this.#board.id}" class="btn btn-outline-success bg-dark">Ver mas</a>
              <div>
                <button id="delete-board" class="btn btn-danger">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <button   data-bs-toggle="modal"
                data-bs-target="#boardModal"
                data-bs-whatever="@mdo" id="edit-board" class="btn btn-warning">
                  <i class="fa-solid fa-file-pen"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     `;
    const fragnmet = document.createElement("template");
    fragnmet.innerHTML = boardComponente;
    fragnmet.content
      .getElementById("delete-board")
      .addEventListener("click", this.#eventDeleteBoard());
      fragnmet.content
      .getElementById("edit-board")
      .addEventListener("click", this.#eventEditBoard());
    return fragnmet.content;
  }

  /**
   * Agrega el componente al DOM 
   */
  #addContent() {
    this.#parentNode.append(this.#component);
  }

  /**
   * Evento click agregado en el boton de eliminacion de cada tablero
   * @returns - Evento de eliminacion del board
   */
  #eventDeleteBoard() {
    return (event) => {
      const message = `¿Estás seguro de eliminar ${this.#board.name}?`;
      const text = "¡No podrás revertir esto!";
      PopUp.confirmationPopUp(message, text).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.#boardController.deleteBoard(this.#board.id);
          } catch (error) {
            PopUp.errorPopUp(error);
          }
          PopUp.messageSuccess("El tablero fue eliminado con exito");
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      });
    };
  }
  /**
   * Evento click agregado en el boton de editar de cada tablero
   * @returns - Evento de para editar un board
   */
  #eventEditBoard(){
    return(event)=>{
      document.getElementById("boardModalLabel").innerText = "Editar tablero";
      document.getElementById("submit-button").textContent = "Editar tablero";
      document.getElementById("floatingNameBoard").value = this.#board.name;
      document.getElementById("form").setAttribute("data-edit",true)
      document.getElementById("form").setAttribute("data-idBoard",this.#board.id)
    }
  }
}
