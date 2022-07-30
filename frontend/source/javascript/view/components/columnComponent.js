import { taskComponent } from "./taskComponent.js";

export class ColumnComponent {
  #component;
  #parentNode;
  #icons;
  constructor(columns, row) {
    this.#parentNode = row;
    this.#icons = [
      `<i class="fa-solid fa-hourglass-start"></i>`,
      `<i class="fa-solid fa-spinner"></i>`,
      `<i class="fa-solid fa-check"></i>`,
    ];
    this.#createColumn(columns);
  }

  #createColumn(columns) {

    columns.forEach((column, i) => {
      const columFragmen = document.createElement("template");
      columFragmen.innerHTML = `<div class="col col-lg-4 text-center">
        <div class="container-task border-2 rounded">
          <h3 class="colum">${column.name} ${this.#icons[i]}</h3>
        </div>
        <button data-columnId=${column.id}
        class="btn btn-outline-success form-control bg-dark custom-btn mt-2 mb-2 ">
        NuevaTarea <i class="fa-solid fa-circle-plus" id="btn-new-task"></i>
        </button>
      </div>`;
      const parentNodeTask =
        columFragmen.content.querySelector(".container-task");

      column.tasks.forEach((task) => {
        new taskComponent(task, parentNodeTask);
      });
      this.#parentNode.append(columFragmen.content);
    });
  }
}
