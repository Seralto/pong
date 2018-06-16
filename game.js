const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const PADDLE_HEIGHT = 100
const PADDLE_WIDTH = 10
const PADDLE_DISTANCE = 5

const score = {
  player: 0,
  computer: 0,
  point() {
    if(ball.x < 0) {
      this.computer += 1
      ball.reset()
    }

    if(ball.x > canvas.width) {
      this.player += 1
      ball.reset()
    }

    context.font = "30px Arial"
    context.textAlign = "center"
    context.fillText(this.player, 80, 80)
    context.fillText(this.computer, canvas.width - 80, 80)
  }
}

drawRect = (coordX, coordY, width, heigth, color) => {
  context.fillStyle = color
  context.fillRect(coordX, coordY, width, heigth)
}

drawScreen = () => {
  drawRect(0, 0, canvas.width, canvas.height, 'black')
}

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  speedX: Math.random() + 0.5,
  speedY: Math.random() * Math.random() * .3 < 0.5 ? - 1 : 1,
  radius: 6,
  color: 'white',
  draw() {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    context.fillStyle = this.color;
    context.fill();
  },
  move() {
    this.x += this.speedX
    this.y += this.speedY
  },
  rebound() {
    // Bounce ball on top and bottom of canvas
    if(this.y > canvas.height - this.radius || this.y < 0) {
      this.speedY = -this.speedY
    }

    // Bounce ball on player paddle
    if(this.x < PADDLE_WIDTH + PADDLE_DISTANCE && this.y > playerPaddle.y && this.y < playerPaddle.y + PADDLE_HEIGHT ) {
      this.speedX = -this.speedX
    }

    // Bounce ball on computer paddle
    if(this.x > canvas.width - (PADDLE_WIDTH + PADDLE_DISTANCE) &&
    this.y > computerPaddle.y &&
    this.y < computerPaddle.y + PADDLE_HEIGHT ) {
      this.speedX = -this.speedX
    }
  },
  reset() {
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.speedX = Math.random() + 0.5,
    this.speedY = Math.random() * Math.random() * .3 < 0.5 ? - 1 : 1
  }
}

const playerPaddle = {
  x: PADDLE_DISTANCE,
  y: canvas.height / 2 - PADDLE_HEIGHT / 2,
  speed: 10,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  color: 'white',
  draw() {
    drawRect(this.x, this.y, this.width, this.height, this.color)
  },
  move(y) {
    this.y = y - PADDLE_HEIGHT / 2
    if (this.y < 0) this.y = 0
    if (this.y > canvas.height - PADDLE_HEIGHT) this.y = canvas.height - PADDLE_HEIGHT
  }
}

const computerPaddle = {
  x: canvas.width - (PADDLE_WIDTH + PADDLE_DISTANCE),
  y: canvas.height / 2 - PADDLE_HEIGHT / 2,
  speed: 6,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  color: 'white',
  draw() {
    drawRect(this.x, this.y, this.width, this.height, this.color)
  },
  move() {
    if (ball.y > this.y + PADDLE_HEIGHT) { this.y += this.speed }
    if (ball.y < this.y) { this.y -= this.speed }

    if (this.y < 0) this.y = 0
    if (this.y > canvas.height - PADDLE_HEIGHT) this.y = canvas.height - PADDLE_HEIGHT
  }
}

window.addEventListener("mousemove", evt => playerPaddle.move(evt.clientY))

window.onload = () => {
  setInterval(() => {
    drawScreen()
    ball.draw()
    ball.move()
    ball.rebound()
    playerPaddle.draw()
    computerPaddle.draw()
    computerPaddle.move()
    score.point()
  })
}
