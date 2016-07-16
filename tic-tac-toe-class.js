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
  constructWinObj(winCase, winPlayer){ return { winCase: winCase, winPlayer: winPlayer}}
  returnWinObj(winStr) {
    switch(winStr){
      case "p1_h_w": return(this.constructWinObj("Horizontal Win", "Player 1"))
      case "p2_h_w": return(this.constructWinObj("Horizontal Win", "Player 2"))
      case "p1_v_w": return(this.constructWinObj("Vertical Win", "Player 1"))
      case "p2_v_w": return(this.constructWinObj("Vertical Win", "Player 2"))
      case "p1_r_d_w": return(this.constructWinObj("Right Diagonal Win", "Player 1"))
      case "p2_r_d_w": return(this.constructWinObj("Right Diagonal Win", "Player 2"))
      case "p1_l_d_w": return(this.constructWinObj("Left Diagonal Win", "Player 1"))
      case "p2_l_d_w": return(this.constructWinObj("Left Diagonal Win", "Player 2"))
    }
  }
  isWon() {
   if(this.horizontalWin(this.board, 1)) { return this.returnWinObj("p1_h_w") }
   if(this.horizontalWin(this.board, 2)) { return this.returnWinObj("p2_h_w") }
    if(this.horizontalWin(_.zip.apply(_, this.board), 1)) { return this.returnWinObj("p1_v_w") }
    if(this.horizontalWin(_.zip.apply(_, this.board), 2)) { return this.returnWinObj("p2_v_w") }
    if(this.diagonalWin(this.board, 1)) { return this.returnWinObj("p1_r_d_w") }
    if(this.diagonalWin(this.board, 2)) { return this.returnWinObj("p2_r_d_w") }
    var boardReverse = this.board.map((i) => i.reverse())
    if(this.diagonalWin(boardReverse, '2')) { return this.returnWinObj("p2_l_d_w") }
    if(this.diagonalWin(boardReverse, '1')) { return this.returnWinObj("p1_l_d_w") }
  }
}
module.exports = TicTacToe
