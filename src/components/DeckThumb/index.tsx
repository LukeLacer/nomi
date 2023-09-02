import React from "react";
import "./styles.css"
import { DeckType } from "../../types";
import { CardImage } from "..";
import { useNavigate } from "react-router-dom";

type DeckThumbProps = {
    deck: DeckType;
}

const DeckThumb = (props: DeckThumbProps) => {
    const { name, description, leader} = props.deck

    const navigate = useNavigate()

    const deckClickerHandler = (deckName: string) => {
        navigate("/opendeck", {
            state: { deckName: deckName},
          });
    }

    return (
        <div className="deck-wrapper" onClick={() => deckClickerHandler(name)}>
            <CardImage code={leader} className='deck-leader-image' />
            <h2 className="deck-name">{name}</h2>
            <p className="deck-description">{description}</p>
        </div>
    )
}

export default DeckThumb