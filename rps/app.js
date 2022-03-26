let randomSelection = 0
const displayPlayer = document.getElementById('player-choice')
let playerSelection
let computerSelection
let result
let winner
const displayComputer = document.getElementById('computer-choice')
const displayResult = document.getElementById('result')
let computerPoints = 0
let playerPoints = 0
const displayPlayerPoints = document.getElementById('player-points')
const displayComputerPoints = document.getElementById('computer-points')
const displayWinner = document.getElementById('winner-text')
const open = document.getElementById('open') 
const modalContainer = document.getElementById('modal-container') 
const closeButton = document.getElementById('close-button')


// Get a random number for computer
function computerPlay() {
    let randomSelection = Math.floor(Math.random()*3);
    if (randomSelection === 0){
        computerSelection = 'rock';
    }
    else if (randomSelection === 1){
        computerSelection = 'paper';
    }
    else if (randomSelection === 2){
        computerSelection = 'scissors';
    }
    displayComputer.innerHTML = computerSelection
}

function playRound(playerSelection, computerSelection){

    if (computerPoints != 5 && playerPoints != 5){
        if (computerSelection === 'rock' && playerSelection === 'scissors' || computerSelection === 'paper' && playerSelection === 'rock' || computerSelection === 'scissors' && playerSelection === 'paper'){
            computerPoints += 1;
            result = `You Lose, ${computerSelection} beats ${playerSelection}!`;
        }
        else if (computerSelection === 'rock' && playerSelection === 'paper' || computerSelection === 'paper' && playerSelection === 'scissors' || computerSelection === 'scissors' && playerSelection === 'rock'){
            playerPoints += 1;
            result = `You Win, ${playerSelection} beats ${computerSelection}!`;
        }
        else if (computerSelection == playerSelection){
            result = `Tie, you both chose ${playerSelection}!`;
        }
        else{
            result = 'That is not a valid option, please try again.'
        }
    }
    else{
        if (playerPoints > computerPoints){
            winner = `WINNER WINNER, you had ${playerPoints} points and the computer had ${computerPoints} points!`
        }
        else{
            winner = `Aww you lost, you had ${playerPoints} points and the computer had ${computerPoints} points!`
        }
        displayWinner.innerHTML = winner
        // Show the modal when game is over
        modalContainer.classList.add('show')

        // close the modal when clicked
        closeButton.addEventListener('click', () => {
            location.reload()
            modalContainer.classList.remove('show')
        })
    }
    displayResult.innerHTML = result
    displayPlayerPoints.innerHTML = playerPoints
    displayComputerPoints.innerHTML = computerPoints
}


    // Show the modal when game is over
    open.addEventListener('click', () => {
        modalContainer.classList.add('show')
    })

    // close the modal when clicked
    closeButton.addEventListener('click', () => {
        modalContainer.classList.remove('show')
    })

    // Listen for button click then display it
const buttons = document.querySelectorAll('.button')

buttons.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    playerSelection = e.target.id
    displayPlayer.innerHTML = playerSelection
    computerPlay()
    playRound(playerSelection, computerSelection)
}))