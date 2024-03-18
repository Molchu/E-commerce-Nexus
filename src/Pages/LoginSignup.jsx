import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Inscribirse</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Tu nombre' />
          <input type="email" placeholder='Correo electronico'/>
          <input type="password" placeholder='Contraseña'/>
        </div>
        <button>Continuar</button>
        <p className="loginsignup-login">¿Ya tienes una cuenta? <span>Inicia sesión aquí</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id=""/>
          <p>Acepto los términos y condiciones</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup