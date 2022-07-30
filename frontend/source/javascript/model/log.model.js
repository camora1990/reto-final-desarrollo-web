/**
 * Modelo de los logs
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */

export class LogModel {
  #id;
  #previous;
  #current;
  #createdAt;

  /**
   * Constructor para cear un log
   * @param {number} id 
   * @param {string} previous 
   * @param {string} current 
   * @param {string} createdAt 
   */
  constructor(id, previous, current, createdAt) {
    this.#id = id;
    this.#createdAt = createdAt;
    this.#previous = previous;
    this.#current = current;
  }

  get id() {
    return this.#id;
  }
  get createAt() {
    return this.#createdAt;
  }
  get previous() {
    return this.#previous;
  }
  get current() {
    return this.#current;
  }
}
