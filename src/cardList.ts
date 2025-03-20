export interface Card {
    id: number;
    src: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const cardList : Card[] = [
    {id: 1, src: "images/1.png", isFlipped: false, isMatched: false},
    {id: 2, src: "images/2.png", isFlipped: false, isMatched: false},
    {id: 3, src: "images/3.png", isFlipped: false, isMatched: false},
    {id: 4, src: "images/4.png", isFlipped: false, isMatched: false},
    {id: 5, src: "images/5.png", isFlipped: false, isMatched: false},
    {id: 6, src: "images/6.png", isFlipped: false, isMatched: false},
];

export default cardList;