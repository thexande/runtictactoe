'use strict'

const Socket = require('socket.io');
const TicTacToe = require('./tic-tac-toe')
const game = new TicTacToe()
let currentDimensions = null

module.exports = server => {
  const io = Socket(server)

  io.on('connection', socket => {
    const welcomeMessage = "A new player has joined the game"
    io.emit('new-connection', {game , welcomeMessage})

    socket.on('new-game', dimensions => {
      currentDimensions = dimensions
      game.createGame(dimensions)
      io.emit('load', game)
    })

    socket.on('move', box => {
      game.move(box)
      io.emit('load', game)
    })

    socket.on('reset', () => {
      game.createGame(currentDimensions)
      io.emit('load', game)
    })
  })
}
