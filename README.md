# Tic Tac Toe Project

This is a project to practice test-driven development and Web Sockets.

[Finished Example](https://tdd-tic-tac-toe.herokuapp.com/)

## Step One: TDD tic-tac-toe

Most of the tests are already written inside `test/tic-tac-toe.js`.
Following Red Green light testing, complete the TicTacToe class inside the `tic-tac-toe.js` file.

Remember:
- `npm install -g mocha`
- `mocha` to run tests

## Step Two: Implement Web Sockets

In the `socket.js` file, establish a socket connection that meets the following criteria:

1. On `connection`, it emits `new-connection` to all sockets with the current game information.

1. When a socket fires a `new-game` event, the connection should receive
the dimensions from the client, create a new game, then emit `load` to all sockets
with the new game.

1. When a socket fires a `move` event, the connection should receive a box location
from the client, play the move in the game, then emit `load` to all sockets with
the latest game version.

1. When a socket fires a `reset` event, the connection should reset the game
to the last dimensions used to create the game, then emit `load` to all sockets with
the reset game version.

Remember to go into the `bin/www` file and hook up sockets to the server.

## STRETCH

* Add a isWon() method to check if a player has won the game
* Create namespaces to only allow two players per game
