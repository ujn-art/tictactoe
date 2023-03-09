const playerOneScore = document.querySelector("#playerOneScore")
const playerTwoScore = document.querySelector("#playerTwoScore")
const board = document.querySelector('#board')
// winning pattern 
const pattern = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]
if(!localStorage.getItem('playerOne') && !localStorage.getItem('playerOne')){
    localStorage.setItem('playerOne', 0)
    localStorage.setItem('playerTwo', 0)
}
playerOneScore.innerHTML = localStorage.getItem('playerOne')
playerTwoScore.innerHTML = localStorage.getItem('playerTwo')
let playerTurn = true
// creating cells using javascript 
function createCells(){
    const playerOne = document.querySelector('#playerOne').style.color = 'green'
    const playerTwo = document.querySelector('#playerTwo').style.color = 'red'
    for(let i = 0; i < 9; i++){ // loop 9 times
        const square = document.createElement('div') 
        square.classList.add('square') // add square class in div
        square.id = i // adding id in div
        board.append(square) // append the square in board div
    }
    const cells = document.querySelectorAll('.square')
    cells.forEach((cell) => {
        cell.addEventListener('click', turn)
    })
}
// call the createCells
createCells()
function turn(e){
    const img = document.createElement('img')
    const playerOne = document.querySelector('#playerOne')
    const playerTwo = document.querySelector('#playerTwo')
    if(playerTurn){ // if playerTurn is true player one turn
        img.src = 'circle.png'
        e.target.append(img)
        playerTurn = false // making the playerturn false to make player two turn
        e.target.removeEventListener('click', turn)
        playerOne.style.color = 'red'
        playerTwo.style.color = 'green'
    }else{
        img.src = 'x.png'
        e.target.append(img)
        playerTurn = true
        e.target.removeEventListener('click', turn)
        playerOne.style.color = 'green'
        playerTwo.style.color = 'red'
    }
    checkWinner()
}
const msgBox = document.querySelector('.message-box') // message box

// Checking the pattern 
function checkWinner(){
    const square = document.querySelectorAll('.square') // get all the div with square class
    const squareArray = Array.from(square) // convert the  square object in to array
    const msg = document.querySelector('.message')
    // loop the pattern
    pattern.forEach((cells) => { 
        if( cells.every(cell => square[cell].firstChild?.getAttribute('src') === 'circle.png')){ // check every square if has a childNode and has an attribure of circle.png
            let playerOne = parseInt(localStorage.getItem('playerOne') )+ 1 // add a score in to localstorage
            localStorage.setItem("playerOne", playerOne) // set the new score in local storage
            playerOneScore.innerHTML = localStorage.getItem('playerOne') // get the score and display it using innerHTML
            playerTwoScore.innerHTML = localStorage.getItem('playerTwo')
            square.forEach(cell => cell.removeEventListener('click', turn)) // if some win the match it will remove all eventlistener
            msg.innerHTML = "Player One Win!"
            msgBox.style.display = 'block' // change the display to block 
        }
        else if(cells.every(cell => square[cell].firstChild?.getAttribute('src') === 'x.png')){
            let playerTwo = parseInt(localStorage.getItem('playerTwo') )+ 1
            localStorage.setItem("playerTwo", playerTwo)
            playerOneScore.innerHTML = localStorage.getItem('playerOne')
            playerTwoScore.innerHTML = localStorage.getItem('playerTwo')
            square.forEach(cell => cell.removeEventListener('click', turn))
            msg.innerHTML = "Player Two Win!"
            msgBox.style.display = 'block'
        }else{
            if(squareArray.every(cell => cell.hasChildNodes())){ // check if all the square already have childnodes
                msg.innerHTML = 'Draw!'
            }
        }
    })   
   
}
// New Round 
function newRound(){
    msgBox.style.display = 'none'
    board.innerHTML = ''
    createCells()
    playerTurn = true
}
// Reset the score
function reset(){
    msgBox.style.display = 'none' 
    board.innerHTML = ''
    createCells()
    localStorage.setItem('playerOne', 0)
    localStorage.setItem('playerTwo', 0)
    playerOneScore.innerHTML = localStorage.getItem('playerOne')
    playerTwoScore.innerHTML = localStorage.getItem('playerTwo')
}
