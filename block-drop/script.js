import Player from "./player.js";
import Enemy from "./enemy.js";
import BulletController from "./bulletController.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let points = document.getElementById('points');
let frameCount = 0
let isGameOver = false

canvas.width = 550
canvas.height = 600



const bulletController = new BulletController(canvas);
// sets player location
const player = new Player(canvas.width / 2.2, canvas.height / 1.3, bulletController)


const enemies = [
    new Enemy(500, 20, 5, 1),
];


if(!isGameOver){
    let timer = 0
    setInterval(() => {
        if(timer ===0){
            enemies.push(new Enemy(500,20, 5, 1))
        }
        timer++
        if(timer % 2 == 0 && timer != 1){
            // medium enemy
            if(points.innerHTML <= 25){
                enemies.push(new Enemy(500,20, 5, 0.6))
            }
            if(points.innerHTML >= 25 && points.innerHTML <= 125){
                enemies.push(new Enemy(500,20, 8, 0.8))
            }
            if(points.innerHTML >= 125 && points.innerHTML <= 225){
                enemies.push(new Enemy(500,20, 11, 1))
            }
            if(points.innerHTML >= 225){
                enemies.push(new Enemy(500,20, 14, 1.2))
            }
        }
        // fastest enemy, lowest health
        if(timer % 3 == 0 && timer != 1){
            if(points.innerHTML <= 50){
                enemies.push(new Enemy(500,20, 5, 1))
            }
            if(points.innerHTML >= 50 && points.innerHTML <= 150){
                enemies.push(new Enemy(500,20, 7, 1.3))
            }
            if(points.innerHTML >= 150 && points.innerHTML <= 250){
                enemies.push(new Enemy(500,20, 9, 1.4))
            }
            if(points.innerHTML >= 250){
                enemies.push(new Enemy(500,20, 11, 1.7))
            }
        }
        // slowest enemy, highest health
        if(timer % 4 == 0 && timer != 1){
            if(points.innerHTML <= 100){
                enemies.push(new Enemy(500,20, 5, 0.4))
            }
            if(points.innerHTML >= 100 && points.innerHTML <= 200){
                enemies.push(new Enemy(500,20, 10, 0.45))
            }
            if(points.innerHTML >= 200 && points.innerHTML <= 300){
                enemies.push(new Enemy(500,20, 20, 0.5))
            }
            if(points.innerHTML >= 300 && points.innerHTML <= 400){
                enemies.push(new Enemy(500,20, 30, 0.55))
            }
            if(points.innerHTML >= 400){
                enemies.push(new Enemy(500,20, 40, 0.6))
            }
        }
    }, 1000);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gameover();
    displayGameOver();
    frameCount++;
    if(!isGameOver){
        ctx.fillStyle = 'black';
        setCommonStyle();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        bulletController.draw(ctx);
        player.draw(ctx);
        enemies.forEach((enemy) =>{
            if(bulletController.collideWith(enemy)){
                if(enemy.health <= 0) {
                    const index = enemies.indexOf(enemy);
                    enemies.splice(index, 1);
                }
            }else{
            enemy.draw(ctx);
            }
        });
    }
}


function displayGameOver(){
    if(isGameOver){
        let mainText = points.innerHTML != 0 ? "your final score was " + points.innerHTML + '!' : "your final score was 0!" ;

        ctx.fillStyle = 'white';
        ctx.font = "30px Arial";
        ctx.fillText(mainText, canvas.width / 5, canvas.height / 2);
        document.getElementById("gameover-btn").style.display = "block";
    }
}


function setCommonStyle() {
    ctx.shadowColor = '#d53';
    ctx.shadowBlue = 20;
    ctx.lineJoin = 'Bevel';
    ctx.lineWidth = 5
}

function gameover(){
    enemies.forEach((enemy) =>{
        if(enemy.speedY == 0) {
            isGameOver = true
        }
    });
}


var intervalId = setInterval(gameLoop, 1000/60)
intervalId

