import './App.scss'
import React from 'react'
import TopBar from './components/topBar'
import useGameState, { GameState } from './hooks/gameState';

const App: React.FC = () =>{

  const state:GameState = useGameState();
  const time = useGameState((state) => state.time);
  const gameActive = useGameState((state) => state.gameActive);
  const difficulty = useGameState((state) => state.difficulty);
  const attempts = useGameState((state) => state.attempts);

  const {startGame} = state;
  const {stopGame} = state;

  return (
    <>
    <div>
    <h1>Memo game</h1>
    <TopBar time={time} attempts={attempts} difficulty={difficulty} setDifficulty={state.setDifficulty} gameActive={gameActive}/>
    <button onClick={startGame}>start game</button>
    {gameActive? <> <button onClick={stopGame}>stop game</button> </> : null}
    </div>

    </>
  )
}

export default App
