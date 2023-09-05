import React, { useEffect, useState } from "react";

import "./styles.css";
import { DeckType } from "../../types";
import { useLocation } from "react-router-dom";
import { CardImage, Header } from "../../components";
import { countCardsInDeck, getCardByCode, getHowManyCardsYouHaveInCollection } from "../../utils";

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
          <div>
          <CardImage code={deck?.leader} className="opened-deck-leader-image" style={{ height: '400px', width: 'auto' }} />
          </div>
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
            <table className="decklist-table">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Quantity in Collection</th>
                </tr>
              </thead>
                {deck
                  ? countCardsInDeck(deck).map((card) => {
                      const numberOfCardsInCollection = getHowManyCardsYouHaveInCollection(card.code)
                      return (
                        <tr style={{ backgroundColor: numberOfCardsInCollection! < card.numberOfCards ? '#ffd0d0' : 'transparent' }}>
                          <td>{card.numberOfCards}</td>
                          <td>{getCardByCode(card.code).name}</td>
                          <td>{card.code}</td>
                          <td>{numberOfCardsInCollection}</td>
                        </tr>
                      );
                    })
                  : null}
            </table>
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
