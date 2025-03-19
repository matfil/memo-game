import { create } from "zustand";

export interface Card {
    id: number;
    src: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export interface GameState {
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