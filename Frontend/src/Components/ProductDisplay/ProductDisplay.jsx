import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt=""/>
          <img src={product.image} alt=""/>
          <img src={product.image} alt=""/>
          <img src={product.image} alt=""/>
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt=""/>
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" width="20" height="20"/>
          <img src={star_icon} alt="" width="20" height="20"/>
          <img src={star_icon} alt="" width="20" height="20"/>
          <img src={star_icon} alt="" width="20" height="20"/>
          <img src={star_dull_icon} alt="" width="20" height="20"/>
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          Estos productos traidos desde las mismisimas entrañas de mordor
          pueden proporcionarle a su portador una cantidad de habilidades
          inimaginables.
        </div>
        <div className="productdisplay-right-size">
          <h1>Seleccionar talla</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>Añadir al carrito</button>
        <p className="productdisplay-right-category"><span>Categoria :</span>Elfos, Conjunto mágico</p>
        <p className="productdisplay-right-category"><span>Etiquetas :</span>Ropa mágica, Elementos, Hechizos</p>
    </div>
  </div>
  )
}

export default ProductDisplay