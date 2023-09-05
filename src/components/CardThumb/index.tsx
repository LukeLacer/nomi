import React from "react";
import "./styles.css"
import { CardType } from "../../types";
import { CardImage } from "..";
import { getHowManyCardsYouHaveInCollection } from "../../utils";

type CardThumbProps = {
    card: CardType
}

const CardThumb = (props: CardThumbProps) => {
    const { code, name, attribute, power, color, counter, types, effects, rarity, category, cost, life } = props.card
    return (
        <div className="card-wrapper">
            <div className="card-image-wrapper">
                <CardImage code={code} width="100%" loading="lazy"/>
            </div>
            <div className="more-info-wrapper">
                <div className="card-title-wrapper"><span>{name}</span></div>
                <div className="more-details-wrapper">
                    <span>{code}</span>
                    <span>{rarity}</span>
                    <span>{category}</span>
                </div>
                <div className="card-basic-info-wrapper">
                    <div className="card-colors-wrapper">
                    {color.map(color => <span>{color}</span>)}
                    </div>
                    {attribute !== 'false' ? <><span className="card-attribute"><img src={"./card_types/"+attribute.toLowerCase()+".png"} alt={attribute + " icon"} /> {attribute}</span></> : null}
                </div>
                <div className="card-detailed-info-wrapper">
                    {power !== 'false' ? <div><span className="card-info-label">Power</span><span>{power}</span></div> : null}
                    {counter !== 'false' ? <div><span className="card-info-label">Counter</span><span>{counter}</span></div> : null}
                    {cost !== 'false' ? <div><span className="card-info-label">Cost</span><span>{cost}</span></div> : null}
                    {life !== 'false' ? <div><span className="card-info-label">Life</span><span>{life}</span></div> : null}
                </div>
                <div className="card-types-wrapper">
                    <span className="card-info-label">TYPES</span>
                    <div className="card-types-data-wrapper"> {types.map(type => <span>{type}</span>)} </div>
                </div>
                <div className="quantity-in-collection">
                    <span>Quantity in collection</span><span>{getHowManyCardsYouHaveInCollection(code)}</span>
                </div>
                <div className="card-effects-wrapper">
                    <span className="card-info-label">EFFECTS</span>
                    <span>{effects !== 'false' ? effects : 'No effects'}</span>
                </div>
            </div>
        </div>
    )
}

export default CardThumb