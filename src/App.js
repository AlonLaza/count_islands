import React, {useState,useCallback } from 'react';
import styles from './App.module.css';
import {useHistory } from "react-router-dom";
import Background from './images/islandImage.jpg';


function App() {

    const history = useHistory();

    const checkInput = ()=>{
        const rows = parseInt(document.getElementById("input_rows").value);
        const cols = parseInt(document.getElementById("input_cols").value);
        if(isNaN(rows) || isNaN(cols) || cols<1 || rows<1){
            return false;
        }
        else{
            return {rows:rows,cols:cols};
        }
    }

    const showBoard = ({randomize})=>{
        let ans = checkInput();
        if(!ans){
            alert('Invalid Input, Please Enter Integers')
            return;
        }
         history.push({pathname: "/board",
                       state: { randomize: randomize, rows:ans.rows, cols:ans.cols}});
    }
    
    return (
        <div>
            <div className={styles.mydiv}>
                <h4 className={styles.h4}>Please Enter Bitmap Size</h4>
                <form className={styles.form}>
                    <div class="form-row align-items-center">
                        <div class="col-sm-4">
                            <input type="number" class="form-control" id="input_rows" placeholder="Rows"/>
                        </div>
                        <div class="col-sm-4">
                            <input type="number" class="form-control" id="input_cols" placeholder="Cols"/>
                        </div>
                    </div>
                    <div class="mt-3">
                            <button type="button" class="btn btn-primary" onClick={()=>{showBoard({randomize:true});}} >Randomize</button>
                            <button type="button"class="btn btn-primary ml-3" onClick={()=>{showBoard({randomize:false});}} >Bonus Draw</button>
                    </div>               
                </form>  
            </div>
        </div>
    );
}

export default App;
