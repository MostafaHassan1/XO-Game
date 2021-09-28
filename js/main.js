var squares = [[0, 0, 0],
[0, 0, 0],
[0, 0, 0]
];

var player = "X";

function play(square, row, col) {
    //to stop clicking on the same box
    if (square.innerHTML != "")
        return;
    //change the square value
    square.innerHTML = player;

    //insert the square into the array
    squares[row][col] = player;

    if(checkWin()){
        win(player)
        return; // to stop the function because the game finished
    }
    //change the player
    changePlayer()

    checkDeadlock()
}

function changePlayer() {
    if (player == "X")
        player = "O"
    else player = "X"
}
function checkWin() {
    for (var index = 0; index < 3; index++) {
        //checks the row
        if ((squares[index][0] == squares[index][1]) && (squares[index][1] == squares[index][2]) && (squares[index][2] != 0))
            return true;

        //check the col
        if ((squares[0][index] == squares[1][index]) && (squares[1][index] == squares[2][index]) && (squares[2][index] != 0))
            return true;

    }
    // check the diagonal win
    if ((squares[0][0] == squares[1][1]) && (squares[1][1] == squares[2][2]) && (squares[2][2] != 0))
        return true;

    // check the reverse digonal win
    if ((squares[2][0] == squares[1][1]) && (squares[1][1] == squares[0][2]) && (squares[0][2] != 0))
        return true;

    //no one won
    return false;
}

function win(winner) {
    //show in the html who won
    document.getElementById("winner").innerHTML = "The winner is: " + winner

    //increase the score
    document.getElementById(winner).innerHTML = parseInt(document.getElementById(winner).innerHTML) + 1

    //reset the player
    player = "X"

    resetGame()
}
function resetGame() {
    tds = document.getElementsByTagName('td')
    //reset every square
    for (var index = 0; index < tds.length; index++) {
        tds[index].innerHTML = '';
    }

    //reset the squares array
    squares = [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
    ];

}

function checkDeadlock() {
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            if(squares[row][col] == 0)
                return false; //the game still has squares left
        }
    }
    //show a deadlocked message
    document.getElementById("winner").innerHTML = "Deadlock, The game has been reset"
    resetGame()// the game has deadlocked and there is no empty square
}