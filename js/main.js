/**********************************
=====Constructor for gameboard=====
reads row and column custom attribute HTML container
Properties
  players-> array containing the content of the squares.
    array.length = number of players
  width: Boards are square by default
  currentPlayer randomly chooses a player to start
  Win condition: get shape in a series as long as board width
***********************************/
function Gameboard(players = ['X', 'O'], width = 3){
  this.players = players
  this.numWidth = width
  this.tiles =[]//stored as y,x
  //Choose first player index randomly
  this.currentPlayerIndex = Math.floor(Math.random() * this.players.length)
  this.prompt = document.querySelector('.prompt')

  //populate tiles[]
  //i is row
  //j is column in the row
  for (var i = 0; i < width; i++) {
    let newRow =[]
    for (var j = 0; j < width; j++) {
      newRow.push(new Tile(this, i, j, document.querySelector(`.row-${i} .square-${j}`)))
    }
    this.tiles.push(newRow)
  }

  this.getCurrentPlayer = function(){
    return this.players[this.currentPlayerIndex]
  }
  this.prompt.innerText = `First Player: ${this.getCurrentPlayer()}`

  //sets currentplayer the next player in array
  this.nextPlayer = function(){
    this.currentPlayerIndex = (this.currentPlayerIndex+=1)%2
    this.prompt.innerText = `Current Player: ${this.getCurrentPlayer()}`
  }

  //Checks win condition centered on the passed tile
  this.checkWin = function(tile) {
    let winLength = this.numWidth //How long the number of matching shapes have to be
    let win = false

    /*Check Vertical line Win Condition*/
    let winCheck = true
    for (var i = 0; i < winLength; i++) {
      winCheck = this.tiles[i][tile.x].shape === tile.shape && winCheck
    }
    win = win || winCheck

    /*Check horizontal line Win Condition*/
    winCheck = true
    for (var i = 0; i < winLength; i++) {
      winCheck = this.tiles[tile.y][i].shape === tile.shape && winCheck
    }
    win = win || winCheck


    /*Check backslash diag line Win Condition*/
    if (tile.x===tile.y) {
      winCheck=true
      for (var i = 0; i < winLength; i++) {
        winCheck = (this.tiles[i][i].shape === tile.shape) && winCheck
      }
      win = win || winCheck
    } else {
      win = win || false
    }

    /*Check forwardslash line Win Condition*/
    if (tile.x===(this.numWidth-tile.y-1)) {
      winCheck=true
      for (var i = 0; i < winLength; i++) {
        winCheck = this.tiles[i][this.numWidth-1-i].shape === tile.shape && winCheck
      }
      win = win || winCheck
    } else {
      win = win || false
    }
    //If game won, disable all remaining tiles
    if (win) {
      this.prompt.innerText = `${this.getCurrentPlayer()} Wins!`
      this.tiles.forEach((innerArray, i) => {
        innerArray.forEach((item, j) => {
          item.domElement.disabled = "true"
        });
      });
    }
    return win
  }
}

/**********************************
=====Constructor for tile==========
**********************************/
function Tile(gameboard, y, x, domElement){

  this.gameboard = gameboard
  this.x = x
  this.y = y
  this.domElement = domElement
  this.shape = ""

  this.domElement.addEventListener('click', _ => {this.setShape()})
  this.setShape = function(){
    if (true){
      this.shape = this.gameboard.getCurrentPlayer()
      this.domElement.innerText = this.shape
      this.domElement.style.top = "1rem"
      this.domElement.disabled = 'true'
      if(!this.gameboard.checkWin(this)){
        this.gameboard.nextPlayer()
      }
    }
  }
}


/********************
===initialization====
********************/
initialize()

function initialize() {
  const players = ['./img/paw.png','./img/nose.png']
  const width = 3
  let gameboard = new Gameboard()
}
