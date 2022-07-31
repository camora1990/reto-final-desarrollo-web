import taskController from "../../controller/task.controller.js";
import { PopUp } from "../../utilities/popUps.js";

export class ModaTaskComponent {
  #parenNode;
  #task;
  #boardId;
  constructor(boardId) {
    ;
    this.#parenNode = document.querySelector("body");
    this.#boardId = boardId;
    this.#task = {};
    this.#createmodalTask();
  }

  #createmodalTask() {
    const modal = `<div
        class="modal fade"
        id="taskModal"
        tabindex="-1"
        aria-labelledby="taskModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content card-custom text-light">
            <div class="modal-header">
              <h5 class="modal-title" id="taskModalLabel"></h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="form-task" data-edit=false>
              <div class="form-floating mb-2">
                  <input
                    class="form-control bg-transparent text-light"
                    placeholder="Nombre de la tarea"
                    id="floatingNameTask"
                    name="name"
                    required
                  ></input>
                  <label for="floatingNameTask">Nombre de la tarea</label>
                </div>
                <div class="form-floating">
                  <textarea
                    class="form-control bg-transparent text-light mb-2"
                    placeholder="Descripción"
                    id="floatingDescriptionTask"
                    style="height: 100px"
                    name="description"
                    required
                  ></textarea>
                  <label for="floatingDescriptionTask">Descripción</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    type="date"
                    class="form-control bg-transparent text-light"
                    placeholder="Delivery"
                    id="floatingDeliveryTask"
                    name="delivery"
                  ></input>
                  <label for="floatingNameTask">Fecha fin</label>
                </div>
                <div class="modal-footer">
                  <button id="submit-task" type="submit" class="btn btn-success">Guardar
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
      .getElementById("form-task")
      .addEventListener("submit", this.#eventSaveTask());
    this.#parenNode.append(frangment.content);
  }

  #eventSaveTask() {
    return (event) => {
      ;
      this.#task = {};
      event.preventDefault();
      this.#task.name = event.target[0].value;
      this.#task.description = event.target[1].value;
      event.target[2].value &&
        (this.#task.delivery = moment.utc(event.target[2].value).format());
      this.#task.column = event.target.dataset.columnid;
      this.#task.board = this.#boardId;
      const message = "estas seguro de guardar la tarea";
      PopUp.confirmationPopUp(message).then((result) => {
        if (result.isConfirmed) {
          taskController.createTask(this.#task);
        }
      });
    };
  }
}
