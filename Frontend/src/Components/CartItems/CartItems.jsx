import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
    const navigate = useNavigate();

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) {
            return "$0";
        }
        return `$${numericPrice.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} COP`;
    };

    const PayProducts = async () => {
        const productsToSend = Object.keys(cartItems).map((key) => {
            const [productId, size] = key.split('-');
            const product = all_product.find((e) => e.id.toString() === productId);
            if (product && cartItems[key] > 0) {
                return {
                    title: product.name,
                    unit_price: parseFloat(product.new_price),
                    currency_id: "COP",
                    quantity: cartItems[key],
                    size: product.category === 'Ropa' ? size : undefined,
                };
            }
            return null;
        }).filter(item => item !== null);
        console.log(productsToSend)
        try {
            const response = await axios.post(
                'http://localhost:4000/mercado_pago',
                productsToSend
            );
            window.location.href = response.data;
            console.log(response.data);
        } catch (error) {
            console.error('Error al enviar los productos al backend:', error);
        }
    };

    return (
        <div className='cartitems'>
            <div className="cartitem-format-main">
                <p>Productos</p>
                <p>Titulo</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Total</p>
                <p>Remover</p>
            </div>
            <hr />
            {Object.keys(cartItems).map((key) => {
                const [productId, size] = key.split('-');
                const product = all_product.find((e) => e.id.toString() === productId);
                if (product && cartItems[key] > 0) {
                    return (
                        <div key={key}>
                            <div className='cartitems-format cartitem-format-main'>
                                <img src={product.image_urls[0]} alt="" className='carticon-product-icon' />
                                <div>
                                    <p>{product.name}</p>
                                    {product.category === 'Ropa' && <p>Talla: {size}</p>}
                                </div>
                                <p>{formatPrice(product.new_price)}</p>
                                <button className="cartitems-quantity">{cartItems[key]}</button>
                                <p>{formatPrice(product.new_price * cartItems[key])}</p>
                                <img className="cartitems-remove-icon" src={remove_icon} onClick={() => { removeFromCart(productId, size) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className='cartitems-down'>
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>{formatPrice(getTotalCartAmount())}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Envío</p>
                            <p>Gratis</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-item'>
                            <h3>Total</h3>
                            <h3>{formatPrice(getTotalCartAmount())}</h3>
                        </div>
                    </div>
                    <button onClick={PayProducts}>Pagar</button>
                </div>
                <div className="cartitems-promocode">
                    <p>Si tienes un código de promoción, ponlo aquí</p>
                    <div className='cartitems-promobox'>
                        <input type="text" placeholder="promo code" />
                        <button>Entregar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
