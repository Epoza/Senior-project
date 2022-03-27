var character = document.getElementById("character");
var game = document.getElementById("game");
var points = document.getElementById("points")
var mode = document.getElementById("mode")
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

function moveLeft(){
    var left =
    parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0) {
        character.style.left = left - 2 + "px";
    }
}

function moveRight(){
    var left =
    parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380){
        character.style.left = left + 2 + "px";
    }
}

document.addEventListener("keydown", e => {
    if(both==0) {
        both++;
        if(e.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
        }
        if(e.key==="ArrowRight"){
            interval = setInterval(moveRight, 1)
        }
    }
});

document.addEventListener("keyup", e => {
    clearInterval(interval)
    both = 0;
});

var blocks = setInterval(function(){
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("block"+(counter-1));
    points.innerHTML = counter - 5
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if(blockLastTop<400||counter==0) {
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px"
        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px"
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(characterTop <= 0){
        alert("Game over. Your final score was: "+(points.innerHTML));
        clearInterval(blocks);
        location.reload()
    }
    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        // changes mode add 
        if (points.innerHTML >= 10 && points.innerHTML <= 20){
            iblock.style.top = iblockTop - 0.5 + "px";
            ihole.style.top = iblockTop - 0.5 + "px";
            mode.innerText = 'Easy';
        }else if(points.innerHTML >= 21 && points.innerHTML <= 50){
            iblock.style.top = iblockTop - 0.6 + "px";
            ihole.style.top = iblockTop - 0.6 + "px";
            mode.innerHTML = 'Medium';
        }else if(points.innerHTML >= 51 && points.innerHTML <= 100){
            iblock.style.top = iblockTop - 0.8 + "px";
            ihole.style.top = iblockTop - 0.8 + "px";
            mode.innerHTML = 'Difficult';
        } else if(points.innerHTML >= 101 && points.innerHTML % 2 != 0 ){
            iblock.style.top = iblockTop - 1 + "px";
            ihole.style.top = iblockTop - 1 + "px";
            mode.innerText = 'Very difficult';
        }
         else {
            if (points.innerHTML >= 101){
                iblock.style.top = iblockTop - 0.7 + "px";
                ihole.style.top = iblockTop - 0.7 + "px";
                mode.innerHTML = 'Very difficult';
            } else{
                iblock.style.top = iblockTop - 0.5 + "px";
                ihole.style.top = iblockTop - 0.5 + "px";
                mode.innerHTML = 'Easy';
            }
        }

        if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove()
            ihole.remove()
        }
        if(iblockTop-20<characterTop && iblockTop>characterTop) {
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop = 0
            }
        }
    }
    if(drop==0) {
        if(characterTop < 480){
            character.style.top = characterTop + 2 + "px";
        }
    }else {
        character.style.top = characterTop - 0.5 + "px"
    }
}, 1);
