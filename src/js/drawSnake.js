let Game = function(canvas, state) {
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

Game.prototype.drawCanvas = function(state) {
    let grid = state.arena

    for(let row = 0; row < grid.length; row++) {
        for(let column = 0; column < row.length; column++) {
            if(grid[row][column] === 1) this.drawSnake(column, row) 
            if(grid[row][column] === 2) this.drawFood(column, row) 
        }
    }
}

Game.prototype.drawSnake = function(x, y) {
    this.ctx.fillStyle = 'lightgreen'
    this.ctx.strokeStyle = 'darkgreen'
    this.ctx.fillRect(x, y, this.unit, this.unit) 
    this.ctx.strokeRect(x, y, this.unit, this.unit)
}

Game.prototype.drawFood = function(x, y) {
    this.ctx.fillStyle = 'red'
    this.ctx.strokeStyle = 'darkred'
    this.ctx.fillRect(x, y, this.unit, this.unit) 
    this.ctx.strokeRect(x, y, this.unit, this.unit)
}

Game.prototype.draw = function(state) {
    this.clearCanvas()
    this.drawCanvas(state)
}

export default Game