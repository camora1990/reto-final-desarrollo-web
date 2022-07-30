export class taskComponent {

    #component

    constructor(task){
        this.component = this.#createTask(task)
    }

    #createTask(task){
        const a = ` <div class="card card-task">
            <div class="card-body text-light">
            <p class="card-title"></p>
            <p class="card-text">
                <i class="fa-solid fa-clock me-3"></i>
                <span class="text-muted"></span>
            </p>
            <div class="d-flex justify-content-between">
                <button
                class="btn btn-outline-success bg-dark"
                >Ver mas</button
                >
            </div>
            </div>
            </div>`
    }

}