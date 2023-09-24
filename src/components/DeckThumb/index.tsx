import React, { useEffect, useState } from "react";
import "./styles.css"
import { DeckType } from "../../types";
import { CardImage } from "..";
import { useNavigate } from "react-router-dom";
import { getPercentageInCollection } from "../../utils";

type DeckThumbProps = {
    deck: DeckType;
    deleteDeck: Function;
}

const DeckThumb = (props: DeckThumbProps) => {
    const { deck, deleteDeck } = props

    const [percentageInCollection, setPercentageInCollection] = useState(0)

    useEffect(() => {
        setPercentageInCollection(getPercentageInCollection(deck))
    }, [deck])
    

    const navigate = useNavigate()

    const deckClickerHandler = (deckName: string) => {
        navigate("/opendeck", {
            state: { deckName: deckName},
          });
    }

    const deleteDeckHandler = () => {
        if (window.confirm("Do you have sure? Delete a deck is a irreversible action")) deleteDeck(deck.name)
    }

    const getBarBackgroundColor = (percentage: number) => {
        return percentage <= 25
            ? '#ff0000'
            : percentage <= 50
            ? '#ff9900'
            : percentage <= 75
            ? '#fFff00'
            : '#00ff00'
    }

    return (
        <div className="deck-wrapper">
            <div className="deck-buttons-wrapper">
                <button><img src="./system_icons/wrench-solid.svg" alt="Edit deck icon" /></button>
                <button onClick={() => deleteDeckHandler()}><img src="./system_icons/trash-solid.svg" alt="Delete deck icon" /></button>
            </div>
            <div className="deck-data-wrapper" onClick={() => deckClickerHandler(deck.name)}>
            <CardImage code={deck.leader} className='deck-leader-image' />
            <h2 className="deck-name">{deck.name}</h2>
            <p className="deck-description">{deck.description}</p>
            <div className="percentage-bar-wrapper">
            <div style={{ width: percentageInCollection + '%', backgroundColor: getBarBackgroundColor(percentageInCollection) }}></div>
                <span>{percentageInCollection}%</span>
            </div>
            </div>
        </div>
    )
}

export default DeckThumb