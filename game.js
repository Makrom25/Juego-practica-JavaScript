const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

const playerPosition = {
    x: undefined,
    y: undefined,
}

function startGame() {
    game.font = elementsSize - 20  + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n').map(row => row.trim().split(''))

    game.clearRect(0,0,canvasSize,canvasSize);

    mapRows.forEach((row, rowI) =>{
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

        if (col === 'O') {
            if (!playerPosition.x && !playerPosition.y) {
            playerPosition.x = posX;
            playerPosition.y = posY;
            console.log(playerPosition)
            }
        }

            game.fillText(emoji, posX, posY);
        })
    })

    
    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRows[row - 1 ][col - 1]], elementsSize * col, elementsSize * row);
    //     }
    // }

    movePlayer();
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)

function moveByKeys(event) {
    event.key==="ArrowUp"? moveUp()
    :event.key==="ArrowLeft"? moveLeft()
    :event.key==="ArrowRight"?moveRight() 
    :event.key==="ArrowDown"?moveDown()
    :console.log("Esa tecla no mueve nada");

    // if (event.key === 'ArrowUp') moveUp();
    // else if (event.key === 'ArrowLeft')  moveLeft();
    // else if (event.key === 'ArrowRight') moveRight();
    // else if (event.key ==='ArrowDown') moveDown();
    // else console.log('Esta tecla no mueve nada')
    
}

function moveUp () {
    console.log('Me muevo pa arriba');
    playerPosition.y -= elementsSize;
    startGame();
}
function moveLeft () {
    console.log('Me muevo pa la izquierda');
    playerPosition.x -= elementsSize;
    startGame();
}

function moveRight () {
    console.log('Me muevo pa la derecha');
    playerPosition.x += elementsSize;
    startGame();

}
function moveDown () {
    console.log('Me muevo pa abajo');
    playerPosition.y += elementsSize;
    startGame();

} 
function setCanvasSize() {

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10
    console.log({ canvasSize, elementsSize})
    startGame()
}   
