import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Obtén ofertas exclusivas</h1>
        <p>Suscribete a nuestro boletín informativo y matente al día con nuevas ofertas y productos</p>
        <div>
            <input type="email" placeholder="Correo"/>
            <button>Suscribirse</button>
        </div>
    </div>
  )
}

export default NewsLetter