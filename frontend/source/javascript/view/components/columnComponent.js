import { taskComponent } from "./taskComponent.js";
/**
 * Clase para crear el componente columna
 * @class ColumnComponent
 * @author Camilo Morales Sanchez - Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
export class ColumnComponent {
  #component;
  #parentNode;
  #icons;
  #boardId;
  constructor(columns, row, boardId) {
    this.#boardId = boardId;
    this.#parentNode = row;
    this.#icons = [
      `<i class="fa-solid fa-hourglass-start"></i>`,
      `<i class="fa-solid fa-spinner"></i>`,
      `<i class="fa-solid fa-check"></i>`,
    ];
    this.#createColumn(columns);
  }
  /**
   * Metodo para crear los nodos de tipo columna en el DOM
   * @param {Array} columns - Array de columnas de tipo ColumnModel
   */
  #createColumn(columns) {
    columns.forEach((column, i) => {
      const columFragmen = document.createElement("template");
      columFragmen.innerHTML = `<div class="col col-lg-4 text-center">
        <div class="container-task border-2 rounded">
          <h3 class="colum">${column.name} ${this.#icons[i]}</h3>
        </div>
        <button id="btn-new-task"  data-bs-toggle="modal"
        data-bs-target="#taskModal"
        data-bs-whatever="@mdo" data-columnId=${column.id} data-board-id=${
        this.#boardId
      }
        class="btn btn-outline-success form-control bg-dark custom-btn mt-2 mb-2 ">
        NuevaTarea <i class="fa-solid fa-circle-plus"></i>
        </button>
      </div>`;
      const parentNodeTask =
        columFragmen.content.querySelector(".container-task");

      column.tasks.forEach((task) => {
        new taskComponent(task, parentNodeTask);
      });

      columFragmen.content
        .getElementById("btn-new-task")
        .addEventListener("click", this.#eventcreateTask());
      this.#parentNode.append(columFragmen.content);
    });
  }
  /**
   * Evento para crear la tarea
   * @returns evento para crear la tarea
   */
  #eventcreateTask() {
    return (event) => {
      const formTask = document.getElementById("form-task");
      formTask.setAttribute("data-columnid", event.target.dataset.columnid);
      formTask.setAttribute("data-boardid", this.#boardId);
    };
  }
}
