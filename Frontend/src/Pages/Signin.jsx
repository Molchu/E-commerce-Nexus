import React, {useState} from 'react';
import { Link } from 'react-router-dom';
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
        const{ token } = response.data;
        localStorage.setItem('token', token);
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
        <h1>Inicia sesión</h1>
        <div className="signin-fields">
          <p>Correo</p>
          <input type="email" placeholder='ejemplo@email.com' value={correo} onChange={(e) => setCorreo(e.target.value)}/>
          <p>Contraseña</p>
          <input type="password" placeholder='Tu contraseña' value={contrasena} onChange={(e) => setContrasena(e.target.value)}/>
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit">Continuar</button>
        <p className="signin-login">¿Olvidaste algún dato? <span>Recupera tu cuenta aquí</span></p>
        <p className="signin-login">¿No tienes una cuenta? <Link to='/signup'>Creala aquí</Link></p>
      </form>
    </div>
  )
}

export default Signin