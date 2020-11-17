var finalStatus = document.querySelector("h2");

//"X" will be always first
var currentPlayer = "X";

//Game will be statred with blank sqaures
var canvasValue = ["", "", "", "", "", "", "", "", ""];

var gameContinue = true;

document.querySelectorAll('.can ').forEach(element => element.addEventListener('click', canClick));

document.querySelector("button").addEventListener('click', resetGame);

function updateValue(index, cell) {
    canvasValue[index] = currentPlayer;
    cell = cell.getContext('2d');
    cell.font = '50px serif';
    cell.textAlign = "center";
    cell.fillText(currentPlayer, 150, 100);
}

function changeTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
}

const winSituation = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Goal
function checkWinner() {
    var win = false;
    for (var i = 0; i < 8; i++) {
        var a = canvasValue[winSituation[i][0]];
        var b = canvasValue[winSituation[i][1]];
        var c = canvasValue[winSituation[i][2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            win = !win;
            break;
        }
    }
    if (win) {
        //Win message
        finalStatus.innerHTML = 'Winner: ' + currentPlayer;
        gameContinue = false;
        return;
    }
    //Tie situation
    if (!canvasValue.includes("")) {
        gameContinue = false;
        //Alert will happen first and then game will be restarted.
        setTimeout(function() {
            alert("Tie!! Game will be restarted", location.reload());
        }, 100);
    }
    changeTurn();
}

function canClick(can) {
    var cell = can.target;
    var index = parseInt(cell.getAttribute('data-cell-index'));
    if (canvasValue[index] !== "" || !gameContinue) {
        return;
    }
    updateValue(index, cell);
    checkWinner();
}

function resetGame() {
    location.reload();
}