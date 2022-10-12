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


function startGame() {


    game.font = (elementsSize - 10) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n').map(row => row.trim().split(''))

    mapRows.forEach((row, rowI) =>{
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);
            game.fillText(emoji, posX, posY);
        })
    })

    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRows[row - 1 ][col - 1]], elementsSize * col, elementsSize * row);
    //     }
    // }
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

    startGame()
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
    :event.key==="ArrowLeft"?moveRight()
    :console.log("Esa tecla no mueve nada");

    // if (event.key === 'ArrowUp') moveUp();
    // else if (event.key === 'ArrowLeft')  moveLeft();
    // else if (event.key === 'ArrowRight') moveRight();
    // else if (event.key ==='ArrowDown') moveDown();
    // else console.log('Esta tecla no mueve nada')
    
}

function moveUp () {
    console.log('Me muevo pa arriba')
}
function moveLeft () {
    console.log('Me muevo pa la izquierda')
}

function moveRight () {
    console.log('Me muevo pa la derecha')
}
function moveDown () {
    console.log('Me muevo pa abajo')
}
