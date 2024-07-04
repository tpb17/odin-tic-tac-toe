const gameboard = (function gb() {
    const arr = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    return {arr};
})();

function playTurn (board, turn) {    
    const currentBoard = board;
    
    const row = getValidMove("row") - 1;
    const col = getValidMove("column") - 1;

    if (currentBoard[row][col] == " ") {
        currentBoard[row][col] = turn;
    } else {
        console.log("Invalid move!");
        playTurn(currentBoard, turn);
    }

}

function game() {
    const board = gameboard.arr;
    let turnX = true;
    let gameState = "continue"

    while (true) {
        if (turnX) {
            playTurn(board, "X");
            turnX = false;
        } else {
            playTurn(board, "O");
            turnX = true;
        }

        displayBoard(board);
        
        gameState = checkBoard(board);
        if (gameState != "continue") {
            if (gameState == "Tie game") {
                console.log(gameState + "!");
            } else {
                console.log(gameState + " has won!");
            }
            break;
        }
    }
}

function getValidMove(direction) {
    let move = 0;

    while (move != 1 && move != 2 && move != 3) {
        move = parseInt(prompt("Select a " + direction), 0);
    }

    return move;
}

function checkBoard(board) {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== " ") {
            return board[i][0];
        }

        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== " ") {
            return board[0][i];
        }
    }

    // Check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== " ") {
        return board[0][0];
    }

    if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== " ") {
        return board[2][0];
    }

    // Check for a tie
    let noSpace = true;
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            if (board[j][k] === " ") {
                noSpace = false;
            }
        }
    }

    if (noSpace) {
        return "Tie game";
    }

    return "continue";
}

function displayBoard(board) {
    let result = "";
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            result += "[" + board[j][k] + "]";
        }
        result += "\n";
    }
    console.log(result);
}

const btn = document.getElementById("start");
btn.addEventListener("click", () => {
    game();
});