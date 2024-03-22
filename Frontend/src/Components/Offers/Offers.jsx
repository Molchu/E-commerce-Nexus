import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Ofertas exclusivas</h1>
            <h1>solo para tí</h1>
            <p>Tiempo limitado</p>
            <button>Mirar ahora</button>
        </div>
        <div className='offers-right'>
            <img src={exclusive_image} alt="" width="300" height="300"/>
        </div>
    </div>
  )
}

export default Offers
