import React, { useEffect, useState } from "react";

import "./styles.css";
import { DeckType } from "../../types";
import { useLocation } from "react-router-dom";
import { CardImage, Header } from "../../components";
import {
  sortCardsInDeck,
  getCardByCode,
  getHowManyCardsYouHaveInCollection,
  changesInDeckVersion,
} from "../../utils";
import { getLocalData } from "../../storage";

const OpenDeck = () => {
  const [deck, setDeck] = useState<DeckType>();

  const stateData = useLocation().state;

  var count = 0;

  useEffect(() => {
    setDeck(
      JSON.parse(getLocalData("my_local_decks")!).find(
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
            <CardImage
              code={deck?.leader}
              className="opened-deck-leader-image"
              style={{ height: "400px", width: "auto" }}
            />
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
              <tbody>
                {deck
                  ? sortCardsInDeck(deck).map((card, index) => {
                      const numberOfCardsInCollection =
                        getHowManyCardsYouHaveInCollection(card.code);
                      return (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              numberOfCardsInCollection! < card.numberOfCards
                                ? "#ffd0d0"
                                : "transparent",
                          }}
                        >
                          <td>{card.numberOfCards}</td>
                          <td>{getCardByCode(card.code).name}</td>
                          <td>{card.code}</td>
                          <td>{numberOfCardsInCollection}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
        <div className="opened-deck-list">
          {deck
            ? sortCardsInDeck(deck).map((card, index) => {
                count++;
                return (
                  <div className="cards-in-deck-wrapper" key={index}>
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
        {deck?.version! > 1 ? (
          <div className="old-versions-comparison">
            {deck?.oldVersions?.map((oldDeck, index) => {
              return (
                <div key={index}>
                  <div>
                    Version: {oldDeck.version + " > " + (oldDeck.version + 1)}
                  </div>
                  {oldDeck.version + 1 === deck.version
                    ? changesInDeckVersion(oldDeck, deck)?.map(
                        (change, index) => {
                          return (
                            <div key={index}>
                              {change.changeType +
                                ": " +
                                change.numberOfCards +
                                " " +
                                change.cardCode}
                            </div>
                          );
                        }
                      )
                    : changesInDeckVersion(
                        oldDeck,
                        deck.oldVersions!.filter(
                          (oldVersion) =>
                            oldVersion.version === oldDeck.version - 1
                        )[0]
                      )?.map((change, index) => {
                        return (
                          <div key={index}>
                            {change.changeType +
                              ": " +
                              change.numberOfCards +
                              " " +
                              change.cardCode}
                          </div>
                        );
                      })}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default OpenDeck;
