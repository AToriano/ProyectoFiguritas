import React, { useEffect, useState } from "react";
import MenuPpal from "../MenuPpal/MenuPpal";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [idusuario, setIdUsuario] = useState();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const usuarioId = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          `http://localhost:8000/api/usuarios/${email}`,
          requestOptions
        );
        if (response.ok) {
          const respuesta = await response.json();
          const idUsuario = respuesta.idusuario[0].id;
          setIdUsuario(idUsuario);
          localStorage.setItem("usuario_id", idUsuario);
        } else {
          const respuesta = await response.json();
          console.log(respuesta.error);
        }
      } catch (error) {
        alert("An unexpected error has occurred. Please try again.");
      }
    };
    usuarioId();
  }, []);

  return (
    <>
      <div>
        <h2>Bienvenid@!!</h2>
        <h3>{localStorage.email}</h3>
      </div>

      <Link to={"/nueva"} className="link">
        <div className="divCupidoMusical">
          <MenuPpal
            title="Nueva Partida"
            paragraph="Selecciona un álbum y empieza la diversión!!."
          />
        </div>
      </Link>

      <Link to={"/coleccion"} className="link">
        <MenuPpal
          title="Mis Albums"
          paragraph="Continúa jugando y compelta tus álbums"
        />
      </Link>
    </>
  );
}

export default Home;
