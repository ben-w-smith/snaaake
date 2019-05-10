const path = require('path')
const http = require('http')
const express = require('express')
const app = express() 
const server = http.createServer(app)
const port = 3000

const Events = require('events') 
const wssEventHandler = new Events.EventEmitter();

let games = {}

// json parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// static files
app.use(express.static( path.join(__dirname, 'public') ))
app.use('/snake', express.static( path.join(__dirname, 'public') ))

app.get('/', function(req, res) {
    // hello world
    res.send('hello world')
})

app.get('/snake', function(req, res) {
    // view snake game
    let file = path.join(__dirname, 'public', 'snake.html') 
    res.sendFile(file)
})

app.get('/snake/game/:id', function(req, res) {
    // view snake game
    let id = req.params.id
    if(games[id]) {
        let file = path.join(__dirname, 'public', 'snake.html') 
        res.sendFile(file)
    } else {
        res.redirect('/snake')
    }
})

app.post('/snake/game/:id', function(req, res) {
    // send game state to user
    const id = req.params.id

    let state = games[id].getState()

    res.json(state)
})

app.get('/snake/new', function(req, res) {
    // generate new snake game
    const Snake = require('./Snake') 
    let id = Object.keys(games).length
    let snake = new Snake(id)
    games[id] = snake 

    res.redirect('/snake/game/' + id)
})

app.post('/snake/new', function(req, res) {
    // generate new snake game
    const Snake = require('./Snake') 
    let id = Object.keys(games).length
    let snake = new Snake(id)
    games[id] = snake 

    let state = games[id].getState()

    res.json(state)
})

app.post('/snake/move/:id', function(req, res) {
    // user sends directions and gets state back as a response
    const id = req.params.id 
    const direction = req.body.direction
    games[id].updateState(direction)

    let state = games[id].getState()

    wssEventHandler.emit('update', state)

    res.json(state)
})

app.post('/snake/update/:id', function(req, res) {
    const id = req.params.id 
    const state = req.body

    games[id].setState(state)

    let new_state = games[id].getState()

    res.json(new_state)
})

// websockets
const WebSocket = require('ws')
const wss = new WebSocket.Server({server})
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log(`received: ${message}`);
    });

    wssEventHandler.on('update', function(e) {
        ws.send(JSON.stringify(e))    
    })
});


server.listen(port, function() {
    console.log(`App listening on port ${port}!`)
})