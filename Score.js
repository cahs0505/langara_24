let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

function points (x){
    this.x = x;
}

var x = 0;
const row = 0;
const target = 0;
let notePoints = new points(x);

var count = 0;


var songLength = 58;
var countDown = 0;
function drawTarget(){
    let pic = new Image();
    pic.src = "";
    ctx.drawImage(pic, target, row);
}

function drawNote(){
    let pic = new Image();
    pic.src = "";
    ctx.drawImage(pic, notePoints.x, row);
}

function checkCollision(){
    if (notePoints.x == target){
        return true;
    }
    else {
        return false;
    }
}

function pointCalculator(e){
    if (e.keyCode === 32){
        var valid = checkCollision();
        if (valid == true){
            count++;
        }
        else{
            count--;
            loseCon();
        }

    }
}
    


let timer = undefined;
function startProgram(){
    if (timer == undefined){
        timer == setInterval(executeProgram, 100);
    }
}

function stopProgram(e){
    if (e.keyCode == 69){
        clearInterval(timer);
        timer = undefined;
    }
    
}

function executeProgram(){
    if (count > -3 ){}

    if (count == -3){
        alert("Game over, you loose");
        stopProgram(e.keyCode = 69);
    }
    if(countDown == songLength){
        stopProgram(e.keyCode = 69);
        ctx.clearRect(0,0, 400, 600);
        
        let score = (count/197)*100;
        if (score < 40 ){
            
        }
        else if (score < 60){}
        else if (score < 80){}
        else if (score < 100){}
        else{}
    }
}

document.addEventListener("keyup", stopProgram(e))
document.addEventListener("keydown", pointCalculator(e));