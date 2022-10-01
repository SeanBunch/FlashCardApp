import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import CreateDeck from "./Decks/CreateDeck";
import Deck from "./Decks/Deck";
import Study from "./Study";
import AddCard from "./Decks/AddCard";
import NotFound from "./NotFound";
import EditDeck from "./Decks/EditDeck";
import EditCard from "./Decks/EditCard";

function Layout() {
  return (
    <div className="Layout">
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path={`/decks/:deckId/cards/new`}>
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
