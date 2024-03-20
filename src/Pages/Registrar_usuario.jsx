import React, { useState } from 'react';
import './CSS/Registrar_usuario.css';

function RegistroUsuario() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    fechaNacimiento: '',
    usuario: '',
    pais: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu backend para procesar el registro
    console.log(formData);
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className='loginsignup-fields'>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className='loginsignup-fields'>
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
        </div>
        <div className='loginsignup-fields'>
          <label htmlFor="correo">Correo:</label>
          <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} />
        </div>
        <div className='loginsignup-fields'>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
        </div>
        <div className='loginsignup-fields'>
          <label htmlFor="usuario">Usuario:</label>
          <input type="text" id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} />
        </div>
        <div className='loginsignup-fields'>
          <label htmlFor="pais">País:</label>
          <input type="text" id="pais" name="pais" value={formData.pais} onChange={handleChange} />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      </div>
    </div>
  );
}

export default RegistroUsuario;
