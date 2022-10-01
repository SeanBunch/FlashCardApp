import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, readDeck, deleteDeck } from "../../utils/api/index";

function Deck() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id, name, description, cards } = deck;

  useEffect(() => {
    const abortController = new AbortController();
    const deckData = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    };
    deckData();
    return () => abortController.abort();
  }, [deckId]);

  const deleteHandler = async () => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      await deleteDeck(id);
      history.push("/");
    } else {
      history.go(0);
    }
  };

  if (!deck || !cards) {
    return (
      <div role="status">
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="col-9 mx-auto">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>

            <li className="breadcrumb-item">{name}</li>
          </ol>
        </nav>

        <div className="card border-0 mb-4">
          <div className="card-body">
            <div>
              <h2 className="card-title">{name}</h2>
            </div>

            <p>{description}</p>

            <div>
              <Link className="btn btn-secondary ml-3" to={`/decks/${id}/edit`}>
                Edit
              </Link>

              <Link className="btn btn-primary ml-3" to={`/decks/${id}/study`}>
                Study
              </Link>

              <Link
                className="btn btn-primary ml-3"
                to={`/decks/${id}/cards/new`}
              >
                Add Cards
              </Link>

              <button
                className="btn btn-danger ml-auto"
                onClick={deleteHandler}
                name="delete"
                value={id}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="row pl-3 pb-2">
          <h1>Cards</h1>
        </div>

        {cards.map((card, id) => (
          <div className="card" key={id}>
            <div className="card-body">
              <p>{card.front}</p>

              <p>{card.back}</p>
            </div>

            <div className="d-flex justify-content-end p-4">
              <Link
                className="btn btn-secondary mr-3"
                to={`${url}/cards/${card.id}/edit`}
              >
                Edit
              </Link>

              <button
                onClick={async () => {
                  if (
                    window.confirm(
                      "Delete this card? You will not be able to recover it."
                    )
                  ) {
                    await deleteCard(card.id);
                    history.go(0);
                  } else {
                    history.go(0);
                  }
                }}
                name="deleteCard"
                value={card.id}
                className="btn btn-danger ml-3"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Deck;
