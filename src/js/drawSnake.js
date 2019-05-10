import axios from 'axios'
import Snake from '../../Snake'

let Game = function(canvas) {
    this = new Snake() 
    this.new()

    this.canvas = canvas 
    this.ctx = this.canvas.getContext('2d')

    this.unit = 10

    this.backgroundColor = 'white' 
    this.borderColor = 'black'

    // let width = state.arena[0].length
    // let height = state.arena.length 
    let width = 30
    let height = 30

    this.width = width * this.unit
    this.height = height * this.unit
}

Game.prototype.clearCanvas = function() {
    this.ctx.fillStyle = this.backgroundColor 
    this.ctx.strokeStyle = this.borderColor 
    this.ctx.fillRect(0, 0, this.width, this.height) 
    this.ctx.strokeRect(0, 0, this.width, this.height)
}

Game.prototype.drawCanvas = function() {
    let grid = this.state.arena

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

Game.prototype.getState = function(id) {
    axios.post('/snake/game/' + id)
    .then(function(resp) {
        this.state = resp.data
        this.draw()
    }.bind(this))
    .catch(function(err) {
        console.warn(err)
    })
}

Snake.prototype.keyCodeToDirection = function(keycode) {
    const UP_KEY    = 38
    const DOWN_KEY  = 40
    const LEFT_KEY  = 37
    const RIGHT_KEY = 39

    if(UP_KEY === keycode) return 'up'
    if(DOWN_KEY === keycode) return 'down'
    if(LEFT_KEY === keycode) return 'left'
    if(RIGHT_KEY === keycode) return 'right'
}


Snake.prototype.changeDirection = function(keycode) {
    let direction = this.keyCodeToDirection(keycode)

    const goingUp    = this.direction.y === -1
    const goingDown  = this.direction.y === 1
    const goingLeft  = this.direction.x === -1
    const goingRight = this.direction.x === 1

    if(direction === 'up' && !goingDown) {
        this.direction.x = 0 
        this.direction.y = -1
    }

    if(direction === 'down' && !goingUp) {
        this.direction.x = 0 
        this.direction.y = 1
    }

    if(direction === 'left' && !goingRight) {
        this.direction.x = -1 
        this.direction.y = 0
    }

    if(direction === 'right' && !goingLeft) {
        this.direction.x = 1 
        this.direction.y = 0
    }
}

Game.prototype.play = function() {

}

export default Game