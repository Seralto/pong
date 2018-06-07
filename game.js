const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const PADDLE_HEIGHT = 100
const PADDLE_WIDTH = 10
const PADDLE_DISTANCE = 5

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
    if(this.x > canvas.width - this.radius) {
      this.speedX = -this.speedX
    }
    if(this.x < PADDLE_WIDTH + PADDLE_DISTANCE && this.y > playerPaddle.y && this.y < playerPaddle.y + PADDLE_HEIGHT ) {
      this.speedX = -this.speedX
    }
    if(this.y > canvas.height - this.radius || this.y < 0) {
      this.speedY = -this.speedY
    }
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
    this.y = y - 50
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
  })
}
