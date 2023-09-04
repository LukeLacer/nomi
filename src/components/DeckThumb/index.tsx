import React, { useEffect, useState } from "react";
import "./styles.css"
import { DeckType } from "../../types";
import { CardImage } from "..";
import { useNavigate } from "react-router-dom";
import { getPercentageInCollection } from "../../utils";

type DeckThumbProps = {
    deck: DeckType;
}

const DeckThumb = (props: DeckThumbProps) => {
    const { deck } = props

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
        <div className="deck-wrapper" onClick={() => deckClickerHandler(deck.name)}>
            <CardImage code={deck.leader} className='deck-leader-image' />
            <h2 className="deck-name">{deck.name}</h2>
            <p className="deck-description">{deck.description}</p>
            <div className="percentage-bar-wrapper">
            <div style={{ width: percentageInCollection + '%', backgroundColor: getBarBackgroundColor(percentageInCollection) }}></div>
                <span>{percentageInCollection}%</span>
            </div>
        </div>
    )
}

export default DeckThumb