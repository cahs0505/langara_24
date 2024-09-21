(() => {
    let body = document.querySelector("body");
    console.log("Running IFFE.");
    let noteTimes;
    async function getFile() {
        let file = await fetch("song1_map.txt");
        let txt = await file.text();
        noteTimes = txt.split(/[\r\t\n]/);
        noteTimes = noteTimes.filter(function (e) { return e != "" });
        console.log(noteTimes);
    };
    getFile();
    let song = new Audio("Bonetrousle.mp3");
    document.addEventListener("keyup", regKey);
    let playing = false;
    let currTime = 0;
    let noteNumber = 0;
    function regKey(e) {
        if (e.code == "Space") {
            if (!playing) {
                function countUp() {
                    currTime++;
                    if (noteTimes.includes(currTime / 1000)) {
                        console.log("Hit note: " + currTime + "/" + noteTimes[noteNumber]);
                        noteNumber++;
                    }
                    console.log(song.currentTime);
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