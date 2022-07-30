export class Column {
  #id;
  #name;
  #createdAt;
  #updatedAt;
  #tasks = [];

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
  get task() {
    return this.#tasks;
  }
}
