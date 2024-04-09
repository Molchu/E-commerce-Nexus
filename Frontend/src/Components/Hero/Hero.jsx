import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow_icon.png'
import hero_image from '../Assets/hero_image.png'
import camion from '../Assets/camion.png'

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay: true,
        autoplaySpeed: 3000
    }
  return (
    <Slider {...settings}>
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
            <div className="hero-latest-btn color-button" >
                <div>Últimos productos</div>
                <img src={arrow_icon} width="50" height="35" alt="" />
            </div>
        </div>
        <div className='hero-right'>
        </div>
    </div>

    <div className='hero2'>
        <div className="hero-left">
          <h2>*POR COMPRAS MAYORES A $100.000</h2>
          <div>
            <div className="hero-hand-icon">
              <p>Envíos</p>
              <img src={camion} alt="" />
            </div>
            <p>Gratis</p>
            <p>para todos</p>
          </div>
          <div className="hero-latest-btn color-button" >
                <div>Últimos productos</div>
                <img src={arrow_icon} width="50" height="35" alt="" />
            </div>
        </div>
        <div className='hero-right'>
        </div>
      </div>

      <div className='hero3'>
        <div className="hero-left">
          <h2>DESCUBRE LA ZONA GAMER</h2>
          <div>
            <div className="hero-hand-icon">
              <p>Novedades</p>
              <img src={hand_icon} alt="" />
            </div>
            <p>en la mejor</p>
            <p>tecnología</p>
          </div>
          <a href= '/Gamer' className="hero-latest-btn color-button">
            <div>VER YA</div>
            <img src={arrow_icon} width="50" height="35" alt="" />
          </a>
        </div>
        <div className='hero-right'>
        </div>
      </div>
    </Slider>
  )
}

export default Hero
