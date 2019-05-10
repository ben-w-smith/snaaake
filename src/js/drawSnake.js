import axios from 'axios'
import Snake from '../../Snake'

let Game = function(canvas, id) {
    Snake.call(this, id)

    this.canvas = canvas 
    this.ctx = this.canvas.getContext('2d')

    this.unit = 10

    this.backgroundColor = 'white' 
    this.borderColor = 'black'

    this.canvas.width = this.width * this.unit
    this.canvas.height = this.height * this.unit
}

Game.prototype = Object.create(Snake.prototype)

Game.prototype.clearCanvas = function() {
    this.ctx.fillStyle = this.backgroundColor 
    this.ctx.strokeStyle = this.borderColor 
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height) 
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height)
}

Game.prototype.drawCanvas = function() {
    let grid = this.arena

    for(let row = 0; row < grid.length; row++) {
        for(let column = 0; column < grid[row].length; column++) {
            if(grid[row][column] === 1) this.drawSnake(column, row) 
            if(grid[row][column] === 2) this.drawFood(column, row) 
        }
    }
}

Game.prototype.drawSnake = function(x, y) {
    x = x * this.unit 
    y = y * this.unit

    this.ctx.fillStyle = 'lightgreen'
    this.ctx.strokeStyle = 'darkgreen'
    this.ctx.fillRect(x, y, this.unit, this.unit) 
    this.ctx.strokeRect(x, y, this.unit, this.unit)
}

Game.prototype.drawFood = function(x, y) {
    x = x * this.unit 
    y = y * this.unit

    this.ctx.fillStyle = 'red'
    this.ctx.strokeStyle = 'darkred'
    this.ctx.fillRect(x, y, this.unit, this.unit) 
    this.ctx.strokeRect(x, y, this.unit, this.unit)
}

Game.prototype.draw = function() {
    this.clearCanvas()
    this.drawCanvas()
}

Game.prototype.getGameState = function() {
    axios.post(this.id)
    .then(function(resp) {
        this.setGameState(resp.data)
    }.bind(this))
    .catch(function(err) {
        console.warn(err)
    })
}

Game.prototype.setGameState = function(state) {
    this.setState(state) 
    this.draw()
}

Game.prototype.keyCodeToDirection = function(keycode) {
    const UP_KEY    = 38
    const DOWN_KEY  = 40
    const LEFT_KEY  = 37
    const RIGHT_KEY = 39

    if(UP_KEY === keycode) return 'up'
    if(DOWN_KEY === keycode) return 'down'
    if(LEFT_KEY === keycode) return 'left'
    if(RIGHT_KEY === keycode) return 'right'
}

Game.prototype.clientChangeDirection = function(keycode) {
    let direction = this.keyCodeToDirection(keycode) 
    this.changeDirection(direction)
}

Game.prototype.play = function() {
    this.interval = setInterval(function() {
        this.nextTick()
    }.bind(this), 300)
}

Game.prototype.pause = function() {
    clearInterval(this.interval)
}

Game.prototype.nextTick = function() {
    this.updateState() 
    let state = this.getState()

    axios({
        url: '/snake/update/' + this.id,
        method: 'POST',
        data: state, 
    })
    .then(function(resp) {
        // success
    })
    .catch(function(err) {
        console.warn(err)
    })


    if(this.gameOver) {
        clearInterval(this.interval)
        alert(`Your score was ${this.score}!`)
    }

    this.draw()
}

export default Game