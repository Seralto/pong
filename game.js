let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

drawRect = function(coordX, coordY, width, heigth, color) {
  context.fillStyle = color
  context.fillRect(coordX, coordY, width, heigth)
}

drawScreen = function() {
  drawRect(0, 0, canvas.width, canvas.height, 'black')
}

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  speed: 1,
  radius: 10,
  color: 'white',
  draw() {
    drawRect(this.x, this.y, this.radius, this.radius, this.color)
  },
  move() {
    this.x += this.speed
  },
  reboundX() {
    if(this.x > canvas.width - this.radius || this.x < 0) {
      this.speed = -this.speed
    }
  }
}

window.onload = function() {
  setInterval(function() {
    drawScreen()
    ball.move()
    ball.draw()
    ball.reboundX()
  })
}
