export default class Enemy{

    constructor(x, y, color, health, speedY){
        //this.x = x;
        this.x = Math.floor(Math.random() * x) + 1;
        this.y = y;
        this.color = color;
        this.health = Math.floor(Math.random() * health) + 1;
        this.speedY = speedY
        this.width = 50;
        this.height = 50;
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        if(this.health > 1){
            ctx.strokeStyle = 'white'
        }else {
            ctx.strokeStyle = this.color
        }

        if (this.y <= 600) {
            this.y += this.speedY
        }else{
            this.speedY = 0
        }

        if(this.speedY <= 0) {
            document.getElementById("gameover-btn").style.display = "block";
        }

        

        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        //Draw Text
        ctx.fillStyle = 'black';
        ctx.font = '25px Arial';
        ctx.fillText(this.health, this.x +this.width/3.5, this.y+this.height/1.5)
    }

    takeDamage(damage){
        this.health -= damage
    }
    
}