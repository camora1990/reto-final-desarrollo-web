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
    async deleteTask(taskId){
        const {data}  =  await axios.delete(`${Config.KTRELLO_URL}/task/${taskId}`);
        return data;
    }

}