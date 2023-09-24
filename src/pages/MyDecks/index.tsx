import React, { useEffect, useState } from "react";

import "./styles.css";
import { DeckType } from "../../types";
import { DeckThumb, Header, Modal } from "../../components";
import { getCardByCode } from "../../utils";
import { getLocalData, setLocalData } from "../../storage";

const MyDecks = () => {
  const [decks, setDecks] = useState<Array<DeckType>>([]);
  const [openCreateDeckModal, setOpenCreateDeckModal] =
    useState<boolean>(false);
  const [newDeckNameValue, setNewDeckNameValue] = useState("");
  const [newDeckDescriptionValue, setNewDeckDescriptionValue] = useState("");
  const [newDeckLeaderValue, setNewDeckLeaderValue] = useState("");
  const [newDeckCardsValue, setNewDeckCardsValue] = useState("");

  useEffect(() => {
    if (getLocalData("my_local_decks") !== undefined)
      setDecks(JSON.parse(getLocalData("my_local_decks")!));
  }, []);

  useEffect(() => {
    setLocalData("my_local_decks", JSON.stringify(decks));
  }, [decks]);

  const createDeckHandler = () => {
    var deckNameAlreadyExists = false;

    decks?.forEach((deck) => {
      if (deck.name === newDeckNameValue) deckNameAlreadyExists = true;
    });

    const leaderIsValid =
      getCardByCode(newDeckLeaderValue).category === "LEADER";

    if (!deckNameAlreadyExists && leaderIsValid) {
      const deckList = JSON.parse(newDeckCardsValue);
      if (!(decks?.length > 0))
        setDecks([
          {
            name: newDeckNameValue,
            description: newDeckDescriptionValue,
            leader: newDeckLeaderValue,
            cards: deckList,
          },
        ]);
      else
        setDecks([
          ...decks,
          {
            name: newDeckNameValue,
            description: newDeckDescriptionValue,
            leader: newDeckLeaderValue,
            cards: deckList,
          },
        ]);
    } else if (deckNameAlreadyExists && !leaderIsValid) {
      alert("The deck name already exists and the leader isn't valid!");
    } else if (!deckNameAlreadyExists && !leaderIsValid) {
      alert("The leader isn't valid!");
    } else if (deckNameAlreadyExists && leaderIsValid) {
      alert("The deck name already exists!");
    }
    setOpenCreateDeckModal(false)
  };

  const deleteDeck = (deckName: string) => {
    setDecks(decks.filter(deck => deck.name !== deckName))
  }

  return (
    <>
      <Header />
      <div className="decks-list-wrapper">
        {getLocalData("my_local_decks") === undefined ? (
          <p className="no-decks-founded-message">NO DECKS FOUNDED!</p>
        ) : (
          <>
            <div
              className="create-deck-thumb"
              onClick={() => setOpenCreateDeckModal(true)}
            >
              create deck
            </div>
            {decks?.map((deck) => {
              return <DeckThumb deck={deck} key={deck.name} deleteDeck={deleteDeck} />;
            })}
          </>
        )}
      </div>
      <Modal
        closeModal={() => setOpenCreateDeckModal(false)}
        isOpened={openCreateDeckModal}
        title="Create new deck"
      >
        <div className="create-deck-modal-inputs">
          <input
            type="text"
            name="Name"
            id="deck-name"
            placeholder="NAME"
            autoFocus
            onChange={(e) => setNewDeckNameValue(e.target.value)}
          />
          <textarea
            name="Description"
            id="deck-description"
            placeholder="DESCRIPTION"
            rows={5}
            cols={50}
            onChange={(e) => setNewDeckDescriptionValue(e.target.value)}
          />
          <input
            type="text"
            name="Leader"
            id="deck-leader"
            placeholder="LEADER"
            onChange={(e) => setNewDeckLeaderValue(e.target.value)}
          />
          <textarea
            name="Cards"
            id="deck-cards"
            placeholder="CARDS"
            rows={15}
            cols={50}
            onChange={(e) => setNewDeckCardsValue(e.target.value)}
          ></textarea>
        </div>
        <div className="create-deck-modal-button-wrapper">
          <button
            className="create-deck-modal-button"
            onClick={() => createDeckHandler()}
          >
            Create
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MyDecks;
