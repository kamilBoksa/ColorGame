var game = {
    numOfSquares: 6,
    colors: [],
    pickedColor: "",
    squares: document.querySelectorAll(".square"),
    colorDisplay: document.getElementById("colorDisplay"),
    messageDisplay: document.querySelector("#message"),
    h1: document.querySelector("h1"),
    resetButton: document.querySelector("#reset"),
    modeButtons: document.querySelectorAll(".mode")
};

game.setupModeButtons = function () {
    for(var i = 0; i< game.modeButtons.length; i++) {
        game.modeButtons[i].addEventListener("click", function() {
            game.modeButtons[0].classList.remove("selected");
            game.modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? game.numOfSquares = 3: game.numOfSquares = 6;
            game.reset();
        })
    }
};

game.setupSquares = function () {
    for(var i=0; i< game.squares.length; i++) {
        game.squares[i].style.backgroundColor = game.colors[i];
        game.squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
            if(clickedColor === game.pickedColor) {
                game.messageDisplay.textContent = "Correct!";
                game.resetButton.textContent = "Play Again?";
                game.changeColors(clickedColor);
                game.h1.style.background = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                game.messageDisplay.textContent = "Try Again!";
            }
        });
    }
};

game.reset = function () {
    game.colors = game.generateRandomColors(this.numOfSquares);
    game.pickedColor = game.pickColor();
    game.colorDisplay.textContent = game.pickedColor;
    game.resetButton.textContent = "New Colors";
    game.messageDisplay.textContent = "";

    for(var i=0; i< game.squares.length; i++) {
        if(game.colors[i]) {
            game.squares[i].style.display = "block";
            game.squares[i].style.backgroundColor = game.colors[i];
        } else {
            game.squares[i].style.display = "none";
        }
    }
    game.h1.style.backgroundColor = "steelblue";
};

game.changeColors = function (color) {
    for(var i=0; i< game.colors.length; i++) {
        game.squares[i].style.backgroundColor = color;
    }
};

game.pickColor = function () {
    var random = Math.floor(Math.random() * game.colors.length);
    return game.colors[random];
};

game.init = function () {
    game.setupModeButtons();
    game.setupSquares();
    game.reset();
    game.resetButton.addEventListener("click", function() {
        game.reset();
        console.log(game.pickedColor);
    });

    game.colorDisplay.textContent = game.pickedColor;
};

game.generateRandomColors = function () {
    var arr = [];

    for(var i = 0; i < game.numOfSquares; i++) {
        arr.push(game.randomColor());
    }
    return arr;
};

game.randomColor = function () {
    var red = Math.floor(Math.random() * 256)
    var green = Math.floor(Math.random() * 256)
    var blue = Math.floor(Math.random() * 256)
    return "rgb(" + red + ", " + green + ", " + blue + ")";
};

game.init();
