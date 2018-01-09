var canvas
var ctx
var gridWidth
var gridHeight

function drawLine(x1, y1, x2, y2) {
    var widthMutiplier = canvas.width / gridWidth
    var heightMutiplier = canvas.height / gridHeight
    ctx.beginPath()

    ctx.moveTo(x1 * widthMutiplier, y1 * heightMutiplier)
    ctx.lineTo(x2 * widthMutiplier, y2 * heightMutiplier)
    ctx.stroke()
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
    var widthMutiplier = canvas.width / gridWidth
    var heightMutiplier = canvas.height / gridHeight
    x = x * widthMutiplier
    y = y * heightMutiplier
    ctx.moveTo(x + r, y)
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke()
}

function drawTurtle() {
    ctx.fillStyle = 'blue'
    drawCircle(
        Math.round(gridWidth / 2),
        Math.round(gridHeight / 2),
        5
    )
}

function render() {
    clear()
    drawGrid()
    drawTurtle()
}

$(document).keydown(function (e) {
    switch (e.key) {
        case 'ArrowLeft':
            console.log('got ArrowLeft')
            break
        case 'ArrowUp':
            console.log('got ArrowUp')
            break
        case 'ArrowRight':
            console.log('got ArrowRight')
            break
        case 'ArrowDown':
            console.log('got ArrowDown')
            break
    }
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
