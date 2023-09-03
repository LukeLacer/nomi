import React, { useEffect, useState } from "react";

import "./styles.css";
import { DeckType } from "../../types";
import { useLocation } from "react-router-dom";
import { CardImage, Header } from "../../components";
import { countCardsInDeck, generateDeckList } from "../../utils";

const OpenDeck = () => {
  const [deck, setDeck] = useState<DeckType>();

  const stateData = useLocation().state;

  var count = 0;

  useEffect(() => {
    setDeck(
      JSON.parse(localStorage.getItem("my_local_decks")!).find(
        (deck: DeckType) => deck.name === stateData.deckName
      )
    );
  }, [stateData]);

  return (
    <>
      <Header />
      <div>
        <div className="deck-opened-top-info">
          <CardImage code={deck?.leader} className="opened-deck-leader-image" />
          <div>
            <div className="deck-opened-wrapper">
              <h2>{deck?.name}</h2>
              <div className="deck-desciption-wrapper">
                <span>Description</span>
                <p className="opened-deck-description">{deck?.description}</p>
              </div>
            </div>
          </div>
          <div>
            {deck ? generateDeckList(deck).map(card => <p>{card}</p>) : null}
          </div>
        </div>
        <div className="opened-deck-list">
          {deck
            ? countCardsInDeck(deck).map((card) => {
                count++;
                return (
                  <div className="cards-in-deck-wrapper">
                    {[...Array(card.numberOfCards)].map((e, i) => (
                      <CardImage
                        key={card.code + count + i}
                        code={card.code}
                        height="150px"
                      />
                    ))}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default OpenDeck;
