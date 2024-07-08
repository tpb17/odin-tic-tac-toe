const gameboard = (function gb() {
    const grid = document.getElementById("board");

    for (let i = 0; i < 9; i++) {
        let tempdiv = document.createElement("div");
        tempdiv.classList.add("gridSpace");
        grid.appendChild(tempdiv);
    };

    const arr = document.getElementsByClassName("gridSpace");

    return {grid, arr};
})();

function game() {
    const board = gameboard.arr;
    let turnX = true;
    let gameState = "continue"
    let gameOver = false;

    function playTurn (turn) {    
        const gridArr = gameboard.arr;
        for (let i = 0; i < gridArr.length; i++) {
            gridArr[i].classList.remove("clickable");
            gridArr[i].removeEventListener("click", gridArr[i].clickHandler);
        }

        function clickHandler(i, j, whoseTurn) {
            const index = i*3 + j
            if (gameboard.grid.children[index]) {
                board[index] = whoseTurn;
            }
        }
    
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const gridSpace =  gameboard.grid.children[i*3 + j];
                if (gridSpace.textContent == "") {
                    gridSpace.classList.add("clickable");
                    gridSpace.addEventListener("click", clickHandler(i, j, turn));
                }
            }
        }
    }

    function playRound() {
        let loc;
        if (!gameOver) {
            if (turnX) {
                playTurn("X");
                turnX = false;
            } else {
                playTurn("O");
                turnX = true;
            }

            displayBoard(board);
            
            gameState = checkBoard(board);
            if (gameState != "continue") {
                gameOver = true;
                if (gameState == "Tie game") {
                    console.log(gameState + "!");
                } else {
                    console.log(gameState + " has won!");
                }
            } else {
                setTimeout(playRound, 1); 
            }
        }
    }

    playRound();
}

function getValidMove(direction) {
    let move = 0;

    while (move != 1 && move != 2 && move != 3) {
        move = parseInt(prompt("Select a " + direction), 0);
    }

    return move;
}

function checkBoard(boardArr) {
    const board = [
        [],
        [],
        []
    ];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = boardArr[i*3 + j];
        }
    }

    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
            return board[i][0];
        }

        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
            return board[0][i];
        }
    }

    // Check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
        return board[0][0];
    }

    if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== "") {
        return board[2][0];
    }

    // Check for a tie
    let noSpace = false;
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            if (board[j][k] == "X" || board[j][k] == "O") {
                noSpace = true;
            }
        }
    }

    if (noSpace) {
        return "Tie game";
    }

    return "continue";
}

function displayBoard(board) {
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            const gridSpace = gameboard.grid.children[j*3 + k];
            gridSpace.textContent = board[j][k];
        }
    }
}

const btn = document.getElementById("start");
btn.addEventListener("click", () => {
    game();
});

