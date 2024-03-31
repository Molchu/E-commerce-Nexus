import React, {useState} from 'react';
import './CSS/LoginSignup.css';
import axios from 'axios';

const LoginSignup = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [cedula, setCedula] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [fecha_nacimiento, setFnacimiento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const hasUpperCase = /[A-Z]/.test(contrasena);
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(contrasena);

  const handleAceptaTerminosChange = (e) => {
    setAceptaTerminos(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cedula.length !== 10) {
      setError('Ingrese un número de documento valido');
      return;
    }if (contrasena.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }else if(!hasUpperCase) {
      setError('La contraseña debe tener al menos una letra');
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
      const response = await axios.post('/login', { nombre, apellido, correo, cedula, ciudad, fecha_nacimiento, contrasena});
      console.log(response.data); // Aquí puedes manejar la respuesta del backend si es necesario
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'correo ya registrado') {
        setError('Ya existe una cuenta registrada con el correo ingresado');
      }
      if (error.response && error.response.status === 400 && error.response.data.error === 'documento de identidad ya registrado') {
        setError('Ya existe una cuenta registrada con el documento de identidad ingresado');
      }
      console.error('Error al enviar datos al servidor:', error);
    }
  };
  return (
    <div className='loginsignup'>
      <form className="loginsignup-container" onSubmit={handleSubmit}>
        <h1>Inscribirse</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          <input type="text" placeholder='Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)}/>
          <input type="email" placeholder='Correo electronico' value={correo} onChange={(e) => setCorreo(e.target.value)}/>
          <input type="text" placeholder='Documento de identidad' value={cedula} onChange={(e) => setCedula(e.target.value)}/>
          <input type="text" placeholder='Ciudad de residencia' value={ciudad} onChange={(e) => setCiudad(e.target.value)}/>
          <input type="date" value={fecha_nacimiento} onChange={(e) => setFnacimiento(e.target.value)}/>
          <input type="password" placeholder='Contraseña' value={contrasena} onChange={(e) => setContrasena(e.target.value)}/>
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit">Continuar</button>
        <p className="loginsignup-login">¿Ya tienes una cuenta? <span>Inicia sesión aquí</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" id="terminosCheckbox" checked={aceptaTerminos} onChange={handleAceptaTerminosChange}/>
          <label htmlFor="terminosCheckbox">Acepto los términos y condiciones</label>
        </div>
      </form>
    </div>
  )
}

export default LoginSignup