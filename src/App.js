import React, {useCallback, useEffect,useRef, useReducer, useState} from 'react';

import styles from './App.module.css';
import useInterval from "@use-it/interval";
import Header from './Header';
import Maze from './Maze';
import Board from './Board';
import seaVideo from './seaVideo.mp4';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


function App() {

 
    const [showBoard, setShowBoard] = useState(false);
    const [randomize, setRandomize] = useState(undefined);

    const showRandomizeBoard = ()=>{
        setRandomize(true);
        const cols = parseInt(document.getElementById("cols").value);
        const rows = parseInt(document.getElementById("rows").value);
        if(cols<1 || rows<1){
            alert('false');
            return;
        }
        setShowBoard(true);
    }

    const showBlankBoard = ()=>{
        setRandomize(false);
        const cols = parseInt(document.getElementById("cols").value);
        const rows = parseInt(document.getElementById("rows").value);
        if(cols<1 || rows<1){
            alert('false');
            return;
        }
        setShowBoard(true);
    }

    
    return (
        <div className={styles.root}>
              
           {!showBoard &&<video style={{marginTop:0,paddingTop:0,hight:'100%',width:'100%',position:'fixed'}}/*className={styles.background}*/ autoPlay loop muted>
                <source src={seaVideo} type='video/mp4' />
            </video>}
           
            
            {!showBoard && 
            (<div className={styles.mydiv}>
                <h4 style={{marginTop:20, fontSize:18,textAlign:'center',color: 'black'}}>Please Enter Bitmap Size</h4>
                <div style={{paddingLeft:'15%' }}> 
                    <input id="cols"  type="number" style={{width:'35%', textAlign:'center'}} placeholder='rows'></input>
                    <text style={{color:'black',marginLeft:'5%',marginRight:'5%'}}>X</text>
                    <input id="rows"  type="number"  style={{width:'35%', textAlign:'center'}} placeholder='cols'></input>
                </div>
                {/* <form>
  <div class="form-row">
    <div class="col">
      <input type="text" class="form-control" placeholder="First name"/>
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Last name"/>
    </div>
  </div>
</form> */}


                
                <div style={{marginTop:'10%', flex:'10%',justifyContent: 'space-between'}}>
                    <button style={{marginLeft:'18%'}} type="button" class="btn btn-primary" onClick={showRandomizeBoard} >Randomize</button>
                    <button type="button" style={{marginLeft:'5%'}} class="btn btn-primary" onClick={showBlankBoard} >Bonus Draw</button>
                </div>
            </div>)}

            {showBoard &&<Board
             randomize={randomize}
            />}
        </div>

    );

}




export default App;
