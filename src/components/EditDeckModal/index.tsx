import React, { useEffect, useState } from "react";
import { Modal } from "../";
import { DeckType } from "../../types";
import { convertDecklistToString, convertStringToDecklist } from "../../utils";

type EditDeckModalType = {
  deck: DeckType | undefined;
  saveEditedDeck: Function;
  closeModal: Function;
  isOpened: boolean;
};

const EditDeckModal = ({
  deck,
  saveEditedDeck,
  closeModal,
  isOpened,
}: EditDeckModalType) => {
  const [editDeckNameValue, setEditDeckNameValue] = useState("");
  const [editDeckDescriptionValue, setEditDeckDescriptionValue] = useState("");
  const [editDeckLeaderValue, setEditDeckLeaderValue] = useState("");
  const [editDeckCardsValue, setEditDeckCardsValue] = useState("");

  useEffect(() => {
    if (deck) {
      const { name, description, leader, cards } = deck;
      setEditDeckNameValue(name);
      setEditDeckDescriptionValue(description);
      setEditDeckLeaderValue(leader);
      setEditDeckCardsValue(convertDecklistToString(cards));
    }
  }, [deck]);

  const editDeckHandler = () => {
    if (deck) {
      if (window.confirm("Do you have sure? This action is irreversible"))
        saveEditedDeck({
          name: editDeckNameValue,
          description: editDeckDescriptionValue,
          leader: editDeckLeaderValue,
          cards: convertStringToDecklist(editDeckCardsValue),
          version: deck.version + 1,
          oldVersions: [...deck.oldVersions!, {
            name: deck.name,
            description: deck.description,
            leader: deck.leader,
            cards: deck.cards,
            version: deck.version
          }],
        });
      closeModal();
    }
  };

  return (
    <Modal closeModal={closeModal} isOpened={isOpened} title="Edit deck">
      <div className="create-deck-modal-inputs">
        <input
          type="text"
          name="Name"
          id="deck-name"
          placeholder="NAME"
          autoFocus
          value={editDeckNameValue}
          onChange={(e) => setEditDeckNameValue(e.target.value)}
        />
        <textarea
          name="Description"
          id="deck-description"
          placeholder="DESCRIPTION"
          rows={5}
          cols={50}
          value={editDeckDescriptionValue}
          onChange={(e) => setEditDeckDescriptionValue(e.target.value)}
        />
        <input
          type="text"
          name="Leader"
          id="deck-leader"
          placeholder="LEADER"
          value={editDeckLeaderValue}
          onChange={(e) => setEditDeckLeaderValue(e.target.value)}
        />
        <textarea
          name="Cards"
          id="deck-cards"
          placeholder="CARDS"
          rows={15}
          cols={50}
          value={editDeckCardsValue}
          onChange={(e) => setEditDeckCardsValue(e.target.value)}
        ></textarea>
      </div>
      <div className="create-deck-modal-button-wrapper">
        <button
          className="create-deck-modal-button"
          onClick={() => editDeckHandler()}
        >
          Edit
        </button>
      </div>
    </Modal>
  );
};

export default EditDeckModal;
