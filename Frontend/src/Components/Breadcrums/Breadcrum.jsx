import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
    const { product } = props;
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    const goCategory = () => {
        const categoryPath = product.category.toLowerCase();
        navigate(`/${categoryPath}`);
    };

    return (
        <div className='breadcrum'>
            <span onClick={goHome} style={{ cursor: 'pointer', color: 'blue' }}>Inicio</span>
            <img src={arrow_icon} alt="" width="20" height="20"/> 
            <span onClick={goCategory} style={{ cursor: 'pointer', color: 'blue' }}>{product.category}</span>
            <img src={arrow_icon} alt="" width="20" height="20"/> 
            {product.name}
        </div>
    );
}

export default Breadcrum;
