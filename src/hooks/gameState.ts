import { create } from "zustand";
import { Card } from "../cardList";

export interface Coords {
    x: number;
    y: number;
}
export interface move {
    coords1: Coords;
    coords2: Coords;
}

export interface GameState {
    moves: move[];
    setMoves: (moves: move[]) => void;
    addMove: (move: move) => void;
    cards: Card[];
    setCards: (cards: Card[]) => void;
    gameActive: boolean;
    setGameActive: (gameActive: boolean) => void;
    attempts: number;
    incrementAttempts: () => void;
    difficulty: number;
    setDifficulty: (difficulty: number) => void;
    time: number;
    setTime: (time: number) => void;
    incrementTime: () => void;
    timeInterval: number;
    startTimer: () => void;
    stopTimer: () => void;
    startGame: () => void;
    stopGame: () => void;

}

const useGameState = create<GameState>((set, get) => ({
    moves: [],
    setMoves: (moves:move[]) => set({ moves }),
    addMove: (move:move) => set((state:GameState) => ({ moves: [...state.moves, move] })),
    cards: [],
    setCards: (cards:Card[]) => set({ cards }),
    gameActive: false,
    setGameActive: (gameActive:boolean) => set({ gameActive }),
    attempts: 0,
    incrementAttempts: () => set((state:GameState) => ({ attempts: state.attempts + 1 })),
    difficulty: 12,
    setDifficulty: (difficulty:number) => {console.log(difficulty); set({ difficulty })},
    time: 0,
    incrementTime: () => set((state:GameState) => ({ time: state.time + 1 })),
    setTime: (time:number) => set({ time }),
    timeInterval: 0,
    startTimer: () => set((state:GameState) => ({ timeInterval: window.setInterval(() => state.incrementTime(), 1000) })),
    stopTimer: () => set((state:GameState) => { clearInterval(state.timeInterval); return { time: 0, timeInterval: 0 } }),
    startGame: () => { if(get().gameActive) {{get().setGameActive(true); get().startTimer();}}},
    stopGame: () => { get().setGameActive(false); get().stopTimer(); },

}));

export default useGameState;