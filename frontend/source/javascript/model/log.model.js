export class Log {
  #id;
  #previous;
  #current;
  #createdAt;
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
