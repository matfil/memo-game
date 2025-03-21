import { create } from "zustand";
import cardList, { CardInterface } from "../cardList";

export interface Move {
  card1: CardInterface;
  card2: CardInterface;
}

export interface GameState {
  moves: Move[];
  setMoves: (moves: Move[]) => void;
  addMove: (move: Move) => void;
  cards: CardInterface[];
  setCards: (cards: CardInterface[]) => void;
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
  newCardSet: () => void;
}

function shuffle(array: CardInterface[]): CardInterface[] {
  return array.sort(() => Math.random() - 0.5);
}

const useGameState = create<GameState>((set, get) => ({
  moves: [],
  setMoves: (moves: Move[]) => set({ moves }),
  addMove: (move: Move) =>
    set((state: GameState) => ({ moves: [...state.moves, move] })),
  cards: [],
  setCards: (cards: CardInterface[]) => set({ cards }),
  gameActive: false,
  setGameActive: (gameActive: boolean) => set({ gameActive }),
  attempts: 0,
  incrementAttempts: () =>
    set((state: GameState) => ({ attempts: state.attempts + 1 })),
  difficulty: 12,
  setDifficulty: (difficulty: number) => {
    console.log(difficulty);
    set({ difficulty });
  },
  time: 0,
  incrementTime: () => set((state: GameState) => ({ time: state.time + 1 })),
  setTime: (time: number) => set({ time }),
  timeInterval: 0,
  startTimer: () =>
    set((state: GameState) => ({
      timeInterval: window.setInterval(() => state.incrementTime(), 1000),
    })),
  stopTimer: () =>
    set((state: GameState) => {
      clearInterval(state.timeInterval);
      return { time: 0, timeInterval: 0 };
    }),
  startGame: () => {
    if (get().gameActive) {
      {
        get().newCardSet();
        get().setMoves([]);
        get().setGameActive(true);
        get().startTimer();
      }
    }
  },
  stopGame: () => {
    get().setGameActive(false);
    get().stopTimer();
  },
  newCardSet: () => {
    const randomCards = shuffle(cardList).slice(0, get().difficulty / 2);

    set({
      cards: [...randomCards, ...randomCards].map((card, index) => ({
        ...card,
        id: index,
      }))
    });
  },
}));

export default useGameState;
