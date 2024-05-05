import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  console.log('Categoría del producto:', product.category); // Imprimir la categoría del producto en la consola

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" width="20" height="20" />
          <img src={star_icon} alt="" width="20" height="20" />
          <img src={star_icon} alt="" width="20" height="20" />
          <img src={star_icon} alt="" width="20" height="20" />
          <img src={star_dull_icon} alt="" width="20" height="20" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          <h2>{product.description}</h2>
        </div>
        {product.category === 'Ropa' && (
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
        )}
        <button onClick={() => { addToCart(product.id); navigate('/cart'); }}>Añadir al carrito</button>
        <p className="productdisplay-right-category"><span>Categoria :</span>{product.category}</p>
        <p className="productdisplay-right-category"><span>Etiquetas :</span>Trendy, Novedad</p>
      </div>
    </div>
  );
}

export default ProductDisplay;
