import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const response = await fetch("http://localhost:4000/adminsignin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        onLoginSuccess(); // Llamar a la función onLoginSuccess para establecer isLoggedIn en true
      } else {
        alert("Correo electrónico o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Ocurrió un error al iniciar sesión");
    }
  };

  return (
    <div>
      <h2>Inicio de sesión del administrador</h2>
      <form onSubmit={handleLogin}>
        <label>
          Correo electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
