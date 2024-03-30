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
  const hasUpperCase = /[A-Z]/.test(contrasena);
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(contrasena);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contrasena.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }else if(!hasUpperCase) {
      setError('La contraseña debe tener al menos una letra');
      return;
    }else if(!hasSymbol) {
      setError('La contraseña debe tener al menos un símbolo');
      return;
    }
    setError('');
    try {
      const response = await axios.post('/login', { nombre, apellido, correo, cedula, ciudad, fecha_nacimiento, contrasena});
      console.log(response.data); // Aquí puedes manejar la respuesta del backend si es necesario
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };
  return (
    <div className='loginsignup'>
      <form className="loginsignup-container" onSubmit={handleSubmit}>
        <h1>Inscribirse</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Tu nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          <input type="text" placeholder='Tu apellido' value={apellido} onChange={(e) => setApellido(e.target.value)}/>
          <input type="text" placeholder='Correo electronico' value={correo} onChange={(e) => setCorreo(e.target.value)}/>
          <input type="text" placeholder='Tu cedula' value={cedula} onChange={(e) => setCedula(e.target.value)}/>
          <input type="text" placeholder='Tu ciudad' value={ciudad} onChange={(e) => setCiudad(e.target.value)}/>
          <input type="date" value={fecha_nacimiento} onChange={(e) => setFnacimiento(e.target.value)}/>
          <input type="password" placeholder='Contraseña' value={contrasena} onChange={(e) => setContrasena(e.target.value)}/>
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit">Continuar</button>
        <p className="loginsignup-login">¿Ya tienes una cuenta? <span>Inicia sesión aquí</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id=""/>
          <p>Acepto los términos y condiciones</p>
        </div>
      </form>
    </div>
  )
}

export default LoginSignup