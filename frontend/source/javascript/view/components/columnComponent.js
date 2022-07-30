

export class CoumnComponent {
    #component

    constructor(columns) {
        this.#component = this.#createColumn(columns);
    }

    #createColumn(columns) {
        const button = `<button
        class="btn btn-outline-success form-control bg-dark custom-btn mt-2 mb-2 ">
        NuevaTarea <i class="fa-solid fa-circle-plus" id="btn-new-task"></i>
        </button>`

        

        const columnTemplate = `<div class="col col-lg-4 text-center">
        <div class="container-task border-2 rounded">
          <h3 class="colum">Por realizar <i class="fa-solid fa-hourglass-start"></i></i></h3>
        </div>
      </div>`
    }

    

}