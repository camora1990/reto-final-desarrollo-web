import { TaskService } from "../model/services/task.service.js";
import { PopUp } from "../utilities/popUps.js";

/**
 * Clase controladora para las tareas
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */

export class TaskController {
  #taskService;

  constructor() {
    this.#taskService = new TaskService();
  }

  /**
   * Metodo que elimina las tareas por id
   * @param {Integer} taskId - id de la tarea a eliminar
   */
  async deleteTask(taskId) {
    try {
      const { data } = await this.#taskService.deleteTask(taskId);
      const message = `Tarea ${data.name} eliminada con exito`;
      PopUp.messageSuccess(message);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      PopUp.errorPopUp(error.response?.data.message || error.message);
    }
  }

  async createTask(task) {
    try {
      const { data } = await this.#taskService.createTask(task);
      const message = `Tarea ${data.name} fue creada con exito`;
      PopUp.messageSuccess(message);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      PopUp.errorPopUp(error.response?.data.message || error.message);
    }
  }

  async changeColumn(idTask, task){
    try {
      const { data } = await this.#taskService.chageColumn(idTask, task);
      const message = `La tarea ${data.name} cambio de estado exito`
      PopUp.messageSuccess(message);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      PopUp.errorPopUp(error.response?.data.message || error.message);
    }
  }

  async editTask(idTask, task){
    try {
      const { data } = await this.#taskService.editTask(idTask, task);
      const message = `La tarea ${data.name} editado con exito`
      PopUp.messageSuccess(message);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      PopUp.errorPopUp(error.response?.data.message || error.message);
    }
  }

}

const taskController = new TaskController();
export default taskController;
