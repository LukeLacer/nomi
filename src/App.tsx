import React, { useState } from "react";
import "./App.css";

import allcards from "./data/allcards.json";
import { CardType } from "./types";
import { Header, Modal, Card } from "./components";
import { strings } from "./helpers";

function App() {
  const [cards] = useState<Array<CardType>>(allcards.slice(0,11));
  const [localStorageWarningModal, setLocalStorageWarningModal] = useState<boolean>(true)

  return (
    <div className="App">
      <Header />
        <Modal closeModal={() => setLocalStorageWarningModal(false)} isOpened={localStorageWarningModal} title={strings.localStorageWarningModal.title}>
          <span>{strings.localStorageWarningModal.message}</span>
        </Modal>
      <div className="results-wrapper">
        {
          cards.map(card => {
            return (
              <Card card={card} />
            )
          })
        }
      </div>
    </div>
  )
}

export default App;
