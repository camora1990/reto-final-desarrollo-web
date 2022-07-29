/**
 * Modelo de los tableros
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */

export class BoardModel {
  #name;
  #id;
  #createdAt;
  #updatedAt;
  /**
   * Constructor para creacion de tableros
   * @param {number} id 
   * @param {string} name 
   * @param {string} createdAt 
   * @param {string} updatedAt 
   */
  constructor(id, name, createdAt, updatedAt) {
    this.#id = id;
    this.#name = name;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  get name() {
    return this.#name;
  }
  get id() {
    return this.#id;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get updatedAt() {
    return this.#updatedAt;
  }
}
