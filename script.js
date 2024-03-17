let turnAudio = new Audio('./assets/turn.mp3');
let gameoverAudio = new Audio('./assets/gameover.mp3');
let turn = "X";
let gameOver = false;

// Function to change the turn value
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to check for a win
const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    // [position1, position2, position3, translateX, translateY, rotate, translateX(small screens), translateY(small screens), line length]
    let wins = [
        [0, 1, 2, 2.5, 5, 0, 5, 10, 25],
        [3, 4, 5, 2.5, 15, 0, 5, 30, 25],
        [6, 7, 8, 2.5, 25, 0, 5, 50, 25],
        [0, 3, 6, -7.5, 15, 90, -15, 30, 25],
        [1, 4, 7, 2.5, 15, 90, 5, 30, 25],
        [2, 5, 8, 12.5, 15, 90, 25, 30, 25],
        [0, 4, 8, 0.5, 15, 45, 0, 30, 30],
        [2, 4, 6, -0.5, 15, 135, 0, 30, 30]
    ];
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText !== '')) {
            document.getElementsByClassName('info')[0].innerText = boxtexts[e[0]].innerText + " Won";
            gameOver = true
            gameoverAudio.play();
            drawWinLine(e);
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
        }
    })
}
// Function to draw a line through the winning combination
// Function to draw a line through the winning combination
function drawWinLine(e) {
    let line = document.querySelector('.line');
    let viewportWidth = window.innerWidth;
    let lineLength;

    // Adjust the line length based on the viewport width
    if (viewportWidth <= 700) { // For small screens
        lineLength = e[8] * 2.0;
        line.style.width = `${lineLength}vw`;
        line.style.transform = `translate(${e[6]}vw, ${e[7]}vw) rotate(${e[5]}deg)`;
    } else {
        lineLength = e[8];
        line.style.width = `${lineLength}vw`;
        line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
    }

}

// Game Logic:
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !gameOver) { // Add gameOver check here
            boxtext.innerText = turn;
            turn = changeTurn();
            draw();
            checkWin();
            if (!gameOver) {
                turnAudio.play();
                document.getElementsByClassName('info')[0].innerText = "Turn for: " + turn;
            }
        }
    })
})

// Reset Button Logic:
let reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = '';
    });
    turn === "X" ? "O" : "X";
    gameOver = false;
    document.getElementsByClassName('info')[0].innerText = "Turn for: " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0";
    document.querySelector('.line').style.width = "0";
});

// Draw Logic:
let draw = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let count = 0;
    Array.from(boxtexts).forEach(element => {
        if (element.innerText !== '') {
            count++;
        }
    });
    if (count === 9) {
        document.getElementsByClassName('info')[0].innerText = "It's a Draw!";
        gameOver = true;
        gameoverAudio.play();
    }
}




// By Github Copilot
// // Function to draw a line through the winning combination
// // JavaScript
// function drawWinLine(startBox, endBox) {
//     const line = document.querySelector('.line');
//     const startRect = startBox.getBoundingClientRect();
//     const endRect = endBox.getBoundingClientRect();
//     const angle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);
//     const length = Math.hypot(endRect.left - startRect.left, endRect.top - startRect.top);

//     line.style.width = `${length}px`;
//     line.style.transform = `rotate(${angle}rad)`;
//     line.style.left = `${startRect.left}px`;
//     line.style.top = `${startRect.top}px`;
//     line.style.visibility = 'visible';
// }

