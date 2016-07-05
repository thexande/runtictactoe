const loadGame = (board, game) => {
  fillBoard(board, game.board)
  setCurrentTurn(game.turn)
  loadEventListener(board, game)
}

const fillBoard = (board, game) => {
  board.empty()
  for (var i = 0; i < game.length; i++) {
    let value = normalizeValue(game[i])
    let div = $(`<div data-id="${i}" class="box">${value}</div>`)
    board.append(div)
  }
}

const normalizeValue = value => {
  if (value === true) {
    return "X"
  } else if (value === false) {
    return "O"
  } else {
    return " "
  }
}

const setCurrentTurn = turnBool => {
  let message = "X's Turn"
  if (turnBool) {
    message = "O's Turn"
  }
  $('.currentTurn').html(message)
}

const loadEventListener = (board, game) => {
  $('div').click(function () {
    let value = $(this).html().trim()
    if (!value) {
      let boxNumber = $(this).attr("data-id")
      game.board[boxNumber] = game.turn
      game.turn = !game.turn
      loadGame(board, game)
    }
  })
}
