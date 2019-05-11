# Snaaake

## Install
`$ npm install`

## Developement
`$ npm run dev`

## Urls
localhost:3000 -> hello world

localhost:3000/snake -> snake!

## API Endpoints

### GET
`/` - hello world, is the server working?

`/snake` - view snake homepage 

`/snake/game/:id` - view an instance of a snake game

`/snake/new` - create a new game of snake and redirect to that game

### POST
`/snake/game/:id` - get the state of the given game id

`/snake/new` - create a new game and get the game state in json

`/snake/move/:id` - move the snake in a given direction

payload:
```
{
    direction: "up/down/left/right"
}
```

/snake/update/:id - update the snake game with the given state, any properties not specified will keep their current values

payload:
```
{
    food: { x: int, y: int },
    arena: [ [ ] ], // 2d array of 0's, 1's: snake, 2: food,
    score: int,
    gameOver: boolean,
    direction: { x: -1/0/1, y: -1/0/1 }
}
```

## Next Steps
* use uuid for game ids rather than an integer
* set a timeout for games to be deleted
  * create an export button for the current state?
  * create an import button?
* use websockets for updating game state rather than post in snake client nextTick()
  * create different message types for websocket?
  * possible message types: 
    * connected
    * game over 
    * new tick
  * is there a better way to setup websocket instances?