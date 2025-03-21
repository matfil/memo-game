import { useState } from "react";
import { CardInterface } from "../cardList";
import { Move } from "../hooks/gameState";
import Card from "./card";

interface boardProps {
  difficulty: number;
  handleMove: (move: Move) => void;
  cards: CardInterface[];
}

const [clickedCards, setClickedCards] = useState<CardInterface[]>([]);

const board: React.FC<boardProps> = (props) => {

    const handleCardClick = (card:CardInterface) => {if(clickedCards.length === 0){
        setClickedCards([card]);
      }else if(clickedCards.length === 1){
        props.handleMove({card1: clickedCards[0], card2: card});
        setClickedCards([]);
      }};
      

  return (
    <div className={"board-" + props.difficulty}>
      {props.cards.map((card) => { 
        return(<>
        <Card card={card} onClick={handleCardClick}/>
        </>);}
    )}
    </div>
  );
};

export default board;