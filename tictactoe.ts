export const enum Player {
    PLAYER_X = "X",
    PLAYER_0 = "0",
};
export const enum Cell {
    CELL0 = 0,
    CELL1 = 1,
    CELL2 = 2,
    CELL3 = 3,
    CELL4 = 4,
    CELL5 = 5,
    CELL6 = 6,
    CELL7 = 7,
    CELL8 = 8,
}

const enum State {
    PLAYING = "playing",
    TIE = "tie",
    PLAYER_X_WON = "player X won",
    PLAYER_0_WON = "player 0 won",
}
const enum Empty {
    EMPTY = ""
};
type CellContent = Empty | Player;
export interface GameState {
    board: CellContent[];
    next: Player;
    state: State;
}
/** A game of TicTacToe. */
export class TicTacToe implements GameState {
    board: CellContent[] = [Empty.EMPTY, Empty.EMPTY, Empty.EMPTY,
                                    Empty.EMPTY, Empty.EMPTY, Empty.EMPTY,
                                    Empty.EMPTY, Empty.EMPTY, Empty.EMPTY];
    
    next = Player.PLAYER_X;
    state = State.PLAYING;

    setPiece(player: Player, cell: Cell) {
        if (this.state != State.PLAYING) {
            throw new Error("Not currently playing.");
        }
        if (this.next != player) {
            throw new Error("Not your turn, my friend");
        }
        if (this.board[cell] != Empty.EMPTY) {
            throw new Error(`Cell ${cell} is already taken!`)
        }
        this.board[cell] = player;
        this.checkWinner();
        this.checkTie();
        if (this.next == Player.PLAYER_X) {
            this.next = Player.PLAYER_0;
        } else {
            this.next = Player.PLAYER_X;
        }
    }

    checkWinner() {
        if (this.state != State.PLAYING) {
            return;
        }
        const winners = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                         [0, 3, 6], [1, 4, 7], [2, 5, 8],
                         [0, 4, 8], [2, 4, 6]]
        for (let winner of winners) {
            const first = this.board[winner[0]];
            if (first == Empty.EMPTY) {
                continue;
            }
            if (first == this.board[winner[1]] && first == this.board[winner[2]]) {
                if (first == Player.PLAYER_X) {
                    this.state = State.PLAYER_X_WON;
                } else {
                    this.state = State.PLAYER_0_WON;
                }
                return;
            }
        }
    }

    checkTie() {
        if (this.state == State.PLAYING && this.board.indexOf(Empty.EMPTY) == -1) {
            this.state = State.TIE;
        }
    }

    toJson() {
        return {
            'state' : this.state,
            'next' : this.next,
            'board' : this.board
        };
    }

    toConsole() {
        return `${this.board.slice(0, 3)}\n${this.board.slice(3, 6)}\n${this.board.slice(6, 9)}\nstate:${this.state}\nnext:${this.next}`;
    }
}