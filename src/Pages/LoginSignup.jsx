import React from 'react'
import './CSS/LoginSignup.css'
import Registrar_usuario from './Registrar_usuario'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Iniciar sesión</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Tu nombre' />
          <input type="email" placeholder='Correo electronico'/>
          <input type="password" placeholder='Contraseña'/>
        </div>
        <button>Continuar</button>
        <p className="loginsignup-login">¿no tienes una cuenta? <a href="/Registrar_usuario"><span>Registrate aqui</span></a> </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id=""/>
          <p>Acepto los términos y condiciones</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup