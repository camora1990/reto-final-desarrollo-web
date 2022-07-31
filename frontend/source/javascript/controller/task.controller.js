import { TaskService } from "../model/services/task.service.js";
import { PopUp } from "../utilities/popUps.js";
/**
 * Clase controladora para las tareas, encargada de interactuar 
 * con el servicio a traves de sus metodos
 * @class TaskController
 * @author Camilo Morales Sanchez - Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
export class TaskController {
  #taskService;
   /**
   * Constructor de clase para iniciar parametros
   */
  constructor() {
    this.#taskService = new TaskService();                          //Crea instancia para el servicio de tareas
  }
  /**
   * Metodo que usa el servicio(TaskService) para eliminar las tareas pasadas por id
   * @param {number} taskId - id de la tarea a eliminar
   */
  async deleteTask(taskId) {
    try {
      const { data } = await this.#taskService.deleteTask(taskId);  //Invoca metodo del servicio para eliminar la tarea
      const message = `Tarea ${data.name} eliminada con exito`;
      PopUp.messageSuccess(message);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      PopUp.errorPopUp(error.response?.data.message || error.message);
    }
  }
  /**
   * Metodo que usa el servicio(TaskService), se encarga de crear las tareas
   * @param {Object} task Objeto pasado para crear la tarea
   */
  async createTask(task) {
    try {
      const { data } = await this.#taskService.createTask(task);      //Invoca metodo del servicio para crear la tarea
      const message = `Tarea ${data.name} fue creada con exito`;
      PopUp.messageSuccess(message);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      PopUp.errorPopUp(error.response?.data.message || error.message);
    }
  }
  /**
   * Metodo encargado de cambiar una tarea de columna,
   * resuelve la promesa que viene desde el servicio
   * @param {number} idTask id de la tarea a cambiar
   * @param {Object} task Objeto de tipo tarea que sera cambiado de columna
   */
  async changeColumn(idTask, task) {
    try {
      const { data } = await this.#taskService.chageColumn(idTask, task);//Invoca metodo del servicio para cambiar de columna
      const message = `La tarea ${data.name} cambio de estado exito`;
      PopUp.messageSuccess(message);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      PopUp.errorPopUp(error.response?.data.message || error.message);
    }
  }
  /**
   * Metodo encargado de editar una tarea,
   * resuelve la promesa que viene desde el servicio
   * @param {number} idTask id de la tarea a editar
   * @param {Object} task Objeto de tipo tarea que sera editado
   */
  async editTask(idTask, task) {
    try {
      const { data } = await this.#taskService.editTask(idTask, task);    //Invoca metodo del servicio para editar la tarea
      const message = `La tarea ${data.name} editado con exito`;
      PopUp.messageSuccess(message);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      PopUp.errorPopUp(error.response?.data.message || error.message);
    }
  }
}
/**
 * Instancia a exportar de TaskController
 */
const taskController = new TaskController();
export default taskController;
