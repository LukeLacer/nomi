import React from "react";
import "./styles.css"
import { strings } from "../../helpers";

const Header = () => {
    return <header className="header-container"><img src="./logo.png" alt="Nomi Logo" width="40px" />{strings.name}</header>
}

export default Header