import React, { useEffect, useState } from "react";

import "./styles.css";
import { DeckType } from "../../types";
import { useLocation } from "react-router-dom";
import { CardImage, Header } from "../../components";

const OpenDeck = () => {
  const [deck, setDeck] = useState<DeckType>();

  const stateData = useLocation().state;

  var count = 0;

  useEffect(() => {
    console.log(stateData);
    setDeck(JSON.parse(localStorage.getItem(stateData.deckName)!));
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
        </div>
        <div className="opened-deck-list">
          {deck?.cards.map((card) => {
            count++;
            return <CardImage key={card + count} code={card} width="100px" />;
          })}
        </div>
      </div>
    </>
  );
};

export default OpenDeck;
