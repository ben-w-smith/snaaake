const LinkedList = require("./LinkedList")

let Snake = function(id) {
    this.new(id)
}

Snake.prototype.new = function(id) {
    this.id = id 

    this.width = 30
    this.height = 30

    this.arena = undefined
    this.food = undefined
    this.snake = undefined

    this.direction = {
        x: 1,
        y: 0,
    }

    this.score = 0
    this.gameOver = false 

    this.createSnake()
    this.createFood()
    this.updateArena()
}

Snake.prototype.createSnake = function() {
    this.snake = new LinkedList()
    this.snake.addToHead({ x: 14, y: 15 }) 
    this.snake.addToHead({ x: 15, y: 15 }) 
    this.snake.addToHead({ x: 16, y: 15 }) 
}

Snake.prototype.createFood = function() {
    if( !this.food ) {
        this.food = {}
    }

    let food = this.food 
    food.x = this.randomCoord(0, this.width - 1)
    food.y = this.randomCoord(0, this.height - 1)

    let foodIsOnSnake = false 
    let node = this.snake.head 

    while(node) {
        let coord = node.value 
        foodIsOnSnake = coord.x === food.x && coord.y === food.y 
        if(foodIsOnSnake) break 
        node = node.next
    }

    if(foodIsOnSnake) this.createFood()
}

Snake.prototype.randomCoord = function(min, max) {
    return Math.round( Math.random() * (max - min) + min )
}

Snake.prototype.updateArena = function() {
    let arena = Array(this.height).fill().map(function() {
        return Array(this.width).fill(0)
    }.bind(this))

    let snake = this.snake 
    let food = this.food

    arena[food.y][food.x] = 2 

    let node = snake.head
    while(node) {
        let coord = node.value 
        arena[coord.y][coord.x] = 1
        node = node.next
    }

    this.arena = arena
}

Snake.prototype.checkGameOver = function() {
    return ( this.hitWall() || this.hitSnake() )
}

Snake.prototype.hitSnake = function() {
    let didHit = false 
    let head = this.snake.head.value 
    let node = this.snake.head.next 

    while(node) {
        let coord = node.value 
        didHit = ( head.x === coord.x  && head.y === coord.y )
        if(didHit) break;
        node = node.next 
    }

    return didHit
}

Snake.prototype.hitWall = function() {
    let head = this.snake.head.value
    let hitWall = (
        head.x < 0
        || head.y < 0
        || head.x > this.width - 1
        || head.y > this.height - 1
    )
    return hitWall
}

Snake.prototype.move = function() {
    let head = this.snake.head.value 
    let direction = this.direction
    this.snake.addToHead({
        x: head.x + direction.x, 
        y: head.y + direction.y,
    })

    let food = this.food
    let didEatFood = head.x === food.x && head.y === food.y 
    if(didEatFood) {
        this.score++ 
        this.createFood()
    } else {
        this.snake.removeTail()
    }
}

Snake.prototype.changeDirection = function(direction) {
    direction = direction.toLowerCase().trim()

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

Snake.prototype.updateState = function(direction) {
    direction = direction || false 
    if(direction) this.changeDirection(direction)
    
    this.move() 
    this.gameOver = this.checkGameOver()

    if(this.gameOver) {
        return
    }

    this.updateArena()
}

Snake.prototype.getState = function() {
    return {
        food: this.food,
        arena: this.arena,
        score: this.score,
        snake: this.getSnakeCoords(),
        gameOver: this.gameOver,
        direction: this.direction,
    }
}

Snake.prototype.getSnakeCoords = function() {
    let node = this.snake.head
    let coords = [] 

    while(node) {
        coords.push(node.value) 
        node = node.next
    }

    return coords
}

Snake.prototype.buildSnakeFromCoords = function(coords) {
    this.snake = new LinkedList()
    while(coords.length > 0) {
        let coord = coords.pop()
        this.snake.addToHead(coord)
    }
}

Snake.prototype.setState = function(state) {
    this.food = state.food || this.food
    this.arena = state.arena || this.arena 
    this.score = state.score || this.score
    this.gameOver = state.gameOver || this.gameOver 
    this.direction = state.direction || this.direction

    if(state.snake) {
        this.buildSnakeFromCoords(state.snake)
    }
}

module.exports = Snake