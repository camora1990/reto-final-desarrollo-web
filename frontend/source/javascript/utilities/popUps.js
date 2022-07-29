/**
 * Clase que maneja todos los modales de la aplicacion
 * @class
 * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
 */

export class PopUp {
  /**
   *
   * @param {string} message - Mensaje para mostrar en el modal
   * @param {string} text  - Texto alternativo para mostrar
   * @returns Modal con los mensajes enviados
   */
  static confirmationPopUp(
    message = "Estas seguro de realizar la operación ",
    text = "Operación realizada con éxito"
  ) {
    return Swal.fire({
      title: message,
      text: text,
      icon: "warning",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "Cancelar",
      background: "#212529",
    });
  }

  /**
   * 
   * @param {string} message - Menjade de confirmacion
   * @returns - Modal de opracion exitosa
   */

  static messageSuccess(message="Operación realizada con éxito" ) {
    return Swal.fire({
      background: "#212529",
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  /**
   * 
   * @param {string} message -Mensaje de eror
   * @returns - Modal con el error
   */
  static errorPopUp(message="Error en la operación") {
    return Swal.fire({
      background: "#212529",
      icon: "error",
      title: "Oops...",
      text: message,
    });
  }
}
