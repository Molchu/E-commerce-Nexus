import React, { useContext, useState, useRef, useEffect } from 'react'
import './Navbar.css'
import logo from '../Assets/Logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();
    const correoUsuario = localStorage.getItem('correoUsuario');
    const [showMenu, setShowMenu] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Función para cerrar el menú desplegable si se hace clic fuera de él
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    // Función para manejar el clic en el mensaje de saludo
    const handleUsernameClick = () => {
        setShowMenu(!showMenu); // Cambiar el estado de visibilidad del menú desplegable
    }

    // Función para manejar el clic en "Cerrar sesión"
    const handleLogout = () => {
        localStorage.removeItem('auth-token'); // Eliminar token de autenticación
        localStorage.removeItem('correoUsuario'); // Eliminar correo del usuario
        localStorage.removeItem('guestCartId');
        window.location.replace('/'); // Redireccionar a la página de inicio
    }

    // Funciones para mostrar y ocultar el menú al pasar el mouse
    const handleMouseEnter = () => {
        setShowMenu(true);
    }

    const handleMouseLeave = () => {
        setShowMenu(false);
    }


    return (
        <div className='navbar'>

            <div className="menu-dropdown" onClick={toggleMenu}>
                <img className='nav-dropdown' src={nav_dropdown} alt="" />
                <span>Todo</span>
            </div>

            {isMenuOpen && (
                <div className="menu-container" ref={menuRef}> {/* Ref para el contenedor del menú */}
                    <ul className="nav-menud">
                        <li><Link to='/'>Tienda</Link></li>
                        <div>--------------</div>
                        <a>Categorías:</a>
                        <li><Link to='/Ropa'>Ropa</Link></li>
                        <li><Link to='/Electrodomesticos'>Electrodomesticos</Link></li>
                        <li><Link to='/Gamer'>Zona Gamer</Link></li>
                        <li><Link to='/Joyeria'>Joyeria</Link></li>
                        <div>--------------</div>
                        <a>Programas:</a>
                        <li><Link to='/regalo'>Tarjetas de regalo</Link></li>
                        <li><Link to ='/musica'>Nexus Music</Link></li>
                        <div>--------------</div>
                        <li><Link to ='/servicio'>Preguntas frecuentes</Link></li>
                    </ul>
                </div>
            )}

            <Link to='/'>
                <div className="nav-logo">
                    <img src={logo} alt="" width="60" height="60" />
                </div>
            </Link>

            <div className="options">
                <a> <Link to='/'>Ofertas del día</Link></a>
                <a> <Link to='/regalo'>Tarjetas de regalo</Link></a>
                <a> <Link to='/servicio'>Servicio al cliente</Link></a>
            </div>
            <a href="/musica" class="options2">Nexus music: 3 meses gratis</a>


            <div className="nav-login-cart">
                {!localStorage.getItem('auth-token') &&
                    <Link to='/signin'><button>Identificate</button></Link>}
                {correoUsuario && (
                    <div className='prueba'>
                        <p className="username" onClick={handleUsernameClick}>Hola, {correoUsuario}</p>
                        {showMenu && (
                            <ul className="user-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <Link to='/perfil'><button>Ver perfil</button></Link>
                                <button onClick={handleLogout}>Cerrar sesión</button>
                            </ul>
                        )}
                    </div>
                )}
                <Link to='/cart'><img src={cart_icon} alt="" width="45" height="45" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>

    )
}

export default Navbar
