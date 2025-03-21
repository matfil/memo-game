import 'topbar.scss';
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
        <div>
            <select name="difficulty" id="difficulty" disabled={props.gameActive} onChange={(e) => props.setDifficulty(parseInt(e.target.value))}>
                <option value="6">Easy</option>
                <option value="8">Medium</option>
                <option value="12">Hard</option>
            </select>
            {props.gameActive? <> <span>Time: {props.time}</span> </> : null}
            <span>Attempts: {props.attempts}</span>
        </div>
        </>
    );
};
export default topBar;