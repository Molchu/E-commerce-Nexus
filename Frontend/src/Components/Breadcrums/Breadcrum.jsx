import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className = 'breadcrum'>
        Inicio <img src={arrow_icon} alt="" width="20" height="20"/> Tienda <img src={arrow_icon} alt="" width="20" height="20"/> {product.category} <img src={arrow_icon} alt="" width="20" height="20"/> {product.name}
    </div>
  )
}

export default Breadcrum