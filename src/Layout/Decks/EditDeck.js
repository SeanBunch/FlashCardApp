import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";

function EditDeck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, [deckId]);

  const nameHandler = ({ target }) => {
    setDeck({ ...deck, name: target.value });
  };

  const descriptionHandler = ({ target }) => {
    setDeck({ ...deck, description: target.value });
  };

  const submitHandler = async (event) => {
    await updateDeck(deck);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h2>Edit Deck</h2>
          </div>

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                value={deck.name}
                onChange={nameHandler}
              />
            </div>
            <div className="form-group">
              <label>description</label>
              <textarea
                className="form-control"
                id="description"
                type="text"
                name="description"
                value={deck.description}
                onChange={descriptionHandler}
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

export default EditDeck;
