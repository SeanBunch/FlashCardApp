import React, {useState} from "react";
import { Link, useParams, useHistory } from "react-router-dom";

function CardList({ deck }) {
  const [front, setFront] = useState(true);
  const [index, setIndex] = useState(0);
  const { id, name, description, cards } = deck;
  const { deckId } = useParams();
  const history = useHistory();

  // need change handler for flip button
  const flipHandler = () => {
    if (!front) {
      setFront(true);
    } else {
      setFront(false);
    }
  };

  // need change handler for next button
  const nextHandler = () => {
    if (index === cards.length - 1) {
        window.confirm("Restart cards? Click 'Cancel' to return to the home page.") ? setIndex(0) : history.push("/");


    } else {
        setIndex((index) => index + 1);
        setFront(true);
    }
  };

  // need an if statment check for array length and then return if length 3 or more and return for less than 3

  if (cards.length > 2) {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Card {index + 1} of {cards.length}</h3>
            <p className="card-text">
              {front ? cards[index].front : cards[index].back}
            </p>
            <button onClick={flipHandler} className="btn btn-secondary mr-3">
              Flip
            </button>
            {front ? null : (
              <button onClick={nextHandler} className="btn btn-primary">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return(
        <div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Not enough cards.</h3>
            <p className="card-text">
              You need at least 3 cards to study. There are {cards.length} in this deck.
            </p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
              + Add Cards
            </Link>
          </div>
        </div>
      </div>
    )
  }

}

export default CardList;
