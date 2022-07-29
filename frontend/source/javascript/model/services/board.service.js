import { Config } from "../../config.mjs";
import { BoardModel } from "../board.model.js";

/**
 * Servicios de los tableros
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */

export default class BoardServices {
  /**
   * Metodo para obtener los boards del api
   * @returns - promesa con los boards
   */
  async getBoards() {
    const { data } = await axios.get(`${Config.KTRELLO_URL}/board/`);
    const { data: responseData } = data;
    const boards = responseData.map(
      ({ id, name, createdAt, updatedAt }) =>
        new BoardModel(id, name, createdAt, updatedAt)
    );
    return boards;
  }

  /**
   * 
   * @param {number} boardId - Id del tablero a eliminar
   * @returns - promesa con mensaje de eliminacion
   */
  deleteBoard(boardId) {
    return axios.delete(`${Config.KTRELLO_URL}/board/${boardId}`);
  }

  /**
   * 
   * @param {Object} data  - Objeto para crear el board
   * @returns - Retorna la promesa de la creacion del board 
   */
  async createBoard(data){
    const {data:responseData} = await axios.post(`${Config.KTRELLO_URL}/board/`, data)
    const {id, name, createdAt, updatedAt} = responseData.data;
    return new BoardModel(id, name, createdAt, updatedAt);
  }

  /**
   * @param {Integer} board -
   * @param {Integer} id -
   * @returns - Objeto con los datos actualizados
   */
  async editBoar(board,id){
    const {data} = await axios.put(`${Config.KTRELLO_URL}/board/${id}`,board)
    return data.data
  }
}
