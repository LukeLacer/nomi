import React from "react";
import "./styles.css";
import { strings } from "../../helpers";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header-container">
      <div className="brand-wrapper" onClick={() => navigate("/")}>
        <img src="./logo.png" alt="Nomi Logo" width="40px" />
        <span>{strings.name}</span>
      </div>
      <div className="navbar-wrapper">
        <button className="mydecks navbar-button" onClick={() => navigate("/mydecks")}>My Decks</button>
        <button className="mycollection navbar-button" onClick={() => navigate("/mycollection")}>My Collection</button>
      </div>
    </header>
  );
};

export default Header;
