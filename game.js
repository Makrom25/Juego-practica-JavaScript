const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const hearts = document.querySelector('#lives');
const time = document.querySelector('#time');
const record = document.querySelector('#record');
const pResult = document.querySelector('#result');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

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
    game.font = elementsSize - 10  + 'px Verdana';
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
    showRecord();
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
        levelFail()
        console.log('Chocaste con una bomba');
    }

   

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function showLives() {
    hearts.innerText = (emojis['HEART'].repeat(lives));
    startGame();

}

function stopWatch() {
    time.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    record.innerText = localStorage.getItem('record_time')
}

function setRecord() {
    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if(recordTime) {
        if (recordTime > playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'Superaste el record';
        } else {
            pResult.innerText = 'No superaste el record :c';
        }
    }else {
        localStorage.setItem('record_time', playerTime);   
        pResult.innerText = 'Primera vez? sigue intentando';
    }
}

function levelFail() {
    
    lives--;
    console.log(lives)
    if(lives <= 0) {
        level = 0;
        lives = 3
        timeStart = undefined;
    } 
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    showLives();
        
}

function levelWin() {
    level++;
    startGame()
}

function gameWin () {
    console.log('ganaste el juego!');
    clearInterval(timeInterval);
    setRecord();
    
}
window.addEventListener('keyup', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    event.key==="ArrowUp"? moveUp()
    :event.key==="ArrowLeft"? moveLeft()
    :event.key==="ArrowRight"?moveRight() 
    :event.key==="ArrowDown"?moveDown()
    :console.log("Esa tecla no mueve nada");

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(stopWatch, 100);
       
    }
    // if (event.key === 'ArrowUp') moveUp();
    // else if (event.key === 'ArrowLeft')  moveLeft();
    // else if (event.key === 'ArrowRight') moveRight();
    // else if (event.key ==='ArrowDown') moveDown();
    // else console.log('Esta tecla no mueve nada')
    
}

function moveUp () {
    
    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('OUT')
    } else {
        playerPosition.y -= elementsSize;
        
    } 
    
    startGame();
}
function moveLeft () {
    
    if((playerPosition.x - elementsSize) < elementsSize){
        console.log('OUT')
    } else {
        playerPosition.x -= elementsSize;
        
    }
    startGame();
 
}

function moveRight () {
   
    if ((playerPosition.x + elementsSize) > canvasSize){
          console.log('OUT')
    }else {
        playerPosition.x += elementsSize;
        
    }
    startGame();

}
function moveDown () {
   
    if((playerPosition.y + elementsSize)> canvasSize){
        console.log('OUT')
    } else {
        playerPosition.y += elementsSize;
    }
    
    startGame();

} 
function setCanvasSize() {

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvasSize = Number(canvasSize.toFixed(0))

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;
    showLives();
    startGame();
    playerPosition.x = undefined;
    playerPosition.y = undefined; 
}   
