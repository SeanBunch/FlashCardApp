import React from "react";
import { useState } from "react";
import DeckList from "./DeckList";

function CardList({ deck }) {
    const [front, setFront] = useState(true);
    const [count, setCount] = useState(0);
    const {id, name, description, cards} = deck

console.log(front)


// need change handler for flip button
const flipHandler = () => {
   if(!front){
       setFront(true)
   } else{
    setFront(false)
   }
    
} 


// need change handler for next button
const nextHandler = () => {
    if(count < cards.length - 1) {
        setCount((count) => count + 1)
        // console.log("nextHandler:", count, cards.length - 1);

    }
}




// need an if statment check for array length and then return if length 3 or more and return for less than 3
    return(
        <div>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">
                        Card {count + 1} of 3

                    </h3>
                    <p className="card-text">
                        {cards[count].front}

                    </p>
                    <button onClick={flipHandler} className="btn btn-secondary mr-3">
                        Flip
                    </button>
                    
                    <button onClick={nextHandler} className="btn btn-primary">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardList;