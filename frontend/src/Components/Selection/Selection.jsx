import React from "react";
import "./Selection.css";

function Selection(props) {
  return (
    <button className="divSelectionbutton">
      <img src={props.img} alt="" />
    </button>
  );
}

export default Selection;
