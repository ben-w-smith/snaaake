const port = 3000
const WebSocketServer = require('ws').Server 
const wss = new WebSocketServer({ port: port })

let websocket
wss.on('connection', function(ws) {
    websocket = ws
    ws.on('message', function(message) {
        console.log(`received: ${message}`)
    })
})

module.exports = websocket