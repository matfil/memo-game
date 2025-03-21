interface boardProps{
    difficulty:number;
    handleMove:() => void;  
}

const board:React.FC<boardProps> = (props) =>{
    return(
        <div>
            <h1>Board</h1>
        </div>
    )
}