import { feathers } from '@feathersjs/feathers'
import type { Id, Params } from '@feathersjs/feathers'
import { NotFound, GeneralError, BadRequest } from '@feathersjs/errors'
import { koa, rest, bodyParser, errorHandler, serveStatic } from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'
import { TicTacToe, Player, Cell } from '../tictactoe'

class TicTacToeService {
    private game: TicTacToe = new TicTacToe();
    async find(params: Params) {
        return [1];
    }
    async get(id: Id, params: Params) {
        if (id == 1) {
            return this.game.toJson();
        }
        throw new NotFound();
    }
    async patch(id: Id, params: Params) {
        if (id == 1) {
            this.game.setPiece(Player.X, Cell.3);
            return this.game.toJson();
        }
    }
}
// This tells TypeScript what services we are registering
type ServiceTypes = {
    tictactoe: TicTacToeService
}
  
// Creates an KoaJS compatible Feathers application
const app = koa<ServiceTypes>(feathers())

// Use the current folder for static file hosting
app.use(serveStatic('.'))
// Register the error handle
app.use(errorHandler())
// Parse JSON request bodies
app.use(bodyParser())

// Register REST service handler
app.configure(rest())
// Configure Socket.io real-time APIs
app.configure(socketio())
// Register our messages service
app.use('tictactoe', new TicTacToeService())

// Start the server
app.listen(3030).then(() => console.log('Feathers server listening on localhost:3030'))

