const canvas = document.getElementById("logical-game")
const ctx = canvas.getContext("2d")
let cellSize = 30;
let cols = Math.ceil(window.innerWidth / cellSize);
let rows = Math.ceil(window.innerHeight / cellSize);
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let grid = generateGrid(cols, rows);

function generateGrid(cols, rows) {
    const grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows).fill(0);
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(Math.random() * 2);
        }
    }
    return grid;
}

function drawGrid() {
    ctx.clearRect(0, 0, cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * cellSize;
            const y = j * cellSize;
            if (grid[i][j] === 1) {
                //ctx.fillStyle = "white";
                ctx.font = cellSize.toString() + 'px serif'

                ctx.fillText("⬜️", x, y)
                //ctx.fillText("💀", x, y)
                // ctx.fillRect(x, y, cellSize, cellSize);
            } else {
                //ctx.fillStyle = "black";
                ctx.font = cellSize.toString() + 'px serif'

                ctx.fillText("⬛️", x, y)
                // ctx.fillText("😈", x, y)
                //ctx.fillRect(x, y, cellSize, cellSize);
            }
        }
    }
}

function countNeighbours(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const col = (x + i + cols) % cols;
            const row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function update() {
    const next = new Array(cols);
    for (let i = 0; i < cols; i++) {
        next[i] = new Array(rows).fill(0);
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const state = grid[i][j];
            const neighbours = countNeighbours(grid, i, j);
            if (state === 0 && neighbours === 3) {
                next[i][j] = 1;
            } else if (state === 1 && (neighbours < 2 || neighbours > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }
    grid = next;
}

async function loop() {
    while (true) {
        update();
        drawGrid();
        await sleep(50);
        await new Promise(resolve => requestAnimationFrame(resolve));

    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

loop()