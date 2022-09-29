import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardList from "./Decks/CardList";

function Study() {
    const [ deck, setDeck ] = useState({cards:[0]});
    const { deckId } = useParams();
    // console.log("line 8", deck.cards);
    // console.log("line 8");
    
    useEffect(() => {
      async function loadCards() {
        const response = await readDeck(deckId);
        // const apiData = await response.json();
        setDeck(response);
        //   console.log("line 15", response);
      }
      
      loadCards();
    }, [deckId])
    
    // console.log("line 8", deck.cards);

  return (
    <div>
      <nav>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/">Deck Name</Link>
          </li>
        </ol>
      </nav>

      <div>
        <h1>ima study component</h1>
      </div>
      
      <CardList deck={deck}/>
      
    </div>
  );
}
export default Study;
