export class TicTacToeController {
    private view: TicTacToeView;
    private game: TicTacToe;
    private state;

    constructor(game: TicTacToe, view: TicTacToeView) {
        this.game = game;
        this.view = view;
        this.state = game.toJson()
        view.updateView(this.state);

        let i = 0
        for (let cell of view.board.children) {
            const index = i;
            cell.addEventListener("click", (e) => {
                game.setPiece(this.state.next, index);
                this.state = game.toJson();
                view.updateView(this.state);
            });
            i++;
        }
    }
}

import { TicTacToeView, findView } from "./ttt_view.js";
import { TicTacToe, Player } from "./tictactoe.js";
export function createController(root: Element) {
    let game = new TicTacToe();
    let view = findView(root);
    let controller = new TicTacToeController(game, view);
}

createController(document.body);