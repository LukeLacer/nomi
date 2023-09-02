import React from "react";

const CardImage = (props: any) => {
    const { code, ...otherprops } = props
    return (
        <img
            src={"https://en.onepiece-cardgame.com/images/cardlist/card/" + code + ".png"}
            alt={code + " card image"}
            {...otherprops}
        />
    )
}

export default CardImage