import { utilities } from "../utilities/utilities.js";
import { BoardComponent } from "./components/boardComponent.js";
import { ModalFormBoard } from "./components/modalFormComponent.js";
/**
 * Clase para la vista de los tablero
 * @class taskComponent
 * @author Camilo Morales Sanchez - Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
export class IndexView {
  #body;
  #modalForm;
  #container;
  #row;
  #section;
  #boardController;
  constructor(boardController) {
    this.#boardController = boardController;
    this.#body = document.querySelector("body");
    this.#container = document.querySelector(".container");
    this.#modalForm = new ModalFormBoard(boardController);
    this.#initialComponent();
    this.#createModal();
    this.#buttonCreate();
  }
  /**
   * Metodo para crear el componente board
   */
  #initialComponent() {
    this.#section = utilities.createComponent(
      "div",
      ["shadow-sm", "p-3", "mb-5", "rounded"],
      "section"
    );
    this.#row = utilities.createComponent("div", ["row"]);
    this.#section.append(this.#row);
    this.#container.append(this.#section);
  }
  /**
   * Metodo que crea los componentes en el dom para el index.html
   * @param {Array} boards -Lista de tipo BoardModel
   */

  init(boards) {
    boards.length > 0;

    boards.forEach((board) => {
      new BoardComponent(board, this.#row, this.#boardController);
    });
  }
  /**
   * Metodo para crear el boton de crear nuevo board
   */
  #buttonCreate() {
    const button = `<div class="d-flex"> 
    <h1 class="fw-bold text-light me-5">K-Trello</h1>
    <button id="create-board"
    class="btn btn-outline-success"
    data-bs-toggle="modal"
    data-bs-target="#boardModal"
    data-bs-whatever="@mdo"
  >
    crear tablero <i class="fa-solid fa-circle-plus"></i>
  </button>
    </div>`;
    const frangment = document.createElement("template");
    frangment.innerHTML = button;
    /**
     * Se agregan eventos a los componentes 
     * */   
    frangment.content
      .getElementById("create-board")
      .addEventListener("click", this.#eventCreateBoard());
    this.#container.insertBefore(frangment.content, this.#section);
  }
  /**
   * Agrega el modal al DOM
   */
  #createModal() {
    this.#body.append(this.#modalForm.modalForm);
  }
  /**
   * Evento de para crear un board
   * @returns - evento para la creacion de un board
   */
  #eventCreateBoard() {
    return (event) => {
      document.getElementById("boardModalLabel").innerText = "Crear tablero";
      document.getElementById("submit-button").textContent = "Crear tablero";
      document.getElementById("floatingNameBoard").value = "";
    };
  }
}
