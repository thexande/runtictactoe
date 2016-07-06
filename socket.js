'use strict'

const Socket = require('socket.io');
const TicTacToe = require('./tic-tac-toe')
const ttt = new TicTacToe()
let currentDimensions = null

module.exports = server => {
  const io = Socket(server)

  io.on('connection', socket => {
    const welcomeMessage = "A new Player has joined the game"
    io.emit('new-connection', welcomeMessage)

    socket.on('new-game', dimensions => {
      currentDimensions = dimensions
      ttt.createGame(dimensions)
      io.emit('load', ttt)
    })

    socket.on('move', box => {
      ttt.move(box)
      io.emit('load', ttt)
    })

    socket.on('reset', () => {
      ttt.createGame(currentDimensions)
      io.emit('load', ttt)
    })
  })
}
