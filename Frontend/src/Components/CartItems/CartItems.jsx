import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const{all_product, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);
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
        {all_product.map((e)=>{
            if(cartItems[e.id]>0)
            {
                return <div>
                <div className='cartitems-format cartitem-format-main'>
                    <img src={e.image} alt="" className='carticon-product-icon'/>
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className="cartitems-quantity">{cartItems[e.id]}</button>
                    <p>${e.new_price*cartItems[e.id]}</p>
                    <img className="cartitems-remove-icon" src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                </div>
            <hr />
            </div>
            }
            return null;
        })}
        <div className='cartitems-down'>
            <div className="cartitems-total">
                <h1>cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Envío</p>
                        <p>Gratis</p>
                    </div>
                    <hr />
                    <div className='cartitems-total-item'>
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>Pagar</button>
            </div>
            <div className="cartitems-promocode">
                <p>Si tienes un código de promoción, ponlo aquí</p>
                <div className='cartitems-promobox'>
                    <input type="text" placeholder="promo code"/>
                    <button>Entregar</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems