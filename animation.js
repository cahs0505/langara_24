(() => {
    let body = document.querySelector("body");
    console.log("Running IFFE.");
    let noteTimes;
    async function getFile() {
        let file = await fetch("song1_map.txt");
        let txt = await file.text();
        noteTimes = txt.split(/[\r\t\n]/);
        noteTimes = noteTimes.filter(function (e) { return e != "" });
        for (let index = 0; index < noteTimes.length; index++) {
            noteTimes[index] = Math.round(noteTimes[index] * 100) / 100;
        }
        console.log(noteTimes);
    };
    getFile();
    let song = new Audio("Bonetrousle.mp3");
    document.addEventListener("keyup", regKey);
    let clock = document.createElement("span");

    clock.classList.add('clock');
    body.appendChild(clock);
    let playing = false;
    function regKey(e) {
        if (e.code == "Space") {
            if (!playing) {
                let noteNumber = 0;
                function countUp() {
                    if (noteNumber < noteTimes.length){
                    if (noteTimes[noteNumber] == (Math.round(((song.currentTime * 100))) / 100) || noteTimes[noteNumber] == ((Math.round(((song.currentTime * 100))) / 100) + 0.01) || noteTimes[noteNumber] == ((Math.round(((song.currentTime * 100))) / 100) - 0.01)) {
                        clock.innerHTML = ("Hit note: " + (Math.round(song.currentTime*100)/100) + "/" + noteTimes[noteNumber]);
                        noteNumber = noteNumber + 2;
                    }}
                    console.log(noteNumber);
                }
                song.play();
                let timer = setInterval(countUp, 1);
                playing = true;
            }
        }
    }
    let gameWindow = document.createElement("canvas");
    gameWindow.classList.add("game");
    gameWindow.style.margin = 0;
    gameWindow.setAttribute("height", "1080");
    gameWindow.setAttribute("width", "1920");
    gameWindow.style.background = "blanchedalmond";
    let ctx = gameWindow.getContext("2d");
    body.appendChild(gameWindow);

    window.onload = () => {

    }
})();