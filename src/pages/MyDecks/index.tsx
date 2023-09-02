import React, { useEffect, useState } from "react";

import "./styles.css";
import { DeckType } from "../../types";
import { DeckThumb, Header } from "../../components";

const zoro = {
  name: "Zorasso",
  description: "Deck Name: Red Zoro\nAuthor: Jose Santamaria\nDate: 8/28/2023\nCountry: Panama\nTournament: SB; Placement: 1st Place\nHost: Tap n Go(18)",
  cards: ["OP01-006","OP01-006","OP01-006","OP01-006","OP01-025","OP01-025","ST01-012","ST01-012","P-013","P-013","OP02-004","OP02-005","OP02-005","OP02-005","OP02-005","OP02-008","OP02-008","OP02-008","OP02-015","OP02-015","OP02-015","OP02-015","OP02-016","OP02-016","OP02-018","OP03-003","OP03-003","OP03-003","OP03-003","OP03-008","OP03-008","OP03-008","OP03-008","OP03-013","OP03-013","OP03-013","OP03-013","ST01-015","ST01-015","OP01-026","OP01-029","ST01-016","ST01-014","ST01-014","ST01-014","OP03-018","OP03-018","OP03-018","OP03-017","OP03-017"],
  leader: "OP01-001"
}
const law = {
  name:"Law Shambles",
  description: "Deck Name: Red Green Law\nAuthor: Kevin Roller\nDate: 8/27/2023\nCountry: Costa Rica\nTournament: Standard Battle; Placement: 1st Place\nHost: Omega Card Game",
  cards:["OP01-006","OP01-006","OP01-006","OP01-006","OP01-016","OP01-016","OP01-016","OP01-016","ST01-006","ST01-006","ST01-006","ST01-006","OP01-025","OP01-025","OP01-025","OP01-017","OP01-017","ST01-012","ST01-011","ST01-011","ST01-011","ST01-011","P-015","P-015","P-013","OP02-005","OP02-005","OP02-005","OP02-005","OP02-011","OP02-011","OP02-011","OP02-015","ST02-009","ST02-009","ST02-009","OP01-047","OP01-047","OP01-047","OP01-047","ST02-007","ST02-007","ST02-007","ST02-007","ST02-004","ST02-004","ST02-004","OP01-029","ST01-014","ST01-014"],
  leader: "OP01-002"
}

const MyDecks = () => {
  const [decks, setDecks] = useState<Array<DeckType>>();
  useEffect(() => {
    if (localStorage.getItem("my_local_decks") === null)
      localStorage.setItem('my_local_decks', JSON.stringify([ zoro, law ]))
    
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
          <>
            <div className="create-deck-thumb">create deck</div>
            {decks?.map((deck) => {
              return <DeckThumb deck={deck} key={deck.name} />;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default MyDecks;
