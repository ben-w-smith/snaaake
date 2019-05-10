// 3 major things...
import Game from './drawSnake'

// websockedts
let ws = new WebSocket('ws://localhost:3000') 

ws.onopen = function() {
    ws.send('connected')
}

ws.onmessage = function(e) {
    console.log(e)
    let event = new Event('update')
    document.dispatchEvent(event)
}

// drawing snake
const canvas = document.getElementById('snake')
let game = new Game(canvas) 
game.clearCanvas()

// controlling snake
