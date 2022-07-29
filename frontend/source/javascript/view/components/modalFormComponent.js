/**
 * Clase para crear el modal de creacion
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */
export class ModalFormBoard {

  /**
   * Obtiene el modal para crear Board
   * @returns - Modal para la creacion del board
   */
  get modalForm() {
    const modal = `<div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content card-custom text-light">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Crear tablero</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="form">
                <div class="form-floating">
                  <textarea
                    class="form-control bg-transparent"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style="height: 100px"
                    name="name"
                    required
                  ></textarea>
                  <label for="floatingTextarea2">Nombre del tablero</label>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-success">
                    Crear tablero
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  `;
    const frangment = document.createElement("template");
    frangment.innerHTML = modal;
    return frangment.content;
  }
}
