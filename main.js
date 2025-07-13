const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// game objects
const paddle = {
  width: 75,
  height: 10,
  x: (canvas.width - 75) / 2,
  speed: 7,
  movingLeft: false,
  movingRight: false,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  radius: 7,
  dx: 2,
  dy: -2,
};

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

let score = 0;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Score: ' + score, 8, 20);
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          ball.x > b.x &&
          ball.x < b.x + brickWidth &&
          ball.y > b.y &&
          ball.y < b.y + brickHeight
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      alert('GAME OVER');
      document.location.reload();
    }
  }

  if (paddle.movingRight && paddle.x < canvas.width - paddle.width) {
    paddle.x += paddle.speed;
  } else if (paddle.movingLeft && paddle.x > 0) {
    paddle.x -= paddle.speed;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  requestAnimationFrame(draw);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.movingRight = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.movingLeft = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.movingRight = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.movingLeft = false;
  }
});

draw();

export function isBallCollidingWithBrick(ball, brick) {
  return (
    ball.x > brick.x &&
    ball.x < brick.x + brickWidth &&
    ball.y > brick.y &&
    ball.y < brick.y + brickHeight
  );
}
