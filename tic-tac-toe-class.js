var _ = require('lodash')
class TicTacToe {
    constructor() {
    this.board = []
    this.turn = 1
    this.status = {
      over: false,
      message: "Blank Game"
    }
  }
  reset() {
    this.board = []
    this.gameComplete = false
    this.turn = 1
    this.status = {
      over: false,
      message: "Blank Game"
    }
  }
  createGame(dimensions) {
    this.reset()
    for (var i2 = 0; i2 < dimensions.rows; i2++) {
      var rowHolder = []
      for (var i = 0; i < dimensions.cols; i++) {
        rowHolder.push(0)
      }
      this.board.push(rowHolder)
    }
    this.status.message = "Game in Progress"
  }
  move(m){
    if(!this.board[m[0]][m[1]]){
      // postion empty.
      this.board[m[0]][m[1]] = this.turn
    }
    this.turn == 1 ? this.turn = 2 : this.turn = 1
  }
  isComplete() {
    this.board.forEach((val, key) => {
      val.forEach((val2, key2) => {
        val2 ? this.status.over = true : this.status.over = false
        val2 ? this.status.message = "Board Full" : null
      })
    })
  }
  horizontalWin(board, player){
    return board.map((i) => i.join("")).map((r) => {return _.countBy(r)})
     .filter((row) => row[player] === 3).length != 0
  }
  diagonalWin(board, player){
    return _.countBy(board.map((val,i) => val[i]))[player] === 3
  }
  isWon() {
    // outcome 1: horizontal win
   if(this.horizontalWin(this.board, 1)) { return "p1 h win" }
   if(this.horizontalWin(this.board, 2)) { return "p2 h win" }
    // outcome 2: vertical win
    if(this.horizontalWin(_.zip.apply(_, this.board), 1)) { return "p1 v win" }
    if(this.horizontalWin(_.zip.apply(_, this.board), 2)) { return "p2 v win" }
    // outcome 3: right diagonal
    if(this.diagonalWin(this.board, 1)) { return "p1 right diag win" }
    if(this.diagonalWin(this.board, 2)) { return "p2 right diag win" }
    // outcome 4: left diagonal
    if(this.diagonalWin(this.board.map((i) => i.reverse()), '1')) { return "p1 left diag win" }
    if(this.diagonalWin(this.board.map((i) => i.reverse()), '2')) { return "p2 left diag win" }
  }
}
module.exports = TicTacToe
