import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Ofertas exclusivas</h1>
            <h1>solo para tí</h1>
            <p>Por tiempo limitado</p>
            <button>Mirar ahora</button>
        </div>
        <div className='offers-right'>
            <img src={exclusive_image} alt="" width="600" height="400"/>
        </div>
    </div>
  )
}

export default Offers
