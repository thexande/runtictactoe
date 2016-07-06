$(() => {
  $('form').on('submit', createGame)
  $('.reset').click(resetGame)
  socket.on('load', game => {
    loadGame($('.board'), game)
  })
  socket.on('new-connection', message => {
    displayMessage(message)
  })
})
