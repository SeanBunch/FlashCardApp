import React from "react";
import { useState } from "react";
import DeckList from "./DeckList";

function CardList({ deck }) {
    const [front, setFront] = useState(true);
    const [count, setCount] = useState(0);
    const {id, name, description, cards} = deck
// console.log("CL line 4:", deck.cards.length);
// console.log("CL line 4:", deck.cards);

console.log(cards[0].front)
console.log(cards)


// need change handler for flip button
const flipHandler = () => {
    console.log(cards[count].front)
    
} 


// need change handler for next button
const nextHandler = () => {
    // let count = 0;
    // count += 1;
    setCount((count) => count + 1)
    console.log("hey", count);
    // return count;
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