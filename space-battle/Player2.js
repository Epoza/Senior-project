export default class Player2 {

        rightPressed = false;
        leftPressed = false;
        shootPressed = false;
        
    constructor(canvas, velocity, bulletController){
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 575;
        this.width = 50;
        this.height =  48;
        this.image = new Image();
        this.image.src = "images/player2.png";

        document.addEventListener('keydown', this.keydown)
        document.addEventListener('keyup', this.keyup)
    }

    draw(ctx){
        if (this.shootPressed == true){
            this.bulletController.shoot(this.x - 3 + this.width/2, this.y + 30, 7, 10)
        }
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    collideWithWalls() {
        //left
        if (this.x < 0) {
            this.x = 0;
        }

        //right 
        if (this.x > this.canvas.width - this.width){
            this.x = this.canvas.width - this.width;
        }
    }

    move() {
        if(this.rightPressed) {
            this.x += this.velocity;
        }
        else if (this.leftPressed) {
            this.x += -this.velocity;
        }
    }

    keydown = event => {
        if(event.code == 'KeyD'){
            this.rightPressed = true;
        }
        if(event.code == 'KeyA'){
            this.leftPressed = true;
        }
        if(event.code == "KeyW"){
            this.shootPressed = true
        }
    };

    keyup = event => {
        if(event.code == 'KeyD'){
            this.rightPressed = false;
        }
        if(event.code == 'KeyA'){
            this.leftPressed = false;
        }
        if(event.code == 'KeyW'){
            this.shootPressed = false
        }
    };
}