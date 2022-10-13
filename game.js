const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

let canvasSize;
let elementsSize;
let level = 0;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
   x: undefined,
   y: undefined,
}
let enemiyPositions = []



function startGame() {
    game.font = elementsSize - 20  + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];
    if(!map) {
        gameWin();
        return;
    }

    const mapRows = map.trim().split('\n').map(row => row.trim().split(''));
    enemiyPositions = [];
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
        } else if (col == 'I') {
            giftPosition.x = posX;
            giftPosition.y = posY;

        }
         else if (col == 'X'){
            enemiyPositions.push({
                x:posX,
                y:posY,
            })
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
    const giftCollitionX = giftPosition.x.toFixed(3) === playerPosition.x.toFixed(3);
    const giftCollitionY = giftPosition.y.toFixed(3) === playerPosition.y.toFixed(3);
    const giftCollition = giftCollitionX === giftCollitionY;

    if(giftCollitionX === true && giftCollition === true){
        levelWin()
        console.log('Pasaste de nivel')
    }


    const enemyCollision = enemiyPositions.find(enemy =>{
    const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2)
    const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2)
    return enemyCollisionX && enemyCollisionY;

    })
    if (enemyCollision) {
        console.log('Chocaste con una bomba');
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}
function levelWin() {
    level++;
    startGame()
}

function gameWin () {
    console.log('ganaste el juego!');
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

    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('OUT')
    } else {
        playerPosition.y -= elementsSize;
        
    } 
    

    startGame();
}
function moveLeft () {
    console.log('Me muevo pa la izquierda');
    if((playerPosition.x - elementsSize) < elementsSize){
        console.log('OUT')
    } else {
        playerPosition.x -= elementsSize;
        
    }
    startGame();
 
}

function moveRight () {
    console.log('Me muevo pa la derecha');
    if ((playerPosition.x + elementsSize) > canvasSize){
          console.log('OUT')
    }else {
        playerPosition.x += elementsSize;
        
    }
    startGame();

}
function moveDown () {
    console.log('Me muevo pa abajo');
    if((playerPosition.y + elementsSize) > canvasSize){
        console.log('OUT')
    } else {
        playerPosition.y += elementsSize;
    }
    
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
