
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const paddleThick = 5;
const paddleHeight = 50;

let p1XPaddlePos = 0;
let p1YPaddlePos = 0;

let p2XPaddlePos = canvas.width - 5;
let p2YPaddlePos = 0;

let ballX = canvas.width / 2;
let ballSpeedX = 5;
let ballY = canvas.height / 2;
let ballSpeedY = 5;
const fps = 30;

setInterval(function(){
  drawEverything();
  moveEverything();
}, 1000/fps);


function drawEverything(){
  // background
  context.fillStyle = 'black';
  context.fillRect(0,0,canvas.width,canvas.height);
  // ball
  context.fillStyle = 'white';
  context.fillRect(ballX, ballY, 10, 10);
  // p1 paddle
  context.fillStyle = 'white';
  context.fillRect(p1XPaddlePos, p1YPaddlePos, paddleThick, paddleHeight);
  // p2 paddle
  context.fillStyle = 'white';
  context.fillRect(p2XPaddlePos, p2YPaddlePos, paddleThick, paddleHeight)
}



function calculateMousePos(e){
  const rect = canvas.getBoundingClientRect();
  const rootEle = document.documentElement;

  let mouseX = e.clientX - rect.left - rootEle.scrollLeft;
  let mouseY = e.clientY - rect.top - rootEle.scrollTop;
  return{
    x: mouseX,
    y: mouseY
  };
}

function ballReset(){
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function handleComputerMove(){
  const p2Center = paddleHeight - (paddleHeight / 2)
  if(ballY > p2YPaddlePos + 30){
    p2YPaddlePos += 6
  } else if( ballY < p2YPaddlePos + 30){
    p2YPaddlePos -= 6
  }
}


function moveEverything(){
  handleComputerMove();

  ballX = ballX + ballSpeedX;
  if(ballX <= 0) {
    // handle p1 ball-movement
    if(ballY > p1YPaddlePos && ballY < p1YPaddlePos + paddleHeight){
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
    }
  }
  if(ballX >= canvas.width - 10) {
    // handle p2 ball-movement
    if(ballY > p2YPaddlePos && ballY < p2YPaddlePos + paddleHeight){
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
    }
    // ballSpeedX = -ballSpeedX;
    // ballReset();
  }

  ballY = ballY - ballSpeedY;
  if(ballY < 0){
    ballSpeedY = -ballSpeedY;
  }
  if(ballY > (canvas.height - 20)){
    ballSpeedY = -ballSpeedY;
  }

  canvas.addEventListener('mousemove', function(e){
    let mousePos = calculateMousePos(e);
    p1YPaddlePos = mousePos.y - (paddleHeight / 2);
  });

}
