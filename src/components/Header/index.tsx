import React from "react";
import "./styles.css"
import { strings } from "../../helpers"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()

    return <header className="header-container">
        <div className="brand-wrapper" onClick={() => navigate('/')}>
            <img src="./logo.png" alt="Nomi Logo" width="40px" />
            <span>{strings.name}</span>
        </div>
    </header>
}

export default Header