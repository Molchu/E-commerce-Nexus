import React from 'react'
import './Navbar.css'
import logo from '../Assets/Logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
const Navbar = () => {

        const [menu,setMenu] = React.useState("shop");

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" width="100" height="100"/>
                <p className="title">Nexus</p>
            </div>
            <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration:'none' }} to='/'>Tienda</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{ textDecoration:'none' }} to='/mens'>Hombres</Link>{menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{ textDecoration:'none' }} to='/womens'>Mujeres</Link>{menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{ textDecoration:'none' }} to='/kids'>Niños</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button>Mi cuenta</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="" width="45" height="45"/></Link>
                <div className="nav-cart-count">0</div>
            </div>
        </div>
        
    )
}

export default Navbar