import { utilities } from "../utilities/utilities.js";
import { ColumnComponent } from "./components/columnComponent.js";
import { ModaTaskComponent } from "./components/modalTaskComponent.js";
/**
 * Clase para crear la vista de un tablero
 * @class boardDetailsView
 * @author Camilo Morales Sanchez - Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
export class boardDetailsView{
    #parenNode;
    #board
    /**
     * Constructor de clase con los parametros a inicair
     */
    constructor() {
        this.#parenNode = document.querySelector(".container");
        
    }
    /**
     * Metodo para crear un tablero
     * @param {Object} board Objeto de tipó board
     */
    createViewBoardDetails(board){
        new ModaTaskComponent(board.id)
        this.#board = board
        const h1 = utilities.createComponent(
            "h1",
            ["text-light", "text-center"],
            "text",
            null,
            board.name
          );
          const section = utilities.createComponent("div", ["section-details"]);
          const row = utilities.createComponent("div", ["row"], "row");
          section.append(row)
          this.#parenNode.append(h1,section)
          this.#createColumnsBoards(board.columns,row)
    }
    /**
     * Metodo para crear las columnas
     * @param {ColumnaModel} columns 
     * @param {HTMLElement} parenNode 
     */
    #createColumnsBoards(columns,parenNode){
        
        new ColumnComponent(columns,parenNode, this.#board.id)
    }
}