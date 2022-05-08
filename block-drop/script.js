import Player from "./player.js";
import Enemy from "./enemy.js";
import BulletController from "./bulletController.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let points = document.getElementById('points');
let frameCount = 0

canvas.width = 550
canvas.height = 600



const bulletController = new BulletController(canvas);
// sets player location
const player = new Player(canvas.width / 2.2, canvas.height / 1.3, bulletController)

const enemies = [
    new Enemy(500, 20, "green", 5, 1),
    new Enemy(500, 20, "red", 5, 1),
    new Enemy(500, 20, "gold", 5, 1),
    new Enemy(500, 20, "green", 5, 1),
    new Enemy(500, 20, "gold", 10, 1),
    new Enemy(500, 100, "green", 10, 1),
    new Enemy(500, 100, "red", 10, 1),
    new Enemy(500, 100, "gold", 20, 1),
    new Enemy(500, 100, "green", 20, 1),
    new Enemy(500, 100, "gold", 20, 1),
];


function gameLoop() {
        setCommonStyle();
    frameCount++;
    ctx.fillStyle = 'black';
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

function setCommonStyle() {
    ctx.shadowColor = '#d53';
    ctx.shadowBlue = 20;
    ctx.lineJoin = 'Bevel';
    ctx.lineWidth = 5
}
var intervalId = setInterval(gameLoop, 1000/60)
intervalId

