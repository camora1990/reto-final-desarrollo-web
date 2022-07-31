/**
 * Utilidades generales de la aplicacion como creacion de componentes
 * @class Utilities
 * @author Camilo Morales Sanchez - Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
 class Utilities {
    /**
     *
     * @param {String} tagName - etiqueta html
     * @param {String []} classes - clases de la etiqueta
     * @param {String} id -id de la etiqueta
     * @param {String} name - nombre de la tiqueta
     * @param {String} value - valor del campo
     * @returns {HTMLElement} Etiqueta HTML
     * @author Camilo Morales Sanchez - Juan Camilo Castñeda Castro
     */
    createComponent(tagName, classes = [], id = null, name = null, value = null) {
      const tag = document.createElement(tagName);
      classes.length > 0 && tag.classList.add(...classes);
      id && (tag.id = id);
      name && (tag.name = name);
      value && tagName != "li" && (tag.value = value);
      value && (tag.textContent = value);
      value && (tag.innerText = value);
      return tag;
    }
  }
  /**
   * Instancia a exportar Utilities() y ser utilizada desde otro lugar
   */
  
  const utilities = new Utilities();
  
  export { utilities };
  