// 3 major things...
import Game from './drawSnake'
import ws from './webSocket'



// define dom elements
//---
const game_id = window.location.pathname.split('/').pop() || false
const canvas = document.getElementById('snake')
const newGame = document.getElementById("new")
const start = document.getElementById("start")
const pause = document.getElementById("pause")
const next = document.getElementById("next")

// give some error message
if(!game_id) return

let game = new Game(canvas, game_id) 
game.getGameState()
game.draw()


// event listeners
//---

// get game state
document.addEventListener('update', function(e) {
    game.setGameState( JSON.parse(ws.gameState) )
})

document.addEventListener('keydown', function(e) {
    let keyCode = e.keyCode
    game.clientChangeDirection(keyCode)
})

start.addEventListener('click', function() {
    game.play()
})

pause.addEventListener('click', function() {
    game.pause()
})

next.addEventListener('click', function() {
    game.nextTick()
})