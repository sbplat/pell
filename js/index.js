$(document).ready(function() {
    $("#n-value").keyup(function() {
        const nValue = parseInt($("#n-value").val())

        if (isPerfectSquare(nValue)[0]) {
            $("#n-value")[0].setCustomValidity("The value of n cannot be a perfect square")
        } else {
            $("#n-value")[0].setCustomValidity("")
        }

        $("#n-value")[0].reportValidity()
    })

    $("#equation-info").submit(function(event) {
        event.preventDefault()

        const nValue = parseInt($("#n-value").val()),
              amount = parseInt($("#amount").val())

        let pairs = chakravalasMethod(nValue, amount)

        pairs.forEach(function(value, index, array) {
            array[index] = value.join(", ")
        })

        const pairsString =
        `The first ${amount == 1 ? "" : amount + " "}pair${amount != 1 ? "s" : ""} (x, y):<br><br>` +
        `${pairs.join("<br><br>") || "None"}`

        $("#pairs").html(pairsString)
    })
})

function isPerfectSquare(number) {
    if (number < 0) {
        return [false, null]

    } else if (number == 0) {
        return [true, 0]
    }

    const lastHexDigit = number & 0xF

    if (lastHexDigit != 0 && lastHexDigit != 1 && lastHexDigit != 4 && lastHexDigit != 9) {
        return [false, null]
    }

    let l = 1, r = number // left, right

    while (l <= r) { // binary search
        const m = Math.floor((l + r) / 2) // middle
        const mSquared = m * m

        if (mSquared == number) {
            return [true, m]

        } else if (mSquared < number) {
            l = m + 1

        } else {
            r = m - 1
        }
    }

    return [false, null]
}

function absBigInt(x) {
    return x >= 0n ? x : x * -1n
}

function chakravalasMethod(n, amount) {
    let pairs = []

    const nBigInt = BigInt(n)
    let optimalP = curP = curX = BigInt(Math.round(Math.sqrt(n))), curY = BigInt(1), curK = curP * curP - nBigInt

    if (curK == 1) {
        pairs.push([curX.toString(), curY.toString()])
    }

    while (pairs.length < amount) {
        let absCurK = absBigInt(curK), nextP, nextPLow = optimalP - (curP + optimalP) % absCurK, nextPHigh = nextPLow + absCurK

        if (nextPLow < 1) {
            nextP = nextPHigh

        } else {
            if (absBigInt(nextPLow * nextPLow - nBigInt) < absBigInt(nextPHigh * nextPHigh - nBigInt)) {
                nextP = nextPLow

            } else {
                nextP = nextPHigh
            }
        }

        let nextK = (nextP * nextP - nBigInt) / curK, nextX = (nextP * curX + nBigInt * curY) / absCurK, nextY = (nextP * curY + curX) / absCurK

        if (nextK == 1) {
            pairs.push([nextX.toString(), nextY.toString()])
        }

        curP = nextP, curK = nextK, curX = nextX, curY = nextY
    }

    return pairs
}
