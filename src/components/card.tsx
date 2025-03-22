import { CardInterface } from "../cardList";
import './card.scss';
interface CardProps {
    card: CardInterface;
    onClick: (card:CardInterface) => void;
}


const card : React.FC<CardProps>  = (props) => {
    const handleOnClick = () => {props.onClick(props.card)};
    return (
        <>
        <div className="card" onClick={handleOnClick}>
            {props.card.isFlipped ? <img src={props.card.src} alt={'Card '+props.card.index.toString()} /> : <img src={'./images/back.svg'} alt="back" />}
            
        </div>
        </>
    );
}
export default card;