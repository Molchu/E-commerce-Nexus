import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow_icon.png'
import hero_image from '../Assets/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>LOS MEJORES PRODUCTOS</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>La mejor</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>calidad</p>
                <p>para todos</p>
            </div>
            <div className="hero-latest-btn">
                <div>Últimos productos</div>
                <img src={arrow_icon} width="50" height="35" alt=""/>
            </div>
        </div>
        <div className='hero-right'>
            <img src={hero_image} alt=""/>
        </div>
    </div>
  )
}

export default Hero
