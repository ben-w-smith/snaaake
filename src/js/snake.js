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

let game = new Game(canvas) 
game.clearCanvas()
if(game_id) {
    game.getState(game_id)
}



// event listeners
//---

document.addEventListener('update', function(e) {
    console.log(ws.gameState)
})