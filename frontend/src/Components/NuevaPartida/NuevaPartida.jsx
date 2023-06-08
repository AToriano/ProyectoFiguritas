import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NuevaPartida.css";

function NuevaPartida() {
  const navigate = useNavigate();

  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState(null);

  useEffect(() => {
    const detAlbums = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          "http://localhost:8000/api/albums",
          requestOptions
        );
        if (response.ok) {
          const respuesta = await response.json();
          setAlbums(respuesta.albums);
        } else {
          const respuesta = await response.json();
          console.log(respuesta.error);
        }
      } catch (error) {
        alert("An unexpected error has occurred. Please try again.");
      }
    };
    detAlbums();
  }, []);

  const CreaNuevaPartida = async () => {
    const usuarioId = localStorage.getItem("usuario_id");
    if (!usuarioId) {
      alert("No se encontró el usuario. Por favor, inicie sesión nuevamente.");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      usuario_id: usuarioId,
      album_id: albumId,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/nuevapartida",
        requestOptions
      );
      if (response.ok) {
        const respuesta = await response.json();
        navigate(`/coleccion`);
      } else {
        const respuesta = await response.json();
        alert("No se pudo crear la nueva partida");
      }
    } catch (error) {
      alert(
        "Se produjo un error al realizar la solicitud. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  const albumClick = (albumId) => {
    setAlbumId(albumId);
    console.log(albumId);
    CreaNuevaPartida();
  };

  return (
    <>
      <div className="divPagina">
        <h2>Un simple paso!</h2>
        <br />
        <h3>Selecciona tu álbum</h3>

        <div>
          {albums &&
            albums.map((albums) => (
              <div className="listaAlbums">
                <p>{albums.id}</p>
                <p>{albums.nombre}</p>
                <br />
                <button
                  className="nuevoJuego"
                  onClick={() => albumClick(albums.id)}
                >
                  Crea tu partida!
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default NuevaPartida;
