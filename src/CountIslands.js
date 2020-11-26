class CountIslands {
    constructor(grid, rows, cols) {
        this.grid = grid;
        this.rows = rows;
        this.cols = cols; 
        this.isVisited = [];   
        this.count=0; 
    }

    canEnterCell = (y, x) => { 

        if (y < 0 || y >= this.rows
        || x < 0 || x >= this.cols
        || this.isVisited[x + y * this.cols] 
        || this.grid[x + y * this.cols] == 0) {
        return false;
        }

        return true;
    }

    expandSearch = (y, x) => {
        this.isVisited[x + y * this.cols] = this.count;
        for (let i = -1; i <= 1; ++i) {
            for (let j = -1; j <= 1; ++j) {
                let isSafeCell = this.canEnterCell(y+i, x+j);                                   
                if (isSafeCell) {
                    this.expandSearch(y+i, x+j);
                }
            }
        }
    }


    findIslands = ()=>{

        /*Initially all cells are not yet visited*/
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.isVisited[x + y * this.cols] = false;
            }
        }



        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {

                if (this.grid[x + y *this.cols] && !this.isVisited[x + y * this.cols]) {
                    this.count++;
                    this.expandSearch(y, x);
                    //++count;
                }
            }
        }
        return [this.count,this.isVisited];
    };

}

export default CountIslands;
