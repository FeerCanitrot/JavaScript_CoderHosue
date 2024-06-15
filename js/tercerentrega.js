const gameBoard = document.querySelector('.game-board')
const messageTurn = document.querySelector('.game-turn')
const endGame = document.querySelector('.endgame')
const endGameResult = document.querySelector('.endgame-result')
const buttonReset = document.querySelector('.endgame-button')

let isTrunX = true
let turn = 0
let maxTurn = 9
let players = {
    x: 'cross',
    o: 'circle'
}

const winningPosition = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,4,8], [2,4,6],
    [0,3,6], [1,4,7], [2,5,8]
]

startGame()

function startGame(){
    creatBoard()
    messageTurn.textContent = isTrunX ? "X" : "O"
    isTrunX = true
    turn = 0
    endGame.classList.remove('show')
}

function creatBoard(){
    const cell = 9
    while(gameBoard.firstElementChild){
        gameBoard.firstElementChild.remove()
    }
    for (let i = 0; i < cell; i++) {
        const div = document.createElement('div')
        div.classList.add('cell')
        div.addEventListener('click', handleGame , {once:true})
        gameBoard.append(div)
    }
}

function handleGame(e){
    const currentCell = e.currentTarget
    const currentTurn = isTrunX ? players.x : players.o
    turn++
    drawShape(currentCell, currentTurn)
    if(checkWinner(currentTurn)){
        return
    }
    if(turn == maxTurn){
        checkWinner(false)
    }
    changeTrun()
}

function drawShape(element, newClass){
    element.classList.add(newClass)
}

function changeTrun(){
    isTrunX = !isTrunX
    messageTurn.textContent = isTrunX ? "X" : "O"
}

function checkWinner(currentPlayer){
    const cells = document.querySelectorAll('.cell')

    const winner = winningPosition.some(array =>{
        return array.every(position =>{
            return cells[position].classList.contains(currentPlayer)
        })
    })

    if(!winner){
        return
    }
    
    showEndGame(true)
    return true
}

function showEndGame(winner){
    endGame.classList.add('show')
    if(winner){
        endGameResult.textContent = `${isTrunX ? "X" : "O"} ha ganado el juego!`
    }else{
        endGameResult.textContent = `¡El juego se ha empatado!`
    }
}

buttonReset.addEventListener('click', startGame)