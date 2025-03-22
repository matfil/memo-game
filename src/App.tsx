import './App.scss'
import React from 'react'
import TopBar from './components/topBar'
import useGameState, { GameState } from './hooks/gameState';
import Board from './components/board';

const App: React.FC = () =>{

  const state:GameState = useGameState();
  const time = useGameState((state) => state.time);
  const gameActive = useGameState((state) => state.gameActive);
  const difficulty = useGameState((state) => state.difficulty);
  const attempts = useGameState((state) => state.attempts);
  const cards = useGameState((state) => state.cards);
  const handleMove = state.handleMove;

  return (
    <>
    <div>
    <h1>Memo game</h1>
    <TopBar time={time} attempts={attempts} difficulty={difficulty} setDifficulty={state.setDifficulty} gameActive={gameActive}/>
    <div className='actions'>
    <button onClick={state.startGame} disabled={gameActive}>Start game</button>
    <button onClick={state.stopGame} disabled ={!gameActive}>Stop game</button>
    </div>
    {gameActive? <> <Board difficulty = {difficulty} cards = {cards} handleMove={handleMove} flipCard={state.flipCard}/> </> : null}
    
    </div>


    </>
  )
}

export default App
