const a1 = document.querySelector('#a1')
const a2 = document.querySelector('#a2')
const a3 = document.querySelector('#a3')
const b1 = document.querySelector('#b1')
const b2 = document.querySelector('#b2')
const b3 = document.querySelector('#b3')
const c1 = document.querySelector('#c1')
const c2 = document.querySelector('#c2')
const c3 = document.querySelector('#c3')
const pattern1 = [a1, a2, a3]
const pattern2 = [b1, b2, b3]
const pattern3 = [c1, c2, c3]
const pattern4 = [a1, b1, c1]
const pattern5 = [a2, b2, c2]
const pattern6 = [a3, b3, c3]
const pattern7 = [a1, b2, c3]
const pattern8 = [c1, b2, a3]
const playerOne = [1, 3, 5, 7, 9]
const turnModal = document.getElementById('turnModal')
const resultModal = document.getElementById('resultModal')
const arr = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7, pattern8]
const draw = [a1, a2, a3, b1, b2, b3, c1, c2, c3]
const turnMs = document.getElementById('turnMs')
const resultMs = document.getElementById('resultMs')
let turn = 1 // count of turns per player
// add img to the div element
function addfunc(value) {
    const row = document.getElementById(value)
    if (row.hasChildNodes()) {
        console.log('yes')
    } else {
        const img = document.createElement('img')
        if (playerOne.includes(turn)) {
            
            img.src = 'circle.png'
            row.appendChild(img)
            turnMs.innerText = 'Player Two Turn!'
            turnModal.classList.remove('close')
            turn++
        } else {
            img.src = 'x.png'
            row.appendChild(img)
            turnMs.innerText = 'Player One Turn!'
            turnModal.classList.remove('close')
            turn++
        }
    }
    // check every pattern 
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].every((row) => { return row.hasChildNodes() })) { // check if every div has the child nodes
            if (arr[i].every((row) => { return row.firstElementChild.getAttribute('src') == 'circle.png' })) {
                console.log('player one wins')
                resultMs.innerText = 'Player One Wins!'
                resultModal.classList.remove('close')
                turnModal.classList.add('close')
                break
            } else if (arr[i].every((row) => { return row.firstElementChild.getAttribute('src') == 'x.png' })) {
                console.log('player two wins')
                resultMs.innerText = 'Player Two Wins!'
                resultModal.classList.remove('close')
                turnModal.classList.add('close')
                break
            }else{
                if (draw.every((row) => { return row.hasChildNodes() })) {
                    resultMs.innerText = 'Draw!'
                    resultModal.classList.remove('close')
                    turnModal.classList.add('close')
                }
            }
        }
    }

}
// remove the every img element in document
function closeTurn() {
    turnModal.classList.add('close')
}
function reset() {
    const img = document.querySelectorAll('img');
    img.forEach(element => element.remove())
    turn = 1
    resultModal.classList.add('close')
}