$(() => {
  $('#form').on('submit', createGame)
  $('.reset_button').click(resetGame)
  socket.on('load', game => {
    loadGame($('#board'), game)
  })
  socket.on('new-connection', game => {
    const welcomeMessage = "A new player has joined the game"
    if (game.status.message !== "Blank Game") {
      loadGame($('.board'), game)
    }
    displayMessage(welcomeMessage)
  })
})
