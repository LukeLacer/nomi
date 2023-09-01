import React, { ReactNode } from "react";
import "./styles.css"

type TooltipProps = {
    children: ReactNode,
}

const Tooltip = (props: TooltipProps) => {
    const { children } = props

    return <span className="tooltiptext">{children}</span>
}

export default Tooltip