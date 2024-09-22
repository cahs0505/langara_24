let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

function points (y){
    this.y = y;
}

var y = 0;
const column = 960;
const target = 1060;
let notePoints = new points(y);

var count = 0;


var songLength = 58;
var startTime = Date.now();

function drawBackground(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let pic = new Image();
    pic.src = "";
    ctx.drawImage(pic, canvas.width, canvas.height)
}
function drawTarget(){
    let pic = new Image();
    pic.src = "";
    ctx.drawImage(pic, column, target);
}

function drawNote(){
    let pic = new Image();
    pic.src = "";
    ctx.drawImage(pic, column, notePoints.y);
}

function drawStreak(){
    ctx.font = "40pt Comic Sans MS"
    ctx.fillText("Streak: "+count, 1900, 80)
}

function redraw(){
    drawBackground();
    drawNote();
    drawTarget();
    drawStreak();
}
function checkCollision(){
    if (notePoints.y == target){
        return 0;
    }
    else if(notePoints.y >= target) {
        return -1;
    }
    else{
        return 1;
    }
}

function pointCalculator(e){
    if (e.keyCode === 32){
        var valid = checkCollision();
        if (valid == 0){
            count ++;
        }
        else if(valid == -1){
            count--;
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
    if (count > -20  && (Date.now()-startTime)/1000 < songLength){
        notePoints.y+=20;
        redraw();
    }
    if (count == -20){
        stopProgram(e.keyCode = 69);
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.font="90pt Comic Sans MS";
        ctx.fillText("You Lose",960, 540);
    }
    if((Date.now()-startTime)/1000 == songLength){
        
        let score = (count/197)*100;
        if (score < 40 ){
            stopProgram(e.keyCode = 69);
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.font="90pt Comic Sans MS";
            ctx.fillText("Congratulations, You earned a D rank, you have hit "+count+"/197 notes",960, 540);
        }
        else if (score < 60){
            stopProgram(e.keyCode = 69);
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.font="90pt Comic Sans MS";
            ctx.fillText("Congratulations, You earned a C rank, you have hit "+count+"/197 notes",960, 540);       
        }
        else if (score < 80){
            stopProgram(e.keyCode = 69);
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.font="90pt Comic Sans MS";
            ctx.fillText("Congratulations, You earned a B rank, you have hit "+count+"/197 notes",960, 540);
        }
        else if (score < 100){
            stopProgram(e.keyCode = 69);
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.font="90pt Comic Sans MS";
            ctx.fillText("Congratulations, You earned a A rank, you have hit "+count+"/197 notes",960, 540);
        }
        else{
            stopProgram(e.keyCode = 69);
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.font="50pt Comic Sans MS";
            ctx.fillText("Congratulations, You earned a S rank, Flawless Score",960, 540);
        }
    }
}

document.addEventListener("keyup", stopProgram(e))
document.addEventListener("keydown", pointCalculator(e));
