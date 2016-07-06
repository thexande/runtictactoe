'use strict'

const expect = require('chai').expect
const TicTacToe = require('../tic-tac-toe')
let ttt = new TicTacToe()

describe('TicTacToe', () => {
  describe('Initial state', () => {
    beforeEach( () => {
      ttt = new TicTacToe()
    })
    it('should have an empty board', () => {
      expect(ttt.board).to.deep.equal([])
    })
    it('should have the turn default to 1', () => {
      expect(ttt.turn).to.equal(1)
    })
    it('should have the over status to false and message say in progress', () => {
      expect(ttt.status.over).to.equal(false)
      expect(ttt.status.message).to.equal("Game in Progress")
    })
  })
  describe('Reset', () => {
    before( () => {
      ttt = new TicTacToe()
      ttt.turn = 2
      ttt.board = [[1,1,1],[2,2,2],[1,2,1]]
      ttt.reset()
    })
    it('should return the game to its initial state', () => {
      expect(ttt.board).to.deep.equal([])
      expect(ttt.turn).to.equal(1)
      expect(ttt.status.over).to.equal(false)
      expect(ttt.status.message).to.equal("Game in Progress")
    })
  })
  describe('CreateGame', () => {
    beforeEach( () => {
      ttt = new TicTacToe()
    })
    it('should create a new board given rows and columns', () => {
      let dimensions = {cols: 3, rows: 3}
      ttt.createGame(dimensions)
      expect(ttt.board).to.deep.equal([[0,0,0],[0,0,0],[0,0,0]])
    })
    it('should reset the current game', () => {
      let dimensions = {cols: 3, rows: 3}
      ttt.createGame(dimensions)
      ttt.turn = 2
      dimensions = {cols: 2, rows: 3}
      ttt.createGame(dimensions)
      expect(ttt.board).to.deep.equal([[0,0],[0,0],[0,0]])
      expect(ttt.turn).to.equal(1)
    })
    it('should create complicated boards', () => {
      let dimensions = {cols: 5, rows: 7}
      ttt.createGame(dimensions)
      let board = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
      expect(ttt.board).to.deep.equal(board)
      dimensions = {cols: 3, rows: 5}
      ttt.createGame(dimensions)
      board = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
      expect(ttt.board).to.deep.equal(board)
    })
  })
  describe('Move', () => {
    beforeEach(() => {
      ttt = new TicTacToe()
      let dimensions = {cols: 3, rows: 3}
      ttt.createGame(dimensions)
    })
    it('should play the move given a box location', () => {
      ttt.move([1,0])
      expect(ttt.board).to.deep.equal([[0,0,0],[1,0,0],[0,0,0]])
    })
    it('should change turns for every move', () => {
      ttt.move([1,0])
      expect(ttt.turn).to.equal(2)
      expect(ttt.board).to.deep.equal([[0,0,0],[1,0,0],[0,0,0]])
      ttt.move([2,2])
      expect(ttt.turn).to.equal(1)
      expect(ttt.board).to.deep.equal([[0,0,0],[1,0,0],[0,0,2]])
    })
  })
  describe('isComplete', () => {
    before(() => {
      ttt = new TicTacToe()
    })
    it('should check if the board is full', () => {
      ttt.board = [[1,2], [2,4]]
      expect(ttt.isComplete()).to.equal(true)
      ttt.board = [[1,0], [2,4]]
      expect(ttt.isComplete()).to.equal(false)
    })
  })
  describe('isWon', () => {
    // create a method that checks if the game is won
  })
})
