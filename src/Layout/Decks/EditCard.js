import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";

function EditCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const { deckId } = useParams();
  const { cardId } = useParams();

  const frontHandler = ({ target }) => {
    setCard({ ...card, front: target.value });
  };
  const backHandler = ({ target }) => {
    setCard({...card, back: target.value});
  };

  const submitHandler = async (event) => {
    await updateCard(card);
    console.log("submitted")
  }

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

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Front</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                value={card.front}
                onChange={frontHandler}
              />
            </div>
            <div className="form-group">
              <label>Back</label>
              <textarea
                className="form-control"
                id="description"
                type="text"
                name="description"
                value={card.back}
                onChange={backHandler}
              />
            </div>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCard;
