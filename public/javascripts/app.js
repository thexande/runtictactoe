$(() => {
  $('form').on('submit', createGame)
  $('.reset').click(resetGame)
  socket.on('load', game => {
    loadGame($('.board'), game)
  })
  socket.on('new-connection', info => {
    if (info.game.status.message !== "Blank Game") {
      loadGame($('.board'), info.game)
    }
    displayMessage(info.welcomeMessage)
  })
})
