import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

function CreateDeck() {
const history = useHistory();
const [newDeck, setNewDeck] = useState({name: "", description: ""});
// console.log(history)

async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
  }

const handleChange = (event) => {
    setNewDeck({ ...newDeck, [event.target.name]: event.target.value });
};

return (
    <div>
      <nav>
        <ol>

          <li>
            <Link to="/">Home</Link>
          </li>

          <li> 
            Create Deck
          </li>

        </ol>
      </nav>
      
      <h2>Create Deck</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label> <br />
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={newDeck.name}
            style={{ width: "100%" }}
          />
        </div>

        <br />

        <div>
          <label>Description:</label>

          <br />

          <textarea
            id="description"
            type="textarea"
            name="description"
            onChange={handleChange}
            value={newDeck.description}
            style={{ width: "100%" }}
          />

        </div>

        <Link to="/">
          Cancel
        </Link>
        
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>

      </form>
    </div>
  );
}

export default CreateDeck;