import React, {useState} from 'react';
//import { Link } from 'react-router-dom';
import './CSS/Signin.css';
import axios from 'axios';

const Signin = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (correo.length === 0) {
      setError('Ingrese un correo valido');
      return;
    }if (contrasena.length === 0) {
      setError('Ingrese la contraseña');
      return;
    }
    setError('');
    try {
      const response = await axios.post('/signin', { correo, contrasena });
      if (response.data.success) {
        console.log('Inicio de sesión exitoso');
        localStorage.setItem('correoUsuario', correo);
        window.location.replace('/');
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
      setError('Error al iniciar sesión, por favor intente nuevamente');
    }
  };
  return (
    <div className='signin'>
      <form className="signin-container" onSubmit={handleSubmit}>
        <h1>Tus datos</h1>
        <div className="signin-fields">
          <p>Correo</p>
          <input type="email" placeholder='ejemplo@email.com' value={correo} onChange={(e) => setCorreo(e.target.value)}/>
          <p>Contraseña</p>
          <input type="password" placeholder='Tu contraseña' value={contrasena} onChange={(e) => setContrasena(e.target.value)}/>
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit">Continuar</button>
      </form>
    </div>
  )
}

export default Signin