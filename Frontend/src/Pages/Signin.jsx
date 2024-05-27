import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Signin.css';
import axios from 'axios';

const Signin = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState(''); // Cambiado a una sola sugerencia
  const [rememberMe, setRememberMe] = useState(false); // Agregar estado para la casilla de verificación

  useEffect(() => {
    const savedCorreo = localStorage.getItem('correoUsuario');
    if (savedCorreo) setCorreo(savedCorreo);
  }, []);

  const handleCorreoChange = (e) => {
    const newCorreo = e.target.value.toLowerCase(); // Convertir a minúsculas
    setCorreo(newCorreo);
    setContrasena(''); // Limpiar la contraseña cuando el correo cambia

    // Sugerencias de correo electrónico
    if (newCorreo.trim() === '') {
      setSuggestion('');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(user => user.correo.toLowerCase().startsWith(newCorreo));
    if (matchedUser) {
      setSuggestion(matchedUser.correo);
    } else {
      setSuggestion('');
    }
  };

  const handleSuggestionClick = () => {
    setCorreo(suggestion);
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const savedUser = users.find(user => user.correo === suggestion);
    if (savedUser) {
      setContrasena(savedUser.contrasena);
    }
    setSuggestion('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (correo.length === 0) {
      setError('Ingrese un correo válido');
      return;
    }
    if (contrasena.length === 0) {
      setError('Ingrese la contraseña');
      return;
    }
    setError('');
    try {
      const response = await axios.post('/signin', { correo, contrasena });
      if (response.data.success) {
        console.log('Inicio de sesión exitoso');
        const { token } = response.data;
        localStorage.setItem('auth-token', token);
        localStorage.setItem('correoUsuario', correo); // Guardar correoUsuario en localStorage

        if (rememberMe) { // Guardar el correo y la contraseña si la opción está seleccionada
          let users = JSON.parse(localStorage.getItem('users')) || [];
          const userIndex = users.findIndex(user => user.correo.toLowerCase() === correo.toLowerCase());
          if (userIndex === -1) {
            users.push({ correo, contrasena });
          } else {
            users[userIndex].contrasena = contrasena;
          }
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('contrasenaUsuario', contrasena); // Guardar contrasenaUsuario en localStorage
        }

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
          <input
            type="email"
            placeholder='ejemplo@email.com'
            value={correo}
            onChange={handleCorreoChange}
          />
          {suggestion && (
            <div className="suggestion" onClick={handleSuggestionClick}>
              {suggestion}
            </div>
          )}
          <p>Contraseña</p>
          <input
            type="password"
            placeholder='Tu contraseña'
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Recordar mis datos</label>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit">Continuar</button>
        <p className="signin-login">¿Olvidaste algún dato? <span>Recupera tu cuenta aquí</span></p>
        <p className="signin-login">¿No tienes una cuenta? <Link to='/signup'>Crea una aquí</Link></p>
      </form>
    </div>
  );
};

export default Signin;