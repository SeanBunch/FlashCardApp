import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

function CreateDeck() {
  const history = useHistory();
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });

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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <h2>Create Deck</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label> <br />
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={newDeck.name}
            style={{ width: "100%" }}
            className="form-control"
          />
        </div>

        <br />

        <div className="form-group">
          <label>Description:</label>

          <br />

          <textarea
            id="description"
            type="textarea"
            name="description"
            onChange={handleChange}
            value={newDeck.description}
            style={{ width: "100%" }}
            className="form-control"
          />
        </div>

        <Link to="/" className="btn btn-secondary mr-3">
          Cancel
        </Link>

        <button 
        className="btn btn-primary"
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
