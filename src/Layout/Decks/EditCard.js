import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import Form from "./Form";

function EditCard() {
  const [deck, setDeck] = useState({
    name: "",
    description: "",
    id: "",
    cards: [],
  });
  const [card, setCard] = useState({ front: "", back: "", deckId: "", id: "" });
  const { deckId } = useParams();
  const { cardId } = useParams();
  const history = useHistory();

  const frontHandler = ({ target }) => {
    setCard({ ...card, front: target.value });
  };
  const backHandler = ({ target }) => {
    setCard({ ...card, back: target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await updateCard(card);
    history.goBack();
  };

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, [deckId]);

  useEffect(() => {
    async function getCard() {
      const response = await readCard(cardId);
      setCard(response);
    }
    getCard();
  }, [cardId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h2>Edit Card</h2>
          </div>

          <Form
            card={card}
            frontHandler={frontHandler}
            backHandler={backHandler}
          />

          <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-3">
            Cancel
          </Link>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCard;
