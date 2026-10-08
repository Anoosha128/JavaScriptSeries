let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () =>{
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const showWinner = (userWin, userChoice, compChoice ) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.background = "green";
    }
    else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = "You lose!";
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        msg.style.background = "red";
    }
}

const drawGame = () =>{
    msg.innerText = "Game was Draw. Play again.";
    msg.style.background = "#081b31";
}

const playGame = (userChoice) =>{
    const compChoice = genCompChoice();

    if(userChoice === compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice === "rock"){
            // scissors, paper
            userWin = compChoice === "paper" ? false : true;
        }
        // rock, scissors
        else if(userChoice === "paper"){
            userWin = compChoice === "scissors" ? false : true;
        }
        else{
            //rock, paper
           userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);

    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice= choice.getAttribute("id");
        playGame(userChoice);

    });
});








































