import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/footer_logo.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pinterest_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

export const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-logo">
            <img src={footer_logo} alt="" width="200px" height="200px"/>
            <p>Nexus</p>
        </div>
        <ul className="footer-links">
            <li>Compañía</li>
            <li>Productos</li>
            <li>Oficinas</li>
            <li>Acerca de la empresa</li>
            <li>Contacto</li>
        </ul>
        <div className='footer-social-icon'>
            <div className='footer-icons-container'>
                <img src={instagram_icon} alt="" width="40px" height="40px"/>
            </div>
            <div className='footer-icons-container'>
                <img src={pinterest_icon} alt="" width="40px" height="40px"/>
            </div>
            <div className='footer-icons-container'>
                <img src={whatsapp_icon} alt="" width="40px" height="40px"/>
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @2024 - Todos los derechos reservados</p>
        </div>
    </div>
  )
}

export default Footer