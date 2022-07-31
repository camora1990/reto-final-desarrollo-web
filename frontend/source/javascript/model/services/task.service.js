import { Config } from "../../config.mjs";
/**
 * Clase de servicio para las tareas
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */
export class TaskService {
  /**
   * Metodo para eliminar una tarea
   * @param {number} taskId - id de la tarea a eliminar
   * @returns
   */
  async deleteTask(taskId) {
    const { data } = await axios.delete(`${Config.KTRELLO_URL}/task/${taskId}`);
    return data;
  }

  async createTask(task) {
    const { data } = await axios.post(`${Config.KTRELLO_URL}/task/`, task);
    return data;
  }

  async chageColumn(idTask, task) {
    const { data } = await axios.put(
      `${Config.KTRELLO_URL}/task/change-column/${idTask}`,
      task
    );
    return data;
  }

  async editTask(idTask, task) {
    const { data } = await axios.put(
      `${Config.KTRELLO_URL}/task/${idTask}`,
      task
    );
    return data;
  }
}
