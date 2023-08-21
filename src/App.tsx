import React, { useState } from "react";
import "./App.css";

import allcards from "./data/allcards.json";
import { Card } from "./types";

function App() {
  const [cards] = useState<Array<Card>>(allcards);
  return (
    <div className="App">
      Testando
      <img src="./logo.png" alt="Nomi Logo" />
      <div>
        {
          cards.map(card => {
            return (
              <div>
                <img src={"https://en.onepiece-cardgame.com/images/cardlist/card/" + card.code + ".png"} alt="" width="100px"/>
                {card.name}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
