import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import Form from "./Form";

function AddCard() {
  const [card, setCard] = useState({ front: "", back: "", deckId: "", id: "" });
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const frontHandler = ({ target }) => {
    setCard({ ...card, front: target.value });
  };

  const backHandler = ({ target }) => {
    setCard({ ...card, back: target.value });
  };

  const submitHandler = async (event) => {
    await createCard(deckId, card);
    setCard({ front: "", back: "", cardId: "" });
    console.log("submited");
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
      
      <Form
        card={card}
        frontHandler={frontHandler}
        backHandler={backHandler}
        submitHandler={submitHandler}
      />
      <Link className="btn btn-secondary mr-3" to={`/decks/${deckId}`}>
        Done
      </Link>
      <button
        className="btn btn-primary "
        type="submit"
        onClick={submitHandler}
      >
        Save
      </button>
    </div>
  );
}

export default AddCard;
