export class taskComponent {
  #component;
  #parenNode;
  #task;

  constructor(task, parentNode) {
    this.#parenNode = parentNode;
    this.#task = task;
    this.#createTask(task);
  }

  #createTask(task) {
    const createdat = moment(task.createdAt).format("l");
    const taskComponent = ` <div class="card card-task">
            <div class="card-body text-light text-start">
            <p class="card-title">${task.name}</p>
            <p class="card-text">
                <i class="fa-solid fa-clock me-3"></i>
                <span class="text-muted">${createdat}</span>
            </p>
            <div class="d-flex justify-content-between">
                <button
                class="btn btn-outline-success bg-dark"
                >Ver mas</button
                >
                <div>
                <button id="delete-task" class="btn btn-danger">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <button   id="edit-task" class="btn btn-warning">
                  <i class="fa-solid fa-file-pen"></i>
                </button>
              </div>
            </div>
            </div>
            </div>`;
    const fragment = document.createElement("template");
    fragment.innerHTML = taskComponent;
    this.#parenNode.append(fragment.content);
  }
}
