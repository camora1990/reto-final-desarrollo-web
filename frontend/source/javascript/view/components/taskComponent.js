import taskController from "../../controller/task.controller.js";
import { PopUp } from "../../utilities/popUps.js";
/**
 * Clase para crear las tareas
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */
export class taskComponent {
  #parenNode;
  #task;
  #taskController;

  constructor(task, parentNode) {
    this.#parenNode = parentNode;
    this.#task = task;
    this.#createTask(task);
    this.#taskController = taskController;
  }
  /**
   * Crea la card donde ira la tarea
   * @param {TaskModel} task - Parametro de tipo task model
   */
  #createTask(task) {
    const createdAt = moment(task.createdAt).format("l");
    let delivery = null;
    task.delivery && (delivery = moment(task.delivery).format("l"));

    const taskComponent = ` <div class="card card-task mb-3">
            <div class="card-body text-light text-start">
            <p class="card-title">${task.name}</p>
            <div class="d-flex justify-content-between my-3">
            <div>
                <i class="fa-solid fa-clock me-1"></i>
                <span class="text-muted">Creada: ${createdAt}</span>
                </div>
                <div>
                <i class="fa-solid fa-clock me-1"></i>
                <span class="text-muted">Entrega: ${
                  delivery ? delivery : "N/A"
                }</span>
                </div>
            </div>
                
          
            <div class="d-flex justify-content-between">
                <button
                class="btn btn-outline-success bg-dark" id="show-log" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                >Log</button
                >
                <div class="arrows text-muted">${
                  task.column > 1
                    ? '<i id="back" class="fa-solid fa-circle-arrow-left"></i>'
                    : ""
                }
                Mover
                ${
                  task.column < 3
                    ? '<i id="next" class="fa-solid fa-circle-arrow-right"></i>'
                    : ""
                }
                </div>
                <div>
                <button id="delete-task" class="btn btn-danger">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <button data-bs-toggle="modal"
                data-bs-target="#taskModal"
                data-bs-whatever="@mdo"  id="edit-task" class="btn btn-warning">
                  <i class="fa-solid fa-file-pen"></i>
                </button>
              </div>
            </div>
            </div>
            </div>`;
    const fragment = document.createElement("template");
    fragment.innerHTML = taskComponent;
    fragment.content
      .getElementById("delete-task")
      .addEventListener("click", this.#deleteTask());

    fragment.content
      .getElementById("edit-task")
      .addEventListener("click", this.#EventButtonEdit());

    const arrowBack = fragment.content.getElementById("back");
    arrowBack && arrowBack.addEventListener("click", this.#eventBackColumn());

    const arrowNext = fragment.content.getElementById("next");
    arrowNext && arrowNext.addEventListener("click", this.#eventNextColumn());

    fragment.content
      .getElementById("show-log")
      .addEventListener("click", this.#showLog());

    this.#parenNode.append(fragment.content);
  }
  /**
   * Metodo que retorna el evento para eliminar una tarea
   * @returns - evento para eliminar una tarea
   */
  #deleteTask() {
    return (event) => {
      const message = `Estas seguro de eliminar la tarea ${this.#task.name}`;

      PopUp.confirmationPopUp(message).then((response) => {
        if (response.isConfirmed) {
          this.#taskController.deleteTask(this.#task.id);
        }
      });
    };
  }

  #eventBackColumn() {
    return (event) => {
      const task = {
        ...this.#task,
        column: this.#task.column - 1,
      };
      this.#taskController.changeColumn(this.#task.id, task);
    };
  }

  #eventNextColumn() {
    return (event) => {
      debugger;
      const task = {
        ...this.#task,
        column: this.#task.column + 1,
      };
      this.#taskController.changeColumn(this.#task.id, task);
    };
  }

  #showLog() {
    return () => {
      debugger;
      const bodyModallog = document.getElementById("log");
      let list = "";
      const columns = ["Por realizar", "En progreso", "Terminado", ""];
      const logs = [...this.#task.log];
      logs.reverse().forEach((element) => {
        list += `
        <li>
        Columna anterior ${columns[element.previous - 1]} --> Columna actual ${
          columns[element.current - 1]
        }
      </li>
        `;
      });
      bodyModallog.innerHTML = `<ol>${list}</ol>`;
    };
  }

  #EventButtonEdit() {
    return (event) => {
      const form = document.getElementById("form-task");
      
      form.setAttribute("data-edit", "true");
      form.setAttribute("data-taskId", this.#task.id);
      document.getElementById("floatingNameTask").value = this.#task.name;
      document.getElementById("floatingDescriptionTask").value =
        this.#task.description;
      this.#task.delivery &&
        (document.getElementById("floatingDeliveryTask").value = moment(
          this.#task.delivery
        ).format("l"));
        document.getElementById("taskModalLabel").innerText = "Editar task"
    };
  }
}
