function TicTacToe() {
  this.board = []
  this.turn = 1
  this.status = {
    over: false,
    message: "Blank Game"
  }
}
TicTacToe.prototype.reset = () => {
  this.board = []
  this.turn = 1
  this.status = {
    over:false,
    message:"Blank Game"
  }
}
TicTacToe.prototype.createGame = (dimensions) => {
  var rows = dimensions.rows
  var columns = dimensions.columns
  for (var i = 0; i < rows; i++) {
    // console.log(rows);
  }
}
module.exports = TicTacToe
