import React from "react";
import "./hamburguer.css";

const Hamburguer = () => {
  return(
    <div>
    <header className="header">
      <div className="container">
        <div className="btn-menu">
      <label htmlFor="btn-menu">☰  Todo</label>
        </div>
  </div>
  </header>
<div className="capa"></div>
<input type="checkbox" id="btn-menu" />
<div className="container-menu">
  <div className="cont-menu">
    <a href="#"><h2>Iniciar sesión</h2></a>
    <h3>Contenido y dispositivos digitales</h3>
    <nav>
      <a href="#">Nexus music</a>
      <a href="#">Suscribirse</a>
      <a href="#">Facebook</a>
      <a href="#">Youtube</a>
      <a href="#">Instagram</a>
    </nav>
    <label htmlFor="btn-menu">✖️</label>
  </div>
</div>
</div>

  )
}

export default Hamburguer;