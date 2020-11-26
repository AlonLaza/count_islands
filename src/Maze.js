import Maze from './Maze';

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = [true, true, true, true]; //0-up, 1-right, 2-down,3 -left
        this.visited = false;
    }
}

class MazeGenerator {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.createGrid();
    }

    createGrid() {
        const grid = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                grid.push(false);
                //console.log(Math.floor(Math.random()*2));
              //  grid.push(Math.floor(Math.random()*2));
            }
        }
        this.grid = grid;
    }

    getCell(y, x) {
        if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) {
            return null;
        }
        return this.grid[x + y * this.cols];
    }
    generate() {
        
        this.createGrid();

        return new Maze(this.rows, this.cols, this.grid);
    };
}

export default MazeGenerator;