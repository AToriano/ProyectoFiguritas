import React from "react";
import "./Header.css";
import backArrow from "../../assets/icons/position=left-1.svg";

function Header(props) {
  return (
    <div className="divHeaderContainer">
      <img src={backArrow} alt="backArrow" className="imgHeaderBackArrow" />
      <div className="divHeaderText">
        <p>{props.paragraph}
        </p>
        <span className="HeaderTitle">{props.title}</span>
      </div>
    </div>
  );
}

export default Header;
