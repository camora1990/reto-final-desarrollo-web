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
    
    const createdat = moment(task.createdAt).format("l");
    
    const taskComponent = ` <div class="card card-task mb-3">
            <div class="card-body text-light text-start">
            <p class="card-title">${task.name}</p>
            <p class="card-text">
                <i class="fa-solid fa-clock me-3"></i>
                <span class="text-muted">${createdat}</span>
            </p>
            <div class="d-flex justify-content-between">
                <button
                class="btn btn-outline-success bg-dark"
                >Log</button
                >
                <div class="arrows text-muted">${
                  task.column > 1 ?
                  '<i id="back" class="fa-solid fa-circle-arrow-left"></i>':""
                }
                Mover
                ${
                  task.column <3 ?
                  '<i id="next" class="fa-solid fa-circle-arrow-right"></i>':""
                }
                
                </div>
                <div>
                <button id="delete-task" class="btn btn-danger">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <button   id="edit-task" class="btn btn-warning">
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

  #eventBackColumn(){
    return(event)=>{

    }
  }

  #eventNextColumn(){
    return(event)=>{
      
    }
  }
}
