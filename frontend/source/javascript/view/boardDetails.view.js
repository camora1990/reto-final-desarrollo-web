import { utilities } from "../utilities/utilities.js";
import { ColumnComponent } from "./components/columnComponent.js";
import { ModaTaskComponent } from "./components/modalTaskComponent.js";

export class boardDetailsView{
    #parenNode;
    #board
    constructor() {
        this.#parenNode = document.querySelector(".container");
        
    }

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

    #createColumnsBoards(columns,parenNode){
        
        new ColumnComponent(columns,parenNode, this.#board.id)
    }
}