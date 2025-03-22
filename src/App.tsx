import './App.scss'
import React from 'react'
import TopBar from './components/topBar'
import useGameState, { GameState, Move } from './hooks/gameState';
import Board from './components/board';

const App: React.FC = () =>{

  const state:GameState = useGameState();
  const time = useGameState((state) => state.time);
  const gameActive = useGameState((state) => state.gameActive);
  const difficulty = useGameState((state) => state.difficulty);
  const attempts = useGameState((state) => state.attempts);
  const cards = useGameState((state) => state.cards);

  const handleMove = (move: Move) => {
    state.addMove(move);
    state.incrementAttempts();
    if(move.card1.index === move.card2.index){
    state.matchCards(move.card1);
    }else{
      setTimeout(() => {
        state.flipCard(move.card1);
        state.flipCard(move.card2);
      }, 500);
    }
  };

  return (
    <>
    <div>
    <h1>Memo game</h1>
    <TopBar time={time} attempts={attempts} difficulty={difficulty} setDifficulty={state.setDifficulty} gameActive={gameActive}/>
    <button onClick={state.startGame}>start game</button>
    {gameActive? <> <button onClick={state.stopGame}>stop game</button> </> : null}
    {gameActive? <> <Board difficulty = {difficulty} cards = {cards} handleMove={handleMove} flipCard={state.flipCard}/> </> : null}
    
    </div>


    </>
  )
}

export default App
