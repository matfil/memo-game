export interface CardInterface {
    index: number;
    src: string;
    isFlipped: boolean;
    isMatched: boolean;
    id?: number;
}

const cardList : CardInterface[] = [
    {index: 1, src: "images/1.png", isFlipped: false, isMatched: false},
    {index: 2, src: "images/2.png", isFlipped: false, isMatched: false},
    {index: 3, src: "images/3.png", isFlipped: false, isMatched: false},
    {index: 4, src: "images/4.png", isFlipped: false, isMatched: false},
    {index: 5, src: "images/5.png", isFlipped: false, isMatched: false},
    {index: 6, src: "images/6.png", isFlipped: false, isMatched: false},
];

export default cardList;