import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardList from "./Decks/CardList";

function Study() {
    const [ deck, setDeck ] = useState({cards:[]});
    const { deckId } = useParams();


    useEffect(() => {
      async function loadCards() {
        const response = await readDeck(deckId);
        setDeck(response);
      }
      
      loadCards();
    }, [deckId])
    

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck Name</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      <div>
        <h1>Study: {deck.name}</h1>
      </div>
      
      <CardList deck={deck}/>
      
    </div>
  );
}
export default Study;
