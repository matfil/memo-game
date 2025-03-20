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
}

const useGameState = create((set) => ({
    moves: [],
    setMoves: (moves:move[]) => set({ moves }),
    addMove: (move:move) => set((state:GameState) => ({ moves: [...state.moves, move] })),
    cards: [],
    setCards: (cards:Card[]) => set({ cards }),
    gameActive: false,
    setGameActive: (gameActive:boolean) => set({ gameActive }),
    attempts: 0,
    incrementAttempts: () => set((state:GameState) => ({ attempts: state.attempts + 1 })),
    difficulty: 6,
    setDifficulty: (difficulty:number) => set({ difficulty }),
    time: 0,
    setTime: (time:number) => set({ time }),
}));