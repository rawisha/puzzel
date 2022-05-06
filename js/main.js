import words from './gameWords.js';
import validKey from "./validKeys.js"
import wordValidator from "./apiChecker.js"


const startText = document.getElementById('start-word')
const endText = document.getElementById('end-word')
const wordBoxes = document.querySelector(".word-boxes")

let apiWords,startWord,endWord,currentWord, boxIndex
let keyWait = false

createBox()

// needs to be below createBox function inorder to access the class once its created.
const boxes =  document.querySelectorAll('.word-box')


// function to create the boxes and pick a 
// random word from the Wordlist

function createBox(){
    
    apiWords = words[Math.floor(Math.random() * words.length )] // randomize the pick from the wordlist
    startWord = apiWords.start.split('') // split out the words so you get f,o,u,r
    endWord = apiWords.end // set the endword to the wordlists .end 
    currentWord = startWord // set the current word to our starting point
    
    
    // creating x amount of boxes based on x amount of latters
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


// function to inilize the game
// loop over boxes length and match the innerHtml to the startWord
// set Start Word and End word to match 

function startGame() {
    for(let i = 0; i < boxes.length; i++){
        boxes[i].innerHTML = startWord[i]
    }
    startText.innerHTML = `Start word: ${apiWords.start}`;
    endText.innerHTML = `End word: ${apiWords.end}`

}

// loop over each boxes and add a click event
// once a box / new box is pressed, the remeveSelect function goes off first
// get the attribuite of box-data and set the keyWait to true
// add the "Selected class to the box"

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


// event listiner for key press 
// check so a key is needed to be pressed otherwise dont run

window.addEventListener('keyup', async e => {
    if(!keyWait) return //  run only when key is waiting to be pressed
    const key = e.key.toLocaleUpperCase(); // turn the pressed key to uppercase

    if(currentWord[boxIndex] === key) return // stop if pressed key is a valid one
    
    if(validKey(key)){
        const enteredWord = [...currentWord] // spread out
        enteredWord[boxIndex] = key // match it with key

        const isValid = await wordValidator(enteredWord) //validate the word against the API
        renderWords(isValid, key, enteredWord) // send the data to renderWords function
        winChecker() // once a key validation has been passed, check if the puzzle is finished
        removeSelect(); // remove the select class 
    }

})



// function to render out the pressed key if it is a valid english word

function renderWords(isValid, key,word) {
    word = word.join('').toLowerCase(); // join the words and turn it into lower case
    console.log("valid or no " + isValid);
    if(isValid){
        currentWord = [...currentWord] // spread it out otherwise Read only error will encour
        currentWord[boxIndex] = key // match it with the key
        boxes[boxIndex].innerHTML = key // change the result for the currenct box with the valid entered key
    }else {
        console.log("wrong answer");
    }
}



// function to check for a winning puzzle

function winChecker() {
    const start = currentWord.join('') // join the words
    const end = endWord 

    if(start === end){ // check if start( current data) is equal to endWord, If match then puzzle is finished otherwise keep on going.
       alert("Winner Winner Chicken Dinner!!")
       location.reload();
    }else{
        console.log("keep going");
    }
}