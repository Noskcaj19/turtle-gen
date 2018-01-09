var moves = []

$(document).keydown(function (e) {
    switch (e.key) {
        case 'ArrowLeft':
            moves.push('left')
            left(90)
            break
        case 'ArrowUp':
            moves.push('forward')
            forward(15)
            break
        case 'ArrowRight':
            moves.push('right')
            right(90)
            break
        case 'ArrowDown':
            moves.push('reverse')
            left(180)
            break
    }
    codeGen()
})

$("input").on('input', codeGen)

function maybePrefix(func) {
    if ($("#api_prefix_check").is(":checked")) {
        return $("#api_prefix_input").val() + "." + func
    } else {
        return func
    }
}

function rightApi() {
    let right = $('#turn_right_api')
    if (right.val() == "") {
        return Array(3).fill(leftApi())
    }
    return [maybePrefix(right.val()) + "()"]
}

function leftApi() {
    let left = $('#turn_left_api')
    if (left.val() == "") {
        return Array(3).fill(rightApi())
    }
    return [maybePrefix(left.val()) + "()"]

}

function forwardApi() {
    return [maybePrefix($("#up_api").val()) + "()"]
}

function reverseApi() {
    if ($("#down_api").val() == "") {
        if ($('#turn_right_api').val() == "") {
            return Array(2).fill(leftApi())
        } else {
            return Array(2).fill(rightApi())
        }
    } else {
        return [maybePrefix($("#down_api").val() + "()")]
    }
}

function codeGen() {
    let lines = []
    for (move of moves) {
        switch (move) {
            case 'left':
                lines.push(...leftApi())
                break
            case 'right':
                lines.push(...rightApi())
                break
            case 'forward':
                lines.push(forwardApi())
                break
            case 'reverse':
                lines.push(...reverseApi())
                break
        }
    }
    $("#code").text(lines.join("\n"))
}
