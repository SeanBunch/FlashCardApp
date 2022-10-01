import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";

function AddCard() {
  //  useState to hold form input values
  const [newCard, setNewCard] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  const frontHandler = ({ target }) => {
    setNewCard({ ...newCard, front: target.value });
  };

  const backHandler = ({ target }) => {
    setNewCard({ ...newCard, back: target.value });
  };

  // POST request to the api passing in the useState that holds the input values
  // POST request maybe in the submittHandler

  // submit handler
  const saveHandler = async (event) => {
    // event.preventDefault();
    await createCard(deckId, newCard);
    setNewCard({ front: "", back: "", cardId: "" });
  };

  // useEffect(() =>{
  //   async function getDeck() {
  //     const response = await readDeck(deckId)
  //     setDeck(response);
  //   }
  //   getDeck();
  // }, [deckId])
  // console.log("line 38 deck:",deck)

  // done button If the user clicks Done, the user is taken to the Deck screen

  return (
    // nav bar

    // render a form with <textarea> tag

    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item">
            <Link to="/">Deck Name</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <h3>Deck name goes here dynamicaly: Add Card</h3>

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
