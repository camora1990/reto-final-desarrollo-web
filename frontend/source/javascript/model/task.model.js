/**
 * Modelo de una tarea
 * @class TaskModel
 * @author Camilo Morales Sanchez - Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
export class TaskModel {
  #id;
  #name;
  #description;
  #delivery;
  #createdAt;
  #updatedAt;
  #log;
  #board;
  #column;
  /**
   * Constructor para crear una tarea
   * @param {number} id 
   * @param {String} name 
   * @param {String} description 
   * @param {Data} delivery 
   * @param {Date} createdAt 
   * @param {Date} updatedAt 
   * @param {number} column 
   * @param {Object} board 
   * @param {Array} log 
   */
  constructor(
    id,
    name,
    description,
    delivery,
    createdAt,
    updatedAt,
    column,
    board,
    log = []
  ) {
    this.#id = id;
    this.#name = name;
    this.#column = column;
    this.#description = description;
    this.#delivery = delivery;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#board = board;
    this.#log = log;
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
  get delivery() {
    return this.#delivery;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get updatedAt() {
    return this.#updatedAt;
  }
  get board() {
    return this.#board;
  }
  get column() {
    return this.#column;
  }
  get log() {
    return this.#log;
  }
  set column(column) {
    this.#column = column;
  }
}
