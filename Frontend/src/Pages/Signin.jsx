import React, {useState} from 'react';
import './CSS/Signin.css';
import axios from 'axios';

const Signin = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/signin', { correo, contrasena});
      console.log(response.data); // Aquí puedes manejar la respuesta del backend si es necesario
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };
  return (
    <div className='signin'>
      <form className="signin-container" onSubmit={handleSubmit}>
        <h1>Inscribirse</h1>
        <div className="signin-fields">
          <input type="email" placeholder='Correo electronico' value={correo} onChange={(e) => setCorreo(e.target.value)}/>
          <input type="password" placeholder='Contraseña' value={contrasena} onChange={(e) => setContrasena(e.target.value)}/>
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit">Continuar</button>
        <p className="signin-login">¿Olvidaste la contraseña? <span>Recupera tu cuenta aquí</span></p>
        <p className="signin-login">¿No tienes una cuenta? <span>Creala aquí</span></p>
      </form>
    </div>
  )
}

export default Signin