import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Header from "../Header/Header";
import "./RegisterEmail.css";

function RegisterEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const onclick = () => {
    navigate(`/register/user`);
  };

  const FuncionCheckEmail = async (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/checkemail",
        requestOptions
      );
      if (response.ok) {
        const respuesta = await response.json();
        localStorage.setItem("email", respuesta.email);
        navigate(`/register/user`);
      } else {
        const respuesta = await response.json();
        alert("Email ya registrado");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="divLogInEmailContainer">
      <Link to={"/"} className="link">
        <Header title="Crear Cuenta" />
      </Link>
      <form
        action="submit"
        onSubmit={FuncionCheckEmail}
        className="formRegister"
      >
        <h2> ¿Cuál es tu correo electrónico?</h2>
        <br />
        <br />
        <h3> Correo electrónico:</h3> <br />
        <Input
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />{" "}
        {/* <br /> */}
        <div className="divConfirmButton">
          <Button
            type="submit"
            title="Continuar"
            color="orange"
            disabled={false}
          />
        </div>
      </form>
    </div>
  );
}

export default RegisterEmail;
