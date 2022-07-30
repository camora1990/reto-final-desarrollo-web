export class TaskModel {
  #id;
  #name;
  #description;
  #delivery;
  #createdAt;
  #updatedAt;
  #log;

  constructor(id, name, description, delivery, createdAt, updatedAt, log=[]) {
    this.#id = id;
    this.#name = name;
    this.#description = description;
    this.#delivery = delivery;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
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
  get log() {
    return this.#log;
  }
}
