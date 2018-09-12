var leftPaddle;
var rightPaddle;
var ball;
var isPaused = false;
var gameOver = false;
var initialLoad = true;
var lastPause = 0;
var pauseDelay = 50;
var leftScore = 0;
var rightScore = 0;

function setup() {
  createCanvas(480,300);
  leftPaddle = new Paddle(10, height / 2 - 30, 10, 60);
  rightPaddle = new Paddle(width - 20, height / 2 - 30, 10, 60);
  ball = new Ball();
  textAlign(CENTER);
}

function DrawBackground() {
  noFill();
  strokeWeight(5);
  rect(0,0,width,height);
  fill(0);
  textSize(32);
  text(leftScore, 100, 50);
  text(rightScore, width - 100, 50);
}

function IncreaseScore(){
  if (ball.goal == -1) {
    leftScore++;
  } else if (ball.goal == 1){
    rightScore++;
  }
  ball.goal = 2;
  ball.velx *= -1;
  ball.x = width/2;
  ball.y = height/2;
  
  if (leftScore == 10 || rightScore == 10) {
    gameOver = true;
  } else {
    setTimeout(function() {
      ball.goal = 0;
    }, 2000);
  }
}

function GameOver() {
  fill(0);
  textSize(32);
  text('Game Over', width / 2, height / 2);
  text('Press Enter To Play Again', width / 2, height / 2 + 50);
}

function StartScreen() {
  fill(0);
  textSize(32);
  text('Press Enter To Play', width / 2, height / 2);
}

function ResetGame() {
  leftScore = 0;
  rightScore = 0;
  leftPaddle.y = height / 2 - 30;
  rightPaddle.y = height / 2 - 30;
  initialLoad = false;
  gameOver = false;
  setTimeout(function() {
      ball.goal = 0;
    }, 2000);
}

function Collision (obj1, obj2) {
    return obj1.x - obj1.r < obj2.x + obj2.w &&
           obj1.x + obj1.r > obj2.x &&
           obj1.y - obj1.r < obj2.y + obj2.h &&
           obj1.y + obj1.r > obj2.y;
}

function keyReleased() {
    if (keyCode === 80 && millis() > (lastPause + pauseDelay) && !gameOver) {
      lastPause = millis();
      if (!isPaused) {
        isPaused = true;
      } else {
        isPaused = false;
      }
    } else if ((gameOver || initialLoad) && keyCode === 13) {
      ResetGame();
      
    }
    return false;
  }

function draw() {
  clear();
  DrawBackground();
  leftPaddle.draw();
  rightPaddle.draw();
  if (!gameOver && !initialLoad) { ball.draw(); }
  
  if (!isPaused && !gameOver && !initialLoad) {
    if (keyIsDown(UP_ARROW)) {
      rightPaddle.update(-1);
    } else if (keyIsDown(DOWN_ARROW)) {
      rightPaddle.update(1);
    }
    
    if (keyIsDown(87)) {
      leftPaddle.update(-1);
    } else if (keyIsDown(83)) {
      leftPaddle.update(1);
    }
    
    if (Collision(ball, rightPaddle) || Collision(ball, leftPaddle)) {
      ball.bounce();
    }
    
    if (ball.goal == 0) {
      ball.update();
    } else {
      IncreaseScore();
    }
  } else {
    if (gameOver) {
      GameOver();
    } else if (initialLoad) {
      StartScreen();
    } else {
      fill(0);
      textSize(32);
      text('Paused', width / 2, height / 2);
    }
  }
}
