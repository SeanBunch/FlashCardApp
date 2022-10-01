import React from "react";
import { useHistory, Link } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function DeckList({ deck }) {
  const { id, name, description, cards } = deck;
  const deckLength = cards.length;
  const history = useHistory();

  const deleteHandler = async () => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      await deleteDeck(id);
      history.go(0);
    } else {
      history.go(0);
    }
  };

  return (
    <div className="card w-75 mb-4">
      <div className="card-body">
        <div className="row px-3">
          <h5 className="card-title">{name}</h5>
          <p className="ml-auto">{deckLength} cards</p>
        </div>
        <p className="card-text">{description}</p>
        <div className="row px-3">
          <Link to={`/decks/${id}`} className="btn btn-secondary">
            View
          </Link>

          <Link to={`/decks/${id}/study`} className="btn btn-primary ml-3">
            Study
          </Link>

          <button
            onClick={deleteHandler}
            name="delete"
            value={id}
            className="btn btn-danger ml-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeckList;
