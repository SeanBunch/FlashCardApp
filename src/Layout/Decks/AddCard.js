import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";

function AddCard() {
  const [newCard, setNewCard] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  const frontHandler = ({ target }) => {
    setNewCard({ ...newCard, front: target.value });
  };

  const backHandler = ({ target }) => {
    setNewCard({ ...newCard, back: target.value });
  };

  const saveHandler = async (event) => {
    await createCard(deckId, newCard);
    setNewCard({ front: "", back: "", cardId: "" });
  };

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item">
            <Link to="/">{deck.name}</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <h3>{deck.name}: Add Card</h3>

      <form>
        <div>
          <label>Front</label>
          <textarea
            id="front"
            type="textarea"
            name="front"
            onChange={frontHandler}
            placeholder="Front side of card"
            style={{ width: "100%" }}
          />
        </div>
        <br />
        <div>
          <label>Back</label>
          <textarea
            id="back"
            type="textarea"
            name="back"
            onChange={backHandler}
            placeholder="Back side of card"
            style={{ width: "100%" }}
          />
        </div>

        <button
          className="btn btn-primary mr-3"
          type="submit"
          onClick={saveHandler}
        >
          Save
        </button>
        <Link className="btn btn-secondary" to={`/decks/${deckId}`}>
          Done
        </Link>
      </form>
    </div>
  );
}

export default AddCard;
