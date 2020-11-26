import React from 'react';
import styles from './Header.module.css';

function Header({hiScore, time, points, round}) {

    // const formatTime = () => {
    //     return (time || time === 0)
    //         ? time.toString().padStart(2, ' ')
    //         : null
    // };

    return (
        <header>
            <div className={styles.row}>
                <p>Count Islands!</p>
                <button>Solve</button>
                <p>Number Of Islands <span className={-1}>{-1}</span></p>
            </div>
                
            {/* <p>
                1UP <span className={styles.score}>{points.toString().padStart(5, ' ')}</span>&nbsp;&nbsp;
                ROUND <span className={styles.score}>{round.toString().padStart(3, ' ')}</span>&nbsp;&nbsp;
                TIME <span className={styles.score}>{formatTime()}</span>
                
            </p> */}
            
        </header>
    );
}

export default Header;
