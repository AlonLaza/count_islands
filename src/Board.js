import React, { useEffect, useRef, useState } from 'react';
import styles from './Board.module.css';
import Maze from './Maze';
import CountIslands from './CountIslands';
import {useLocation} from "react-router-dom";


function Board() {
    const canvas = useRef(null);
    const container = useRef(null);
    const [ctx, setCtx] = useState(undefined);
    const [maze, setMaze] = useState(new Maze(17, 33));
    const [count, setCount] = useState(0);
    const [buttonText, setbuttonText] = useState("Solve");
    const [randomize] = useState(useLocation().state.randomize);
    console.log('board',useLocation().state.rows);

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
            for (let y = 0; y < maze.rows; y++) {
                for (let x = 0; x < maze.cols; x++) {
                    maze.grid[x + y * maze.cols]= (Math.floor(Math.random()*2));
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
        if(col < 0 || col >32){
            return;
        }
        setMaze(maze => {
            return { ...maze, grid:maze.grid.map((x,i)=>{
                if(i===col+row*maze.cols){
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
        

        block.current.blockWidth = Math.floor(canvas.current.width / maze.cols);
        block.current.blockHeight = Math.floor(canvas.current.height / maze.rows);
        block.current.xOffset = Math.floor((canvas.current.width - maze.cols * block.current.blockWidth) / 2);
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
            ctx.fillStyle = 'blue';
            ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

            const blockWidth = Math.floor(canvas.current.width / maze.cols);
            const blockHeight = Math.floor(canvas.current.height / maze.rows);
            const xOffset = Math.floor((canvas.current.width - maze.cols * blockWidth) / 2);
            let colors = [];
            // while (colors.length < count) {
            //     do {
            //         var color = Math.floor((Math.random()*1000000)+1);
            //     } while (colors.indexOf(color) >= 0);
            //     colors.push("#" + ("000000" + color.toString(16)).slice(-6));
            // }
            for(let i=0;i<count;i++){
                colors.push("#" + ((1 << 24) * Math.random() | 0).toString(16));
            }
            for (let y = 0; y < maze.rows; y++) {
                for (let x = 0; x < maze.cols; x++) {
                    const cell = maze.grid[x + y * maze.cols];
                        drawLine(blockWidth * x + xOffset, blockHeight * y, blockWidth, 0)
                        drawLine(blockWidth * (x + 1) + xOffset, blockHeight * y, 0, blockHeight);
                        drawLine(blockWidth * x + xOffset, blockHeight * (y + 1), blockWidth, 0);
                        drawLine(blockWidth * x + xOffset, blockHeight * y, 0, blockHeight);
                        if(x==0 && y==0){
                            console.log('here',maze.grid[0]);
                        }
                        if(cell){
                            if(count==0){
                                ctx.fillStyle='brown';  
                            }
                            else{
                                console.log(colors[cell-1]);
                                ctx.fillStyle = colors[cell-1];
                            }
                            ctx.fillRect(blockWidth * x + xOffset, blockHeight * y, blockWidth, blockHeight);   
                        }
                }
            }

        };

        draw();
    }, [ctx, maze,randomize]);

    const solve = () => {
        let numOfIslands = new CountIslands(maze.grid,maze.rows,maze.cols).findIslands();
        setCount(numOfIslands[0]);
        setMaze(maze => {
            return { ...maze,grid: numOfIslands[1] }
          }); 
          setbuttonText("Restart");
    }

    return (
        <div
            className={styles.root}
            ref={container}
        >
           <header>
            <div className={styles.row}>
                <p>Count Islands!</p>
                <button onClick={solve}>{buttonText}</button>
                <p>Number Of Islands <span className={-1}>{-1}</span></p>
            </div>
                
            {/* <p>
                1UP <span className={styles.score}>{points.toString().padStart(5, ' ')}</span>&nbsp;&nbsp;
                ROUND <span className={styles.score}>{round.toString().padStart(3, ' ')}</span>&nbsp;&nbsp;
                TIME <span className={styles.score}>{formatTime()}</span>
                
            </p> */}
            
        </header>

            <canvas ref={canvas} onMouseDown={ handleEvent } />
           
        </div>
        
    );
}



export default Board;
