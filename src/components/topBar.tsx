import './topbar.scss';
import React from 'react';

export interface TopBarProps {
    time: number;
    attempts: number;
    difficulty: number;
    gameActive: boolean;
    setDifficulty: (difficulty: number) => void;
}

const topBar:React.FC<TopBarProps> = (props:TopBarProps) => {
    return (
        <>
        <div className='topBar'>
            <select name="difficulty" id="difficulty" value={props.difficulty} disabled={props.gameActive} onChange={(e) => props.setDifficulty(parseInt(e.target.value))}>
                <option value="6">Easy</option>
                <option value="8">Medium</option>
                <option value="12">Hard</option>
            </select>
            {props.gameActive? <> <span>Time: {props.time}</span> </> : null}
            {props.gameActive? <> <span>Attempts: {props.attempts}</span> </> : null}
        </div>
        </>
    );
};
export default topBar;