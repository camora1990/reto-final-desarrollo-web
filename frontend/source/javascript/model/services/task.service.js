import { Config } from "../../config.mjs";
/**
 * Clase de servicio para las tareas, encargada de hacer las peticiones a la Base de Datos
 * @class TaskService
 * @author Camilo Morales Sanchez - Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
export class TaskService {
  /**
   * Metodo para eliminar una tarea
   * @param {number} taskId - id de la tarea a eliminar
   * @returns Promesa de eliminacion(tarea)
   */
  async deleteTask(taskId) {
    const { data } = await axios.delete(`${Config.KTRELLO_URL}/task/${taskId}`); //Endpoint para eliminar tarea
    return data;
  }
  /**
   * Metodo para crear una tarea
   * @param {Object} task Objeto de tipo tarea a crear
   * @returns Promesa de creacion(tarea)
   */
  async createTask(task) {
    const { data } = await axios.post(`${Config.KTRELLO_URL}/task/`, task);      //Endpoint para crear tarea
    return data;
  }
  /**
   * Metodo para cambiar una tarea de columna
   * @param {number} idTask id de la tarea a cambiar
   * @param {Object} task Objeto de tipo tarea que sera cambiada
   * @returns Promesa de cambio(tarea)
   */
  async chageColumn(idTask, task) {
    const { data } = await axios.put(`${Config.KTRELLO_URL}/task/change-column/${idTask}`,task); //Endpoint para cambiar tarea de columna
    return data;
  }
  /**
   * Metodo para editar una tarea
   * @param {number} idTask id de la tarea a editar
   * @param {Object} task Objeto de tipo tarea que sera editado
   * @returns Promesa para editar(tarea)
   */
  async editTask(idTask, task) {
    const { data } = await axios.put(`${Config.KTRELLO_URL}/task/${idTask}`,task);     //Endpoint para editar tarea
    return data;
  }
}
