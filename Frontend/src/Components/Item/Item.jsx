import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
    const formatPrice = (price) => {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) {
            return "$0";
        }
        return `$${numericPrice.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} COP`;
    };

    return (
        <div className='item'>
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0, 0)} src={props.image} width="300" height="300" alt="" /></Link>
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                    {formatPrice(props.new_price)}
                </div>
                <div className="item-price-old">
                    {formatPrice(props.old_price)}
                </div>
            </div>
        </div>
    );
}

export default Item;
