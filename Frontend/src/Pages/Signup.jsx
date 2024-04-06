import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './CSS/Signup.css';
import axios from 'axios';

const Signup = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [id, setId] = useState('');
  const [fecha_nacimiento, setFnacimiento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const hasUpperCase = /[A-Z]/.test(contrasena);
  const hasLowerCase = /[a-z]/.test(contrasena);
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(contrasena);

  const handleAceptaTerminosChange = (e) => {
    setAceptaTerminos(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre.length === 0) {
      setError('Ingrese un nombre valido');
      return;
    }if (apellido.length === 0) {
      setError('Ingrese un apellido valido');
      return;
    }if (correo.length === 0) {
      setError('Ingrese su correo');
      return;
    }if (!correo.endsWith('.com') && !correo.endsWith('.co')) {
      setError('El correo debe terminar en ".com" o ".co"');
      return;
    }if (telefono.length === 0 || telefono.length < 8) {
      setError('Ingrese un número de telefono');
      return;
    }if (id.length === 0) {
      setError('Ingrese un número de identificación');
      return;
    }if (id.length < 8) {
      setError('El número de identificación debe tener al menos 8 dígitos');
      return;
    }if (fecha_nacimiento.length === 0) {
      setError('Seleccione su fecha de nacimiento');
      return;
    }if (contrasena.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }else if(!hasLowerCase) {
      setError('La contraseña debe tener al menos una letra minuscula');
      return;
    }else if(!hasUpperCase) {
      setError('La contraseña debe tener al menos una letra mayuscula');
      return;
    }else if(!hasSymbol) {
      setError('La contraseña debe tener al menos un símbolo');
      return;
    }
    if (!aceptaTerminos) {
      setError('Debe aceptar los términos y condiciones para continuar');
      return;
    }
    setError('');
    try {
      const response = await axios.post('/signup', { nombre, apellido, correo, telefono, id, fecha_nacimiento, contrasena});
      console.log(response.data); // Aquí puedes manejar la respuesta del backend si es necesario
      window.location.replace('/');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'correo ya registrado') {
        setError('Ya existe una cuenta registrada con el correo ingresado');
      }
      console.error('Error al enviar datos al servidor:', error);
    }
  };
  return (
    <div className='signup'>
      <form className="signup-container" onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
        <div className="signup-fields">
          <p>Nombre</p>
          <input type="text" placeholder='Tu nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          <p>Apellido</p>
          <input type="text" placeholder='Tu apellido' value={apellido} onChange={(e) => setApellido(e.target.value)}/>
          <p>Correo</p>
          <input type="email" placeholder='ejemplo@email.com' value={correo} onChange={(e) => setCorreo(e.target.value)}/>
          <p>Teléfono</p>
          <input type="tel" placeholder='+57 3123342312' value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
          <p>Identificación</p>
          <input type="integer" placeholder='1085344440' value={id} onChange={(e) => setId(e.target.value)}/>
          <p>Fecha de nacimiento</p>
          <input type="date" title='Fecha' value={fecha_nacimiento} onChange={(e) => setFnacimiento(e.target.value)}/>
          <p>Contraseña</p>
          <input type="password" placeholder='Tu contraseña' value={contrasena} onChange={(e) => setContrasena(e.target.value)}/>
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit">Continuar</button>
        <p className="signup-login">¿Ya tienes una cuenta? <Link to='/signin'>Inicia sesión aquí</Link></p>
        <div className="signup-agree">
          <input type="checkbox" id="terminosCheckbox" checked={aceptaTerminos} onChange={handleAceptaTerminosChange}/>
          <label htmlFor="terminosCheckbox">Acepto los términos y condiciones</label>
        </div>
      </form>
    </div>
  )
}

export default Signup