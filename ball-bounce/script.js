var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
const HEIGHT = canvas.height
const WIDTH = canvas.width


//player
const square = {
    canvasPos : getPosition(canvas),
    mouseX : 0, // mouse x-axis position
    mouseY : 0,// mouse y-axis position
    sqSize : 30 // dimensions(used for height & width)
}

// enemy
var ballList = {}


function Ball(id, ballRadius, x, y, color, dx, dy){
    var ball3 = {
        ballRadius : ballRadius, // size
        x : x, // starting x
        y : y, // starting y
        color : color,
        dx : dx, 
        dy : dy,
        id:id
    };
    ballList[id] = ball3
}

function randomlyGenerateBall() {
    var id = Math.random()
    var ballRadius = 10 + Math.random() * 5; // size
    var x = WIDTH / 2; // starting x
    var y = HEIGHT / 2; // starting y
    var color = "#0095DD";
    var dx = 2 - Math.random() * 10;
    var dy = 2 + Math.random() * -10;
    Ball(id, ballRadius, x, y, color, dx, dy);
}

var isGameOver = false

function RectCircleCollision(balls) {
    var collisionDistX = Math.abs(balls.x - square.mouseX-square.sqSize/2);
    var collisionDistY = Math.abs(balls.y - square.mouseY-square.sqSize/2);

    if(collisionDistX > (square.sqSize/2 + balls.ballRadius)) {return false;}
    if(collisionDistY > (square.sqSize/2 + balls.ballRadius)) {return false;}

    if (collisionDistX <= (square.sqSize/2)) {
        isGameOver = true
    }
    if (collisionDistY <= (square.sqSize/2)) {
        isGameOver = true
    }
    var cornerCollisionX =  collisionDistX - square.sqSize/2;
    var cornerCollisionY =  collisionDistY - square.sqSize/2;
    return (cornerCollisionX*cornerCollisionX+cornerCollisionY*cornerCollisionY<=(balls.ballRadius*balls.ballRadius));
}


canvas.addEventListener("mousemove", setMousePosition, false);

function setMousePosition(e) {
    square.mouseX = (e.clientX - square.canvasPos.x) - (square.sqSize / 2);
    square.mouseY = (e.clientY - square.canvasPos.y) - (square.sqSize / 2);
}


function getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;
   
    while (el) {
        xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        el = el.offsetParent;
    }
    return {
        x: xPosition,
        y: yPosition
    };
}   
// square doesnt go through canvas
function mouseBoundaryCheck(){
    // up
    if(square.mouseY < square.sqSize - 30){ // -30 because of cursor
        square.mouseY = square.sqSize - 30
    }
    //down
    if(square.mouseY>HEIGHT-square.sqSize){
        square.mouseY = HEIGHT - square.sqSize;
    }
    //left
    if(square.mouseX<square.sqSize - 30){
        square.mouseX = square.sqSize - 30;
    }
    //right
    if(square.mouseX>WIDTH-square.sqSize){
        square.mouseX = HEIGHT - square.sqSize;
    }
}



function updateEntity(something){
    ctx.beginPath();
    if(something != square){
        ctx.arc(something.x, something.y, something.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = something.color;
    }
    if(something == square){
        ctx.rect(square.mouseX, square.mouseY, square.sqSize, square.sqSize);
        ctx.fillStyle = "#bf1111";
    }
    ctx.fill();
    ctx.closePath();

    if(something != square){
        if(something.x + something.dx > canvas.width-something.ballRadius || something.x + something.dx < something.ballRadius) {
            something.dx = -something.dx;
        }
        if(something.y + something.dy > canvas.height-something.ballRadius || something.y + something.dy < something.ballRadius) {
            something.dy = -something.dy;
        }
        
        something.x += something.dx;
        something.y += something.dy;
    }
}


let score = 0

setInterval(() => {
    if(score ===0){
        randomlyGenerateBall()
    }
    score++
    if(score % 4 == 0 && score != 1){
        randomlyGenerateBall()
    }
}, 1000);

function drawScore(){
    ctx.fillStyle = 'red'
    ctx.font = '30px PT Sans Narrow'
    ctx.fillText('score: ' + score, WIDTH/2-30, 25)
}

function displayGameOver(){
    if(isGameOver){
        let mainText = "your score final score was " + score + '!';

        ctx.fillStyle = 'white';
        ctx.font = "30px Arial";
        ctx.fillText(mainText, WIDTH / 6, HEIGHT / 2);
        document.getElementById("restartButton").style.display = "block";
    }
}



function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    displayGameOver()
    if(!isGameOver) {
        mouseBoundaryCheck();
        for(var key in ballList){ // E1, E2
            updateEntity(ballList[key]);

            RectCircleCollision(ballList[key])
        }
        updateEntity(square);
        drawScore();
        requestAnimationFrame(draw)
    }
}

draw()