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
      window.confirm(
        "Delete this deck? You will not be able to recover it."
      )
    ) {
      await deleteDeck(id);
      history.push("/");
    } 
    else {
      history.go(0);
    }
  };

  if (!deck || !cards) {
    return (
      <div  role="status">
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div>
        <nav>
          <ol>
            <li>
              <Link to={"/"}>Home</Link>
            </li>

            <li>{name}</li>
          </ol>
        </nav>

        <div className="card">
          <div className="card-body">
            
            <div>
              <h5 className="card-title">{name}</h5>
            </div>

            <p>{description}</p>

            <div>
              
              <Link to={`/decks/${id}/edit`}>
                Edit
              </Link>

              
              <Link to={`/decks/${id}/study`} >
                Study
              </Link>

              
              <Link to={`/decks/${id}/cards/new`}>
                Add Cards
              </Link>

              
              <button
                onClick={deleteHandler}
                name="delete"
                value={id}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div>
          <h1>Cards</h1>
        </div>

        {cards.map((card, index) => (
          <div className="row" key={index}>
            <div className="col">
              <div className="card">
                <div className="row card-body">
                  
                  <p>{card.front}</p>

                  
                  <p>{card.back}</p>
                </div>

                <div>
                  
                  <Link to={`${url}/cards/${card.id}/edit`}>
                    Edit
                  </Link>

                  <button
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Delete this deck? You will not be able to recover it."
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
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Deck;