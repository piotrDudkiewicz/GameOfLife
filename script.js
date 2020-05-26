const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 5;
canvas.width = 700;
canvas.height = 700;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

function generateGrid(cols, rows) {
    return new Array(cols).fill(null)
        .map(() => new Array(rows).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

let grid = generateGrid(COLS, ROWS);

let o = 0;
function start() {
    print(grid);
    grid = nextGeneration(grid);
    requestAnimationFrame(start);
}

requestAnimationFrame(start);

function nextGeneration(grid) {
    let newGene = grid.map(x => [...x]);
    for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
            let neigh = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {

                    if (i == 0 & j == 0) {
                        continue;
                    }

                    if (x + i >= 0 && y + j >= 0 && x + i < COLS && y + j < ROWS) {
                        neigh += grid[x + i][y + j];
                    }
                }
            }

            if (grid[x][y] == 1 && neigh < 2) {
                newGene[x][y] = 0;
            } else if (grid[x][y] == 0 && neigh == 3) {
                newGene[x][y] = 1;
            } else if (grid[x][y] == 1 && neigh > 3) {
                newGene[x][y] = 0;
            }

        }
    }
    return newGene;
}

function print(grid) {
    ctx.clearRect(0,0,canvas.height,canvas.width);
    for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
            if (grid[x][y] == 1) {
                ctx.fillRect(x * resolution, y * resolution, resolution, resolution);
                ctx.fillStyle = 'black';
            }
        }
    }
}
