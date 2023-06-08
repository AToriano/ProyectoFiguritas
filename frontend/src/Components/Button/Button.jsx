import React from "react";

import "./Button.css";

function Button(props) {
  console.log(props);
  return (
    <div>
      <button
        className={`btnStart bg-${props.color}`}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        <img src={props.icon} alt="" />
        {props.title}
      </button>
    </div>
  );
}

export default Button;
