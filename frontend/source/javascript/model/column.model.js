/**
 * Modelo de una columna
 * @class ColumnModel
 * @author Camilo Morales Sanchez - Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
export class ColumnModel {
  #id;
  #name;
  #createdAt;
  #updatedAt;
  #tasks = [];
  /**
   * Constructor para la creacion de columnas
   * @param {number} id 
   * @param {string} name 
   * @param {string} createdAt 
   * @param {string} updatedAt 
   * @param {Array} task 
   */
  constructor(id, name, createdAt, updatedAt, task=[]) {
    this.#id = id;
    this.#name = name;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#tasks = task;
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get updatedAt() {
    return this.#updatedAt;
  }
  get tasks() {
    return this.#tasks;
  }
}
