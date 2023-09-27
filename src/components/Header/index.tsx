import React, { ReactElement } from "react";
import "./styles.css";
import { strings } from "../../helpers";
import { useNavigate } from "react-router-dom";

type HeaderPropType = {
  navBarButtons?: ReactElement[]
}

const Header = (props: HeaderPropType) => {
  const { navBarButtons } = props
  const navigate = useNavigate();

  return (
    <header className="header-container">
      <div className="brand-wrapper" onClick={() => navigate("/")}>
        <img src="./logo.png" alt="Nomi Logo" width="40px" />
        <span>{strings.name}</span>
      </div>
      <div className="navbar-wrapper">
      {navBarButtons ? navBarButtons.map((button, index) => <div key={index}>{button}</div>) : null} 
        <button className="mydecks" onClick={() => navigate("/mydecks")}>My Decks</button>
        <button className="mycollection" onClick={() => navigate("/mycollection")}>My Collection</button>
      </div>
    </header>
  );
};

export default Header;
