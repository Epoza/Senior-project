import Player1 from "./Player.js";
import Player2 from "./Player2.js";
import bulletController from "./BulletController.js";
import bulletController2 from "./BulletController2.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

let player1Points = 0;
let player2Points = 0;

const background = new Image();
background.src = 'images/space.png';

const player1BulletController = new bulletController(canvas, 5, "red", true)
const player2BulletController = new bulletController2(canvas, 5, "blue", true)
const player1 = new Player1(canvas, 3, player1BulletController, player2BulletController);
const player2 = new Player2(canvas, 3, player2BulletController);

let isGameOver = false;
let whoWon = false;

function game(){
    checkForPoint();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if(!isGameOver){
        player1.draw(ctx);
        player2.draw(ctx);
        player1BulletController.draw(ctx);
        player2BulletController.draw(ctx);
        ctx.fillStyle = "white"
        ctx.font = "20px Arial"
        ctx.fillText("Points: " + player1Points, canvas.width - 590, canvas.height - 10)
        ctx.fillText("Points: " + player2Points, canvas.width - 590, canvas.height - 575)
    }
}

function checkForPoint(){
    if(isGameOver) {
        return;
    }

    if(player1BulletController.collideWith(player2)){
        player1Points++;
        if (player1Points === 5){
            isGameOver = true;
        }
    }
    if(player2BulletController.collideWith(player1)){
        player2Points++;
        if (player2Points === 5){
            whoWon = true;
            isGameOver = true;
        }
    }
}

function displayGameOver(){
    if(isGameOver){
        let mainText = whoWon ? "Player 2 Wins!" : "Player 1 Wins!";
        let mainTextOffset = 8;
        let winColor =  whoWon ? "blue" : "red"

        ctx.fillStyle = winColor;
        ctx.font = "70px Arial";
        ctx.fillText(mainText, canvas.width / mainTextOffset, canvas.height / 2);
        ctx.fillStyle = "white"
        ctx.font = "25px Arial";
        ctx.fillText("Player 1 Points: " + player1Points, canvas.width / 2.8, canvas.height / 1.4)
        ctx.fillText("Player 2 Points: " + player2Points, canvas.width / 2.8, canvas.height / 4.5)
    }
}


setInterval(game, 1000/60);
