'use strict'

const expect = require('chai').expect
const TicTacToe = require('../tic-tac-toe')
let game = new TicTacToe()

describe('TicTacToe', () => {
  describe('Initial state', () => {
    beforeEach( () => {
      game = new TicTacToe()
    })
    it('should have an empty board', () => {
      expect(game.board).to.deep.equal([])
    })
    it('should have the turn default to 1', () => {
      expect(game.turn).to.equal(1)
    })
    it('should have the over status to false and message say in progress', () => {
      expect(game.status.over).to.equal(false)
      expect(game.status.message).to.equal("Blank Game")
    })
  })
  describe('Reset', () => {
    before( () => {
      game = new TicTacToe()
      game.turn = 2
      game.board = [[1,1,1],[2,2,2],[1,2,1]]
      game.reset()
    })
    it('should return the game to its initial state', () => {
      expect(game.board).to.deep.equal([])
      expect(game.turn).to.equal(1)
      expect(game.status.over).to.equal(false)
      expect(game.status.message).to.equal("Blank Game")
    })
  })
  describe('CreateGame', () => {
    beforeEach( () => {
      game = new TicTacToe()
    })
    it('should create a new board given rows and columns', () => {
      let dimensions = {cols: 3, rows: 3}
      game.createGame(dimensions)
      expect(game.board).to.deep.equal([[0,0,0],[0,0,0],[0,0,0]])
    })
    it('should set the status to in progress', () => {
      expect(game.status.message).to.equal("Blank Game")
      let dimensions = {cols: 3, rows: 3}
      game.createGame(dimensions)
      expect(game.status.message).to.equal("Game in Progress")
    })
    it('should reset the current game', () => {
      let dimensions = {cols: 3, rows: 3}
      game.createGame(dimensions)
      game.turn = 2
      dimensions = {cols: 2, rows: 3}
      game.createGame(dimensions)
      expect(game.board).to.deep.equal([[0,0],[0,0],[0,0]])
      expect(game.turn).to.equal(1)
    })
    it('should create complicated boards', () => {
      let dimensions = {cols: 5, rows: 7}
      game.createGame(dimensions)
      let board = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
      expect(game.board).to.deep.equal(board)
      dimensions = {cols: 3, rows: 5}
      game.createGame(dimensions)
      board = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
      expect(game.board).to.deep.equal(board)
    })
  })
  describe('Move', () => {
    beforeEach(() => {
      game = new TicTacToe()
      let dimensions = {cols: 3, rows: 3}
      game.createGame(dimensions)
    })
    it('should play the move given a box location', () => {
      game.move([1,0])
      expect(game.board).to.deep.equal([[0,0,0],[1,0,0],[0,0,0]])
    })
    it('should change turns for every move', () => {
      game.move([1,0])
      expect(game.turn).to.equal(2)
      expect(game.board).to.deep.equal([[0,0,0],[1,0,0],[0,0,0]])
      game.move([2,2])
      expect(game.turn).to.equal(1)
      expect(game.board).to.deep.equal([[0,0,0],[1,0,0],[0,0,2]])
    })
  })
  describe('isComplete', () => {
    beforeEach(() => {
      game = new TicTacToe()
      let dimensions = {cols: 3, rows: 3}
      game.createGame(dimensions)
    })
    it('should check if the board is full', () => {
      // add test
      // fill our board
      game.move([0,0])
      game.move([1,0])
      game.move([0,1])
      game.move([1,1])
      game.move([1,2])
      game.move([2,2])
      game.move([2,0])
      game.move([0,2])
      game.move([2,1])
      game.isComplete()
      expect(game.status.over).to.equal(true)
    })
    it('should check if the board is not full', () => {
      game.move([1,0])
      game.move([0,1])
      game.move([1,1])
      game.move([1,2])
      game.move([2,2])
      game.move([2,0])
      game.move([0,2])
      game.move([2,1])
      game.isComplete()
      expect(game.status.over).to.equal(true)
    })
    it('should change the over status of the game to true if complete', () => {
      game.move([0,0])
      game.move([1,0])
      game.move([0,1])
      game.move([1,1])
      game.move([1,2])
      game.move([2,2])
      game.move([2,0])
      game.move([0,2])
      game.move([2,1])
      game.isComplete()
      expect(game.status.over).to.equal(true)
    })
    it('should change the message status of the game to full if complete', () => {
      game.move([0,0])
      game.move([1,0])
      game.move([0,1])
      game.move([1,1])
      game.move([1,2])
      game.move([2,2])
      game.move([2,0])
      game.move([0,2])
      game.move([2,1])
      game.isComplete()
      expect(game.status.message).to.equal("Board Full")
    })
  })
  // STRETCH
  describe('isWon', () => {
    beforeEach(() => {
      game = new TicTacToe()
      let dimensions = {cols: 3, rows: 3}
      game.createGame(dimensions)
    })
    // horizontal win
    it("should check for a player 1 horizontal win", () => {
      game.move([0,0])
      game.move([1,0])
      game.move([0,1])
      game.move([1,1])
      game.move([0,2])
      expect(game.isWon()).to.deep.equal({ winCase: 'Horizontal Win', winPlayer: 'Player 1' })
    })
    it("should check for a player 2 horizontal win", () => {
      game.move([1,0])
      game.move([0,0])
      game.move([1,1])
      game.move([0,1])
      game.move([2,2])
      game.move([0,2])

      expect(game.isWon()).to.deep.equal({ winCase: 'Horizontal Win', winPlayer: 'Player 2' })
    })
    it("should check for a player 1 vertical win", () => {
      game.move([0,0])
      game.move([2,2])
      game.move([1,0])
      game.move([1,2])
      game.move([1,1])
      game.move([2,1])
      game.move([2,0])

      expect(game.isWon()).to.deep.equal({ winCase: 'Vertical Win', winPlayer: 'Player 1' })
    })
    it("should check for a player 2 vertical win", () => {
      game.move([2,2])
      game.move([0,0])
      game.move([1,2])
      game.move([1,0])
      game.move([1,1])
      game.move([2,0])
      game.move([2,0])

      expect(game.isWon()).to.deep.equal({ winCase: 'Vertical Win', winPlayer: 'Player 2' })
    })
    it("should check for a player 1 right diagonal win", () => {
      game.move([0,0])
      game.move([1,0])
      game.move([2,2])
      game.move([1,2])
      game.move([1,1])
      game.move([2,1])

      game.move([2,0])
      expect(game.isWon()).to.deep.equal({ winCase: 'Right Diagonal Win', winPlayer: 'Player 1' })
    })
    it("should check for a player 2 right diagonal win", () => {
      game.move([1,0])
      game.move([0,0])
      game.move([1,2])
      game.move([2,2])
      game.move([2,1])
      game.move([1,1])
      game.move([2,0])

      expect(game.isWon()).to.deep.equal({ winCase: 'Right Diagonal Win', winPlayer: 'Player 2' })
    })
    it("should check for a player 1 left diagonal win", () => {
      game.move([1,1])
      game.move([1,0])
      game.move([2,0])
      game.move([1,2])
      game.move([0,2])
      game.move([2,2])
      expect(game.isWon()).to.deep.equal({ winCase: 'Left Diagonal Win', winPlayer: 'Player 1' })
    })
    it("should check for a player 2 left diagonal win", () => {
      game.move([1,0])
      game.move([1,1])
      game.move([1,2])
      game.move([2,0])
      game.move([2,2])
      game.move([0,2])
      expect(game.isWon()).to.deep.equal({ winCase: 'Left Diagonal Win', winPlayer: 'Player 2' })
    })
  })
})
