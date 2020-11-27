class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.createGrid();
    }

    createGrid() {
        const cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                cells.push(false);
            }
        }
        this.cells = cells;
    }

}

export default Grid;