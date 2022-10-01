import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";

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
console.log(deck)

  const nameHandler = ({ target }) => {
    setDeck({...deck, name: target.value});
  };

  const descriptionHandler = ({ target }) => {
    setDeck({...deck, description: target.value});
  };

  const submitHandler = 

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <h2>Card Title</h2>
        </div>

        <label>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={deck.name}
          onChange={nameHandler}
        />

        <label>description</label>
        <textarea 
        id="description"
        type="text"
        name="description"
        value={deck.description}
        onChange={descriptionHandler}
        />
      </div>
    </div>
  );
}

export default EditDeck;
