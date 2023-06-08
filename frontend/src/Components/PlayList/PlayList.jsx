import React from "react";
import Header from "../Header/Header.jsx";
import "./PlayList.css";

import btnPlay from "../../assets/icons/style=contained, state=play.svg";
import verify from "../../assets/icons/verified.svg";
import sheet from "../../assets/icons/style=outline, state=active-6.svg";
import share from "../../assets/icons/style=fill, state=active-5.svg";
import clock from "../../assets/icons/state=active.svg";
import sincronization from "../../assets/icons/state=active-1.svg";

import elvis from "../../assets/icons/elvis.jpeg";
import ElementPlayList from "../ElementPlayList/ElementPlayList.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import { Link } from "react-router-dom";

function PlayList() {
  return (
    <>
      <div>
        <div>
          <Link to={"/home"} className="link">
            <Header
              paragraph="Playlist gererada de cupido musical"
              title="PlayList Generada"
            />
          </Link>
        </div>

        <article className="articleImgContainer">
          <img src={elvis} alt="disco1" />
          <img src={elvis} alt="disco2" />
          <img src={elvis} alt="disco3" />
          <img src={elvis} alt="disco4" />
        </article>

        <section className="sections">
          <div>
            <button>
              <img src="" alt="logoChico" />
            </button>
            <img src={verify} alt="verificado" />
            <img src={share} alt="compartir" />
          </div>

          <p>hora bd</p>
          <img src={clock} alt="reloj" />
        </section>
        <section className="sections">
          <div>
            <img src={sheet} alt="hoja" />
            <p>Crear Copia</p>
          </div>

          <img src={sincronization} alt="flechas de sincronización" />
          <button className="btnPlayList">
            <img src={btnPlay} alt="botón de play" />
          </button>
        </section>

        <ElementPlayList img={elvis} song="hola mundo" artist="Elvis" />
        <NavBar color="orange" />
      </div>
    </>
  );
}

export default PlayList;
