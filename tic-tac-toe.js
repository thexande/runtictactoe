'use strict'

class TicTacToe {
  constructor () {
    this.reset()
  }
  reset () {
    this.board = []
    this.turn = 1
    this.status = {
      over: false,
      message: "Blank Game"
    }
  }
  createGame (dimensions) {
    this.reset()
    this.status.message = "Game in Progress"
    for (var i = 0; i < dimensions.rows; i++) {
      let row = []
      for (var j = 0; j < dimensions.cols; j++) {
        row.push(0)
      }
      this.board.push(row)
    }
  }
  move (box) {
    this.board[box[0]][box[1]] = this.turn
    this.turn === 1 ? this.turn = 2 : this.turn = 1
    if (this.isComplete()) {
      this.status.over = true
      this.status.message = "Board is Full"
    }
  }
  isComplete() {
    let complete = true
    this.board.forEach(row => {
      row.forEach(col => {
        if (col === 0) {
          complete = false
        }
      })
    })
    return complete
  }
}

module.exports = TicTacToe
