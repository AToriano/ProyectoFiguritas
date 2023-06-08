import React from "react";

import { Link } from "react-router-dom";
/* import { useNavigate } from "react-router-dom";
 */
import "./Start.css";

import Button from "../Button/Button";

function Start() {
  return (
    <div className="divStartContainer">
      <h1>Mis albums</h1>
      <div className="divBtnscontainer">
        <Link to={`/register`} className="link">
          <Button title="Registrarse" color="orange" />
        </Link>
        <Link to={`/login`} className="link">
          <Button title="Inicar Sesión" color="white" />
        </Link>
      </div>
    </div>
  );
}

export default Start;
