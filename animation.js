(() => {
    let body = document.querySelector("body");
    console.log("Running IFFE.");
    async function getFile() { let file = await fetch("song1_map.txt"); 
        let txt = await file.text();
        console.log(txt);
    };
    getFile();
    let gameWindow = document.createElement("div");
    gameWindow.classList.add("game");
    let ctx = document.querySelector(".game").getContext("2d");
    body.appendChild(gameWindow);
})();