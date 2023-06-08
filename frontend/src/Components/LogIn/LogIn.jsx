import React, { useState } from "react";
import "./LogIn.css";
import Header from "../Header/Header";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LogInUser = async (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:8000/api/login",
        requestOptions
      );
      if (response.ok) {
        const respuesta = await response.json();
        localStorage.setItem("token", respuesta.token);

        navigate("/home");
      } else {
        const respuesta = await response.json();
        alert(respuesta.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="divLogInContainer">
      <Link to={"/"} className="link">
        <Header title="Iniciar sesión" />
      </Link>
      <h3>E-mail:</h3>
      <br />
      <Input
        type="text"
        onChange={(e) => {
          console.log(e.target.value);
          setEmail(e.target.value);
        }}
        value={email}
      />
      {localStorage.setItem("email", email)};
      {localStorage.setItem("usuario_id", 0)};
      <br />
      <h3>Contraseña:</h3>
      <br />
      <Input
        type="text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <br />
      <Button title="Iniciar sesión" color="orange" onClick={LogInUser} />
    </div>
  );
}

export default LogIn;
