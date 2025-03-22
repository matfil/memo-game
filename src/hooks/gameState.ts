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
  setAttempts: (attempts: number) => void;
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
  flipCard: (card: CardInterface) => void;
  matchCards: (card: CardInterface) => void;
  handleMove: (move: Move) => void;
  saveResults: () => void;
  resetGame: () => void;
}

function shuffle(array: CardInterface[]): CardInterface[] {
  return array.sort(() => Math.random() - 0.5);
}
function checkIfWon(cards: CardInterface[]): boolean {
  return cards.every((card) => card.isMatched);
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
  setAttempts: (attempts: number) => set({ attempts }),
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
    if (get().gameActive === false) {
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
    get().resetGame();
  },
  resetGame: () => {
    get().setGameActive(false);
    get().stopTimer();
    get().setCards([]);
    get().setMoves([]);
    get().setDifficulty(12);
    get().setTime(0);
    get().setAttempts(0);
  },
  newCardSet: () => {
    const randomCards = shuffle(cardList).slice(0, get().difficulty / 2);

    set({
      cards: [...randomCards, ...randomCards].map((card, index) => ({
        ...card,
        id: index,
      })),
    });
  },
  flipCard: (card: CardInterface) => {
    set((state: GameState) => {
      const cards = state.cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: !c.isFlipped } : c
      );
      return { cards };
    });
  },
  matchCards: (card: CardInterface) => {
    set((state: GameState) => {
      const cards = state.cards.map((c) =>
        c.index === card.index ? { ...c, isMatched: true } : c
      );
      return { cards };
    });
  },
  handleMove: (move: Move) => {
    get().addMove(move);
    get().incrementAttempts();
    if (move.card1.index === move.card2.index) {
      get().matchCards(move.card1);
    } else {
      setTimeout(() => {
        get().flipCard(move.card1);
        get().flipCard(move.card2);
      }, 500);
    }
    if (checkIfWon(get().cards)) {
      get().saveResults();
      get().stopGame();
    }
  },
  saveResults: () => {
    const savedResults = localStorage.getItem("results");
    const newResults = savedResults ? JSON.parse(savedResults) : [];
    const results = {
      date: new Date(),
      time: get().time,
      attempts: get().attempts,
      difficulty: get().difficulty,
    };
    newResults.push(results);
    localStorage.setItem("results", JSON.stringify(newResults));
  },
}));

export default useGameState;
