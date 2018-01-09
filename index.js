var canvas
var ctx
var gridWidth
var gridHeight

var moves = []
var position

function vecAdd(x, y) {
    return [x[0] + y[0], x[1] + y[1]]
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()

    moveTo(x1, y1)
    lineTo(x2, y2)
    ctx.stroke()
}

function lineTo(x, y) {
    let widthMutiplier = canvas.width / gridWidth
    let heightMutiplier = canvas.height / gridHeight
    ctx.lineTo(x * widthMutiplier, y * heightMutiplier)
}

function moveTo(x, y) {
    let widthMutiplier = canvas.width / gridWidth
    let heightMutiplier = canvas.height / gridHeight
    ctx.moveTo(x * widthMutiplier, y * heightMutiplier)
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawGrid() {
    let oldWidth = ctx.lineWidth
    ctx.lineWidth = .2
    for (x = 0; x <= gridWidth; x++) {
        for (y = 0; y <= gridHeight; y++) {
            drawLine(x, 0, x, gridHeight)
            drawLine(0, y, gridWidth, y)

        }
    }
    ctx.lineWidth = oldWidth
}


function drawCircle(x, y, r) {
    let widthMutiplier = canvas.width / gridWidth
    let heightMutiplier = canvas.height / gridHeight
    x = x * widthMutiplier
    y = y * heightMutiplier
    ctx.moveTo(x + r, y)
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    // ctx.fill()
    ctx.stroke()
}

function drawTurtle() {
    ctx.fillStyle = 'blue'
    drawCircle(
        Math.round(position[0]),
        Math.round(position[1]),
        8
    )
}

function draw() {
    let oldWidth = ctx.lineWidth
    ctx.lineWidth = 5
    let oldPos = position
    ctx.beginPath()
    moveTo(...position)
    for (let move of moves) {
        position = vecAdd(position, move)
        lineTo(...position)
    }
    ctx.stroke()
    moveTo(...oldPos)
    ctx.lineWidth = oldWidth
}

function render() {
    position = [Math.round(gridWidth / 2), Math.round(gridHeight / 2)]
    clear()
    drawGrid()
    draw()
    drawTurtle()
}

$(document).keydown(function (e) {
    switch (e.key) {
        case 'ArrowLeft':
            moves.push([-1, 0])
            break
        case 'ArrowUp':
            moves.push([0, -1])
            break
        case 'ArrowRight':
            moves.push([1, 0])
            break
        case 'ArrowDown':
            moves.push([0, 1])
            break
    }
    render()
})


function initCanvas() {
    canvas = document.getElementById('turtle')
    if (canvas.getContext) {
        ctx = canvas.getContext('2d')
    } else {
        alert('Browser not supported')
    }
    $(canvas).attr("width", $("#turtle").width())
    $(canvas).attr("height", $("#turtle").width())
}

$(function () {
    initCanvas()

    $("#width").trigger('input')
    $("#height").trigger('input')
    render()
})

$("#width").on('input', function () {
    gridWidth = parseInt(this.value)
    render()
})

$("#height").on('input', function () {
    gridHeight = parseInt(this.value)
    render()
})
