// Generate a random integer between min and max, inclusive
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random point with single-digit coordinates
function generatePoint() {
    return {
        x: randInt(-9, 9),
        y: randInt(-9, 9)
    };
}

// Generate a random slope (avoid 0 for more interesting lines)
function generateSlope() {
    let m;
    do {
        m = randInt(-5, 5);
    } while (m === 0);
    return m;
}

// Generate a random y-intercept
function generateIntercept() {
    return randInt(-9, 9);
}

// Format the equation nicely
function formatEquation(m, b) {
    let mStr = m === 1 ? '' : (m === -1 ? '-' : m);
    let bStr = b === 0 ? '' : (b > 0 ? ' + ' + b : ' - ' + Math.abs(b));
    return `y = ${mStr}x${bStr}`;
}

// State
let point, m, b;

function newProblem() {
    m = generateSlope();
    b = generateIntercept();
    // 50% chance to generate a point ON the line
    if (Math.random() < 0.5) {
        // Pick a random x, then calculate y from the line
        const x = randInt(-9, 9);
        const y = m * x + b;
        // Only use if y is a single digit
        if (y >= -9 && y <= 9) {
            point = { x, y };
        } else {
            // fallback to random point
            point = generatePoint();
        }
    } else {
        point = generatePoint();
    }
    document.getElementById('point-display').textContent = `Point: (${point.x}, ${point.y})`;
    document.getElementById('equation-display').textContent = `Line: ${formatEquation(m, b)}`;
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('check-btn').style.display = 'inline-block';
    document.getElementById('next-btn').style.display = 'none';
}

function checkPointOnLine() {
    // Calculate expected y for the given x
    const expectedY = m * point.x + b;
    const isOnLine = expectedY === point.y;
    let explanation = `Given the equation: y = ${m}x + ${b}<br>`;
    explanation += `Substitute x = ${point.x}:<br>`;
    explanation += `y = ${m} * ${point.x} + ${b} = ${expectedY}<br>`;
    explanation += `The point's y-coordinate is ${point.y}.<br>`;
    if (isOnLine) {
        explanation += `<b>Yes, the point (${point.x}, ${point.y}) is on the line.</b>`;
    } else {
        explanation += `<b>No, the point (${point.x}, ${point.y}) is not on the line.</b>`;
    }
    document.getElementById('explanation').innerHTML = explanation;
    document.getElementById('explanation').style.display = 'block';
    document.getElementById('check-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';
}

document.getElementById('check-btn').addEventListener('click', checkPointOnLine);
document.getElementById('next-btn').addEventListener('click', newProblem);

window.onload = newProblem;
