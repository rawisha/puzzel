import words from './gameWords.js';
import validKey from "./validKeys.js"
import wordValidator from "./apiChecker.js"


const startText = document.getElementById('start-word')
const endText = document.getElementById('end-word')
const wordBoxes = document.querySelector(".word-boxes")
let guess = []

let apiWords,startWord,endWord,currentWord, boxIndex
let keyWait = false

createBox()

const boxes =  document.querySelectorAll('.word-box')

function createBox(){
    
    apiWords = words[Math.floor(Math.random() * words.length )]
    startWord = apiWords.start.split('')
    endWord = apiWords.end
    currentWord = startWord
    
    
    // creating x amount of boxes based on amount of latters
    // in our startWord

        for(let l = 0; l < startWord.length; l++ ){
            var div = document.createElement('div');
            div.innerHTML = startWord[l]
            div.className = 'word-box';
            div.setAttribute('box-data', l)
            wordBoxes.append(div)
        } 
        
}

startGame()

function startGame() {
    for(let i = 0; i < boxes.length; i++){
        boxes[i].innerHTML = startWord[i]
    }
    startText.innerHTML = `Start word: ${apiWords.start}`;
    endText.innerHTML = `End word: ${apiWords.end}`

}

boxes.forEach(box => box.addEventListener('click', e => {
    removeSelect()
    boxIndex = e.target.getAttribute('box-data')  
    keyWait = true
    boxes[boxIndex].classList.add('selected')
}))


// remove selected class from the box
function removeSelect() {
    for(let i = 0; i < boxes.length; i++){
        boxes[i].classList.remove("selected")
    }
    keyWait = false
}

window.addEventListener('keyup', async e => {
    if(!keyWait) return //  run only when key is waiting to be pressed
    const key = e.key.toLocaleUpperCase();

    if(currentWord[boxIndex] === key) return
    
    if(validKey(key)){
        const enteredWord = [...currentWord]
        enteredWord[boxIndex] = key

        const isValid = await wordValidator(enteredWord)
        renderWords(isValid, key, enteredWord)
        winChecker()
        removeSelect();
    }

})


function renderWords(isValid, key,word) {
    word = word.join('').toLowerCase();
    console.log("valid or no " + isValid);
    if(isValid){
        guess.push(" " +  word)
        currentWord = [...currentWord]
        currentWord[boxIndex] = key
        boxes[boxIndex].innerHTML = key
    }else {
        console.log("wrong answer");
    }
}

function winChecker() {
    const start = currentWord.join('')
    const end = endWord

    if(start === end){
       alert("Winner Winner Chicken Dinner!!")
       location.reload();
    }else{
        console.log("keep going");
    }
}