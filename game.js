let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

drawRect = (coordX, coordY, width, heigth, color) => {
  context.fillStyle = color
  context.fillRect(coordX, coordY, width, heigth)
}

drawRect(0, 0, canvas.width, canvas.height, 'black')
drawRect(400, 300, 10, 10, 'white')
