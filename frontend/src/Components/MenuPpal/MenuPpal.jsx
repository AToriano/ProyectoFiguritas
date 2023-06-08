import React from "react";
import "./MenuPpal.css";

function MenuPpal(props) {
  return (
    <div className="divSetMusicContainer">
      <img src={props.img} alt="" className="imgSetMusic" />
      <div className="textMusic">
        <h5 className="headerSetMusic">
          <span>{props.title}</span>
        </h5>
        <p className="paragraphSetMusic"> {props.paragraph} </p>
      </div>
    </div>
  );
}

export default MenuPpal;
