import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Coleccion.css";

function Coleccion() {
  const navigate = useNavigate();

  const [figus, setFigus] = useState("");

  const detalleFigus = async (event) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:8000/api/detfigus",
        requestOptions
      );
      if (response.ok) {
        const respuesta = await response.json();
        setFigus(respuesta.figus);
      } else {
        const respuesta = await response.json();
        alert(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };

  const meFaltan = async (event) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/nola",
        requestOptions
      );
      if (response.ok) {
        const respuesta = await response.json();
        setFigus(respuesta.figus);
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };

  const lasRepe = async (event) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/lasrepe",
        requestOptions
      );
      if (response.ok) {
        const respuesta = await response.json();
        setFigus(respuesta.figus);
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };

  const laTengo = async (id) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(
        `http://localhost:8000/api/figuritas/${id}`,
        requestOptions
      );

      if (response.ok) {
        detalleFigus();
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };

  const suma = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/suma/${id}`,
        requestOptions
      );
      if (response.ok) {
        detalleFigus();
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };

  const resta = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/resta/${id}`,
        requestOptions
      );
      if (response.ok) {
        detalleFigus();
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };

  return (
    <div className="divPagina">
      <header className="topPagina">
        <h2>Completá tu álbum!!</h2>

        <button className="upboton" onClick={detalleFigus}>
          Mi álbum
        </button>
        <button className="upboton" onClick={meFaltan}>
          Me faltan
        </button>
        <button className="upboton" onClick={lasRepe}>
          Las Repe
        </button>
      </header>
      <div>
        {figus &&
          figus.map((figus) => {
            const fondo = figus.tengo
              ? { backgroundColor: "green" }
              : { backgroundColor: "red" };
            return (
              <section className="divFigus" key={figus.id}>
                <div style={fondo}>
                  <div></div>
                  <img className="cajaFigus" src={figus.imagen} alt="" />
                </div>
                <p> {figus.id}</p>
                <p> {figus.nombre}</p>
                <p> {figus.equipo}</p>
                <div>
                  {figus.tengo ? (
                    <div>
                      <button
                        className="masYmenos"
                        onClick={() => suma(figus.id)}
                      >
                        +
                      </button>
                      <span>{figus.cantidad}</span>
                      <button
                        className="masYmenos"
                        onClick={() => resta(figus.id)}
                      >
                        -
                      </button>
                    </div>
                  ) : (
                    <button className="laTe" onClick={() => laTengo(figus.id)}>
                      La Tengo
                    </button>
                  )}
                </div>
              </section>
            );
          })}
      </div>
    </div>
  );
}
export default Coleccion;
