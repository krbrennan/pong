
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const paddleThick = 5;
const paddleHeight = 50;

let p1XPaddlePos = 0;
let p1YPaddlePos = 0;

let ballX = 50;
let ballSpeedX = 10;
let ballY = canvas.height/2;
let ballSpeedY = 10;
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
  context.fillRect((canvas.width - 20),(canvas.height / 2), paddleThick,paddleHeight)
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


function moveEverything(){
  // ball
  ballX = ballX + ballSpeedX;
  if(ballX < 20) {
    ballSpeedX = -ballSpeedX;
  }
  if(ballX > (canvas.width - 40)) {
    ballSpeedX = -ballSpeedX;
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
