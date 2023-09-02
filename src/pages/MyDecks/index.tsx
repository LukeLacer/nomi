import React, { useEffect, useState } from "react";

import "./styles.css";
import { DeckType } from "../../types";
import { DeckThumb, Header } from "../../components";

const MyDecks = () => {
  const [decks, setDecks] = useState<Array<DeckType>>();
  useEffect(() => {
    if (!localStorage.getItem("my_local_decks") === null)
      setDecks(JSON.parse(localStorage.getItem("my_local_decks")!));
  }, []);

  useEffect(() => {
    decks?.forEach((deck) => {
      localStorage.setItem(deck.name, JSON.stringify(deck));
    });
  }, [decks]);

  return (
    <>
      <Header />
      <div className="decks-list-wrapper">
        {localStorage.getItem("my_local_decks") === null ? (
          <p className="no-decks-founded-message">NO DECKS FOUNDED!</p>
        ) : (
          decks?.map((deck) => {
            return <DeckThumb deck={deck} key={deck.name} />;
          })
        )}
      </div>
    </>
  );
};

export default MyDecks;
