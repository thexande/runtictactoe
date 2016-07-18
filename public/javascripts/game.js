const socket = io();
const messages = []

const createGame = event => {
  // get rows and columns from form
  var form_data = $('#form').serializeArray().reduce(function(obj, item) {
      obj[item.name] = item.value;
      return obj;
  }, {});
  $('#form').hide()
  $('.board').show()
  $(".msg_btns").show()
  console.log("creating game");
  event.preventDefault()
  let rows = parseInt(form_data.board_dimension)
  let cols = parseInt(form_data.board_dimension)
  displayMessage(`New Game: ${rows}x${cols}`)
  socket.emit('new-game', {cols, rows})
}

const loadGame = (board, game) => {
  fillBoard(board, game.board)
  setCurrentTurn(game.turn)
  if (game.status.over) {
    displayMessage(game.status.message)
  } else {
    loadEventListener(board, game)
  }
}

const fillBoard = (board, game) => {
  board.empty()
  game.forEach((row, j) => {
    let rowDiv = $('<div class="row"></div>')
    row.forEach((box, i) => {
      let value = normalizeValue(box)
      let div = $(`<div data-id='${j}-${i}' class='box'>${value}</div>`)
      rowDiv.append(div)
    })
    board.append(rowDiv)
  })
  $('.reset').show()
}

const normalizeValue = value => {
  if (value === 1) {
    return 'X'
  } else if (value === 2) {
    return 'O'
  } else {
    return ' '
  }
}

const setCurrentTurn = turn => {
  let message = "Current Turn: O"
  if (turn === 1) {
    message = "Current Turn: X"
  }
  $('.current-turn').html(message)
}

const loadEventListener = (board, game) => {
  $('.box').click(function () {
    let value = $(this).html().trim()
    if (!value) {
      let boxNumber = $(this).attr('data-id').split('-')
      socket.emit('move', boxNumber)
    }
  })
}

const resetGame = () => {
  displayMessage(`Game Reset`)
  $('.message-board').html("")
  socket.emit('reset', null)
}

const displayMessage = message => {
  if (messages.length !== 0) {
    messages.unshift(message)
  } else {
    messages.unshift("Welcome!")
  }
  const $messageBoard = $('.message-board')
  $messageBoard.empty()
  messages.forEach(message => {
    $messageBoard.append(`<div class="alert alert-info">${message}</div>`)
    // handle win
    if(typeof(message) == 'object'){
      win = (message)
      console.log(win);
      $(".modal-title").html(win.winCase)
      $(".modal-body").html(win.winPlayer)
      $('#myModal').modal('show')
    }
    console.log(typeof(message));
  })
}
