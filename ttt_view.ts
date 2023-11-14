import { GameState } from "./tictactoe.js";
export class TicTacToeView {
    board: Element;
    state: Element;
    next: Element;

    constructor(board: Element, state: Element, next: Element) {
        this.board = board;
        this.state = state;
        this.next = next;
    }
    updateView(gamestate: GameState) {
        for (let i = 0; i < 9; i++) {
            let contents = gamestate.board[i];
            let cell = this.board.children[i];
            cell.setAttribute('data-state', contents);
        }
        this.next.textContent = gamestate.next;
        this.state.textContent = gamestate.state;
    }
}

export function findView(root: Element) {
    let board = root.getElementsByTagName('ttt-brett')[0];
    let state = root.getElementsByTagName('ttt-state')[0];
    let next =  root.getElementsByTagName('ttt-next')[0];
    return new TicTacToeView(board, state, next);
}