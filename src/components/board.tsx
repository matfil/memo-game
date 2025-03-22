import { useState } from "react";
import { CardInterface } from "../cardList";
import { Move } from "../hooks/gameState";
import Card from "./card";
import "./board.scss";

interface boardProps {
  difficulty: number;
  handleMove: (move: Move) => void;
  flipCard: (card: CardInterface) => void;
  cards: CardInterface[];
}


const board: React.FC<boardProps> = (props) => {
    
    const [clickedCards, setClickedCards] = useState<CardInterface[]>([]);
    const handleCardClick = (card:CardInterface) => {if(clickedCards.length === 0){
        setClickedCards([card]);
        props.flipCard(card);
      }else if(clickedCards.length === 1 && card.isFlipped === false){
        props.flipCard(card);
        props.handleMove({card1: clickedCards[0], card2: card});
        setClickedCards([]);
      }};
      

  return (
    <div className={"board-" + props.difficulty}>
      {props.cards.map((card, index) => { 
        return(
        <Card key={index} card={card} onClick={handleCardClick}/>
        );}
    )}
    </div>
  );
};

export default board;