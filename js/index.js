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

        let pairs = generatePairs(nValue, amount)

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

function chakravalasMethod(n) {
    const nBigInt = BigInt(n)
    let optimalP = curP = curX = BigInt(Math.round(Math.sqrt(n))), curY = BigInt(1), curK = curP * curP - nBigInt

    if (curK == 1) {
        return [curX, curY]
    }

    while (true) {
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
            return [nextX, nextY]
        }

        curP = nextP, curK = nextK, curX = nextX, curY = nextY
    }
}

function generatePairs(n, amount) {
    // See the [README](https://github.com/sbplat/pell/blob/main/README.md)
    // for more information about this algorithm.
    let pairs = []

    const fundamentalSolution = chakravalasMethod(n)
    const x_0 = fundamentalSolution[0], y_0 = fundamentalSolution[1]

    pairs.push([x_0, y_0])

    if (amount == 1) {
        return pairs
    }

    const nBigInt = BigInt(n)

    let curX = x_0, curY = y_0

    for (let i = 1; i < amount; i++) {
        let nextX = x_0 * curX + nBigInt * y_0 * curY, nextY = x_0 * curY + y_0 * curX

        pairs.push([nextX, nextY])

        curX = nextX, curY = nextY
    }

    return pairs
}
