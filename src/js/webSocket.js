
let ws = new WebSocket('ws://localhost:3000') 
ws.gameState = {}

ws.onopen = function() {
    ws.send('connected')
}

ws.onmessage = function(e) {
    // console.log(e)
    let event = new Event('update')
    ws.gameState = e.data
    document.dispatchEvent(event)
}

export default ws