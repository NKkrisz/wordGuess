import { words, abc } from './words.js';

//select random word from array
//make it split to chars

let randomWord;
let lives = 5;

function createGame(){
    document.querySelectorAll(".letter").forEach(letter => letter.remove());
    createKeyboard();
    
    randomWord = words[Math.floor(Math.random() * words.length)].split("");
    lives = 5;
    for (let i = 0; i < randomWord.length; i++){
        const div = document.createElement("div");
        div.classList.add("letter");
        div.innerText = randomWord[i];
        document.querySelector("#randomWord").appendChild(div);
    }
    document.querySelector("#lives").innerText = `Lives: ${lives}`;
}

function guessLetter(letter, button){
    button.disabled = true;
    
    const indexes = [];
    for (let i = 0; i < randomWord.length; i++){
        if (randomWord[i] === letter){
            indexes.push(i);
        }
    }

    if (indexes.length === 0){
        lives--;
    } else {
        for (let i = 0; i < indexes.length; i++){
            const letters = document.querySelectorAll(".letter");
            letters[indexes[i]].classList.add("revealed");
        }
    }
    
    document.querySelector("#lives").innerText = `Lives: ${lives}`;
    
    if (lives === 0){
        alert(`Game over, the word was: ${randomWord.join("")}`);
        createGame();
    } else if (document.querySelectorAll(".revealed").length === randomWord.length){
        alert("You win!");
        createGame()
    }
}

// Create keyboard

function createKeyboard() {
    for (let i = 0; i < abc.length; i++){
        const button = document.createElement("button");
        button.innerText = abc[i];
        button.classList.add("letter");
        button.addEventListener("click", () => {
            guessLetter(abc[i], button);
        });
        document.querySelector("#keyboard").appendChild(button);
    }
}


createGame();