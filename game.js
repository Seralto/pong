const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const PADDLE_HEIGHT = 100

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
  speedX: Math.random() + 1,
  speedY: Math.random() * Math.random() < 0.5 ? - 1 : 1,
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
    if(this.x > canvas.width - this.radius || this.x < 0) {
      this.speedX = -this.speedX
    }
    if(this.y > canvas.height - this.radius || this.y < 0) {
      this.speedY = -this.speedY
    }
  }
}

const paddlePlayer = {
  x: 10,
  y: canvas.height / 2 - PADDLE_HEIGHT / 2,
  speed: 10,
  width: 10,
  height: PADDLE_HEIGHT,
  color: 'white',
  draw() {
    drawRect(this.x, this.y, this.width, this.height, this.color)
  },
  move(y) {
    paddlePlayer.y = y - 50
    if (paddlePlayer.y < 0) paddlePlayer.y = 0
    if (paddlePlayer.y > canvas.height - PADDLE_HEIGHT) paddlePlayer.y = canvas.height - PADDLE_HEIGHT
  }
}

window.addEventListener("mousemove", evt => paddlePlayer.move(evt.clientY))

window.onload = () => {
  setInterval(() => {
    drawScreen()
    ball.draw()
    ball.move()
    ball.rebound()
    paddlePlayer.draw()
  })
}
