import React, { useContext, useState, useRef } from 'react'
import './Navbar.css'
import logo from '../Assets/Logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {

        const [menu,setMenu] = useState("shop");
        const {getTotalCartItems}=useContext(ShopContext);
        const menuRef = useRef(); 

        const dropdown_toggle = (e) =>{
            menuRef.current.classList.toggle('nav-menu-visible');
            e.target.classList.toggle('open');
        }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" width="100" height="100"/>
                <p className="title">Nexus</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration:'none' }} to='/'>Tienda</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("ropa")}}><Link style={{ textDecoration:'none' }} to='/ropa'>Ropa</Link>{menu==="ropa"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("electrodomesticos")}}><Link style={{ textDecoration:'none' }} to='/electrodomesticos'>Electrodomesticos</Link>{menu==="electrodomesticos"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("gamer")}}><Link style={{ textDecoration:'none' }} to='/gamer'>Zona Gamer</Link>{menu==="gamer"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("joyeria")}}><Link style={{ textDecoration:'none' }} to='/joyeria'>Joyeria</Link>{menu==="joyeria"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button>Mi cuenta</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="" width="45" height="45"/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
        
    )
}

export default Navbar