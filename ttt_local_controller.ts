export class TicTacToeController {
    private state: GameState;

    constructor(game: TicTacToe, view: TicTacToeView) {
        this.state = game;
        view.updateView(this.state);

        let i = 0
        for (let cell of view.board.children) {
            const index = i;
            cell.addEventListener("click", (e) => {
                game.setPiece(this.state.next, index);
                this.state = game;
                view.updateView(this.state);
            });
            i++;
        }
    }
}

import { TicTacToeView, findView } from "./ttt_view.js";
import { TicTacToe, GameState } from "./tictactoe.js";
export function createController(root: Element) {
    let game = new TicTacToe();
    let view = findView(root);
    new TicTacToeController(game, view);
}

createController(document.body);