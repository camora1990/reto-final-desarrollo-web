import { BoardModel } from "../model/board.model.js";
import { utilities } from "../utilities/utilities.js";
import { BoardComponent } from "./components/boardComponent.js";
import { ModalFormBoard } from "./components/modalFormComponent.js";

/**
 * Clase que inicia la pagina board
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */

export class BoardView {
  #body;
  #modalForm;
  #container;
  // #section;
  #boardController;
  constructor(boardController) {
    this.#boardController = boardController;
    this.#body = document.querySelector("body");
    this.#container = document.querySelector(".container");
    // this.#section = document.getElementById("section");
    this.#modalForm = new ModalFormBoard();
    this.#createModal();
    this.#buttonCreate();
  }

  /**
   * Metodo que crea los componentes en el dom para el index.html
   * @param {Array} boards -Lista de tipo BoardModel
   */

  init(boards) {
    if (boards.length > 0) {
      const row = utilities.createComponent("div", ["row"]); //Crea un elemento html dono iran los board
      const section = utilities.createComponent(
        "div",
        ["shadow-sm", "p-3", "mb-5", "rounded"],
        "section"
      );

      section.append(row);
      this.#container.append(section);
      boards.forEach((board) => {
        new BoardComponent(board, row, this.#boardController);
      });
    }
  }

  /**
   * Metodo para crear el boton de crear nuevo board
   */

  #buttonCreate() {
    const button = `<button
    class="btn btn-outline-success"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-bs-whatever="@mdo"
  >
    crear tablero <i class="fa-solid fa-circle-plus"></i>
  </button>`;
    const frangment = document.createElement("template");
    frangment.innerHTML = button;
    this.#container.append(frangment.content);
  }

  /**
   * Metodo para crear el modal de formulario
   */
  #createModal() {
    this.#body.append(this.#modalForm.modalForm);
  }
}
