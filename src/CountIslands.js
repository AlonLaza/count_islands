class CountIslands {
    constructor(cells, rows, cols) {
        this.cells = cells; //initialy is array of true and false
        this.rows = rows;
        this.cols = cols; 
        this.count = 0; 
    }

    canEnterCell = (y, x) => { 
        if (y < 0 || y >= this.rows
        || x < 0 || x >= this.cols
        || this.cells[x + y * this.cols] !== true //already visited <=> alreay assigned color
        || !this.cells[x + y * this.cols]) // is not land
        { 
            return false;
        }

        return true;
    }

    expandSearch = (y, x) => {
        this.cells[x + y * this.cols] = this.count; //each count is mapped to distinct color
        for (let i = -1; i <= 1; ++i) {
            for (let j = -1; j <= 1; ++j) {
                let isSafeCell = this.canEnterCell(y+i, x+j);                                   
                if (isSafeCell) {
                    this.expandSearch(y+i, x+j);
                }
            }
        }
    }

    bfsSearch = (y, x) => {
        this.cells[x + y * this.cols] = this.count; //each count is mapped to distinct color
        let queue = [];
        queue.push({currX:x, currY:y});  

        while(queue.length>0){
            let {currX, currY} = queue.shift();
            for (let i = -1; i <= 1; ++i) {
                for (let j = -1; j <= 1; ++j) {
                    let isSafeCell = this.canEnterCell(currY+i, currX+j);                                   
                    if (isSafeCell) {
                        this.cells[currX+j + ((currY+i) * this.cols)] = this.count;
                        queue.push({currX:currX+j, currY:currY+i});
                    }
                }
            }
        }
    }


    findIslands = ()=>{
       for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.cells[x + y *this.cols]===true) {
                    //is land and yet visited
                    this.count++;
                    //this.expandSearch(y, x);
                    this.bfsSearch(y,x);
                }
            }
        }
        return {count: this.count,cells: this.cells};
    };

}

export default CountIslands;
