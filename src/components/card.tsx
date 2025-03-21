import { CardInterface } from "../cardList";

interface CardProps {
    card: CardInterface;
    onClick: (card:CardInterface) => void;
}


const card : React.FC<CardProps>  = (props) => {
    const handleOnClick = () => {props.onClick(props.card)};
    return (
        <>
        <div onClick={handleOnClick}>
            <h1>Card</h1>
        </div>
        </>
    );
}
export default card;