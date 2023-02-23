const score = document.querySelector('#score');
const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let xDirection = 6;
let yDirection = 6;
let timerId = null;

const userStart = [230,10];
let userCurrentPosition = userStart;

const ballStart = [270,40];
let ballCurrentPosition = ballStart;

class Block {
    constructor(xAxis, yAxis) {
      this.bottomLeft = [xAxis, yAxis]
      this.bottomRight = [xAxis + blockWidth, yAxis]
      this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
      this.topLeft = [xAxis, yAxis + blockHeight]
    }
  }

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
  ];

function addBlock(){
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left='100px'
    block.style.bottom='50px';
    grid.appendChild(block);
}

//creating blocks
function addBlocks(){
    for(let i =0; i < blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'  
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'  
        grid.appendChild(block)
        console.log(blocks[i].bottomLeft)
    }
}

addBlocks();

//add user
const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
drawUser();


//add ball
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();


//drawUser
function drawUser(){
    user.style.left = userCurrentPosition[0] +'px';
    user.style.bottom = userCurrentPosition[1] +'px';
}

//draw ball
function drawBall(){
    ball.style.left = ballCurrentPosition[0]+'px';
    ball.style.bottom = ballCurrentPosition[1]+'px';
}

//move user
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(userCurrentPosition[0] > 0){
                userCurrentPosition[0]-=50;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if(userCurrentPosition[0] < boardWidth-blockWidth){
                userCurrentPosition[0]+=50;
                drawUser();
            }
            break;
    }
}

document.addEventListener('keydown', moveUser);




//move ball
function moveBall(){
    ballCurrentPosition[0] +=xDirection;
    ballCurrentPosition[1] +=yDirection;
    drawBall();
    checkForCollisions();
}


timerId =setInterval(moveBall, 30);


//check for collisions
function checkForCollisions(){
    //check for block collision
    for(let i=0; i < blocks.length; i++){
        if(
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i,1);
            changeDirection(); 
            score.textContent = parseInt(score.textContent)+1;
            if (blocks.length == 0) {
                score.innerHTML = 'You Win!'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
              }
        }
    }



    //check for wall collisions
    if(ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[1] >= (boardHeight - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] <= 0){
        changeDirection();
    } 

    //check for user collisions
    if
    (
      (ballCurrentPosition[0] > userCurrentPosition[0] && ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth) &&
      (ballCurrentPosition[1] > userCurrentPosition[1] && ballCurrentPosition[1] < userCurrentPosition[1] + blockHeight ) 
    )
    {
      changeDirection()
    }

    //game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        score.innerHTML = 'You lose!'
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection(){
    if(xDirection === 6 && yDirection === 6 ){
        yDirection= -6;
        return
    } 

    if(xDirection === 6 && yDirection === -6 ){
        xDirection = -6;
        return
    } 

    if(xDirection === -6 && yDirection === -6 ){
        yDirection = 6;
        return
    } 

    if(xDirection === -6 && yDirection === 6 ){
        xDirection = 6;
        return
    } 
}