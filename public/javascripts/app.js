const $board = $('.board')
const board = new Array(9)
const game = {
  turn: true,
  board
}

$(() => {
  loadGame($board, game)
  $('.reset').click(function () {
    game.board = new Array(9)
    loadGame($board, game)
  })
})
