const fillBoard = (board, game) => {
  for (var i = 0; i < game.length; i++) {
    let value = normalizeValue(game[i])
    let div = $(`<div class="box">${value}</div>`)
    board.append(div)
  }
}

const normalizeValue = num => {
  let index = {
    "0": " ",
    "1": "X",
    "2": "O"
  }
  return index[num]
}
