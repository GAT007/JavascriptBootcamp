//Game functionality
/*
-Player must guess a number between min and max
-Player gets a certain amount of guesses
-Notify player of the number of guesses remaining
-Notify the player of the correct answer if he loses
-Let the player choose to play again
*/

//Game Values
let min = 1, max = 10, winningNum = getWinningNum(min,max), guessesLeft = 3;


//In query selector use . for selecting classes and #for selecting id's
const game = document.querySelector(".game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector(".message");

//Assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;


//Play again event listener
game.addEventListener("click",function(e){
    if(e.target.className === "play-again"){
        window.location.reload();
    }
})



//Listen for guess
guessBtn.addEventListener("click",function(){
    let guess = (parseInt(guessInput.value));
    if(!guess || guess<min || guess>max){
        guessInput.value = "";
        guessInput.style.borderColor = "red";
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }
    //Check if winning number
    else if(guess === winningNum){
        gameOver(true,`${winningNum} is correct! Congratulations!`);
    }
    else {
        guessesLeft-=1;
        if(guessesLeft===0){
            //Game over - lost
            //Disable input
            gameOver(false,`You ran out of guesses. The winning number was ${winningNum}`);
        }
        else{
            //Game continues
            guessInput.value = "";
            guessInput.style.borderColor = "red";
            setMessage(`Your guess was wrong. You have ${guessesLeft} chances remaining.`, "red");
        }

    }
})


function gameOver(won, msg) {
    let color;
    won === true?color="green":color="red";
    //disable input
    guessInput.disabled = true;
    //set the border to green
    guessInput.style.borderColor = color;
    //Set message
    setMessage(msg,color);
    guessBtn.value = "Play Again!";
    guessBtn.className = "play-again";
}


function setMessage(msg,color) {
    message.style.color = color;
    message.textContent = msg;
}

function getWinningNum(min,max) {
    return Math.floor(Math.random()*(max-min+1));
}

