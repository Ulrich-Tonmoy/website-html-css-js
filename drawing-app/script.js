const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeElement = document.getElementById("size");
const colorElement = document.getElementById("color");
const clearElement = document.getElementById("clear");
const ctx = canvas.getContext("2d");

let size = 10;
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;

updateSizeOnScreen();

canvas.addEventListener("mousedown", (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

increaseBtn.addEventListener("click", () => {
    size += 1;
    if (size > 100) {
        size = 100;
    }
    updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
    size -= 1;
    if (size < 0) {
        size = 0;
    }
    updateSizeOnScreen();
});

increaseBtn.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    size += 5;
    if (size > 100) {
        size = 100;
    }
    updateSizeOnScreen();
});

decreaseBtn.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    size -= 5;
    if (size < 0) {
        size = 0;
    }
    updateSizeOnScreen();
});

colorElement.addEventListener("change", (e) => {
    color = e.target.value;
});

clearElement.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function updateSizeOnScreen() {
    sizeElement.innerText = size;
}