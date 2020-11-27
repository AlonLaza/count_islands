import React, { useEffect, useRef, useState } from 'react';
import styles from './Board.module.css';
import Grid from './Grid';
import CountIslands from './CountIslands';
import {useLocation, useHistory} from "react-router-dom";
import distinctColors from 'distinct-colors'


function Board() {
    const {rows, cols} = useLocation().state;
    const canvas = useRef(null);
    const container = useRef(null);
    const [ctx, setCtx] = useState(undefined);
    const [grid, setGrid] = useState(new Grid(rows, cols));
    const [count, setCount] = useState(0);
    const [solveButPress, setSolveButPress] = useState(false);
    const [randomize,setRandomize] = useState(useLocation().state.randomize);
    const history = useHistory();
    const block = useRef({});

    useEffect(() => {

        const fitToContainer = () => {
            const { offsetWidth, offsetHeight, left } = container.current;
            canvas.current.width = offsetWidth;
            canvas.current.height = offsetHeight;
            canvas.current.style.width = offsetWidth + 'px';
            canvas.current.style.height = offsetHeight + 'px';
        };

        setCtx(canvas.current.getContext('2d'));
        fitToContainer();

        if(randomize){
            for (let y = 0; y < grid.rows; y++) {
                for (let x = 0; x < grid.cols; x++) {
                    grid.cells[x + y * grid.cols]= (Math.floor(Math.random()*2));
                }
            }
        }
    }, []);


const handleEvent = (event) => {
    
    if (!randomize && event.type === "mousedown") {
        const  rect =  canvas.current.getBoundingClientRect();
        const gridLeft = rect.left + block.current.xOffset;
        const gridTop = rect.top;
        const col = Math.floor((event.pageX - gridLeft) / block.current.blockWidth    );
        const row= Math.floor((event.pageY - gridTop) / block.current.blockHeight    );
        if(col < 0 || col >grid.cols){
            return;
        }
        setGrid(grid => {
            return { ...grid, cells:grid.cells.map((x,i)=>{
                if(i===col+row*grid.cols){
                   return !x; 
                }
                else{
                    return x;
                }
            }) }
          });  
       } 
   }

    useEffect(() => {
        

        block.current.blockWidth = Math.floor(canvas.current.width / grid.cols);
        block.current.blockHeight = Math.floor(canvas.current.height / grid.rows);
        block.current.xOffset = Math.floor((canvas.current.width - grid.cols * block.current.blockWidth) / 2);
        const {blockWidth, blockHeight, xOffset} = block.current;

        const drawLine = (x1, y1, width, height) => {
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + width, y1 + height);
            ctx.stroke();
        };

        const draw = () => {
            if (!ctx) {
                return;
            }
            ctx.fillStyle = '#0879a6';
            ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
             let colors = [];
            let palette = distinctColors({count: count});
            console.log(palette);
            console.log(palette[0]);

            for(let i=0;i<count;i++){
                colors.push("#" + ((1 << 24) * Math.random() | 0).toString(16));
            }
            for (let y = 0; y < grid.rows; y++) {
                for (let x = 0; x < grid.cols; x++) {
                    const cell = grid.cells[x + y * grid.cols];
                        drawLine(blockWidth * x + xOffset, blockHeight * y, blockWidth, 0)
                        drawLine(blockWidth * (x + 1) + xOffset, blockHeight * y, 0, blockHeight);
                        drawLine(blockWidth * x + xOffset, blockHeight * (y + 1), blockWidth, 0);
                        drawLine(blockWidth * x + xOffset, blockHeight * y, 0, blockHeight);
                        if(cell){
                            if(count==0){
                                ctx.fillStyle='#ECB78B';  
                            }
                            else{
                                ctx.fillStyle = palette[cell-1];

                            }
                            ctx.fillRect(blockWidth * x + xOffset, blockHeight * y, blockWidth, blockHeight);   
                        }
                }
            }

        };

        draw();
    }, [ctx, grid,randomize]);

    const solve = () => {
        let numOfIslands = new CountIslands(grid.cells,grid.rows,grid.cols).findIslands();
        setCount(numOfIslands[0]);
        setGrid(grid => {
            return { ...grid,cells: numOfIslands[1] }
          }); 
          setSolveButPress(true);
          setRandomize(true);   
          
    }

    const restart = () => {
        history.push("/"); 
    }

    return (
        <div className={styles.root} ref={container}>
            <header>
                <div className={styles.row}>
                    {!solveButPress && (
                        <div class="container">
                            <button type="button" class="btn btn-primary btn-m mt-1 mb-1" onClick={solve}>Solve</button>
                        </div>
                    )}
                    {solveButPress && (
                    <div class="row">
                        <h4 class="mt-2">Found {count} Islands</h4>
                        <button type="button" class="btn btn-primary btn-m mt-1 mb-1 ml-5" onClick={restart}>Restart</button>
                    </div>)}
                </div>     
            </header>
            <canvas ref={canvas} onMouseDown={ handleEvent } /> 
        </div>   
    );
}



export default Board;
