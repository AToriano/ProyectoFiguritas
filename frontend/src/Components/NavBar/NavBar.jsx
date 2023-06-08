import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

import home from "../../assets/icons/style=fill, state=active.svg";
import profile from "../../assets/icons/style=outline, state=inactive, add-friend=false.svg";
import search from "../../assets/icons/style=outline, state=inactive-1.svg";
import friends from "../../assets/icons/style=outline, state=inactive-2.svg";

function NavBar(props) {
  return (
    <nav className={`navNavBarContainer nav-${props.color}`}>
      <div>
        <Link to={"/home"} className="link">
          <button>
            <img src={home} alt="Inicio" />
            <p>Inicio</p>
          </button>
        </Link>
      </div>
      <div>
        <Link to={"/searchmenu"} className="link">
          <button>
            <img src={search} alt="Buscador" />
            <p>Buscador</p>
          </button>
        </Link>
      </div>
      <div>
        <Link to={"/usermenu"} className="link">
          <button>
            <img src={profile} alt="Perfil" />
            <p>Perfil</p>
          </button>
        </Link>
      </div>
      <div>
        <button>
          <img src={friends} alt="Amigos" />
          <p>Amigos</p>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
