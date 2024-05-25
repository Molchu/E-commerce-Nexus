import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = (props) => {
  const { product = { tallas: [] } } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(product.image_urls[0]);

  console.log('Categoría del producto:', product.category); // Imprimir la categoría del producto en la consola

  const handleAddToCart = () => {
    if (product.category === 'Ropa' && selectedSize && !product.tallas.includes(selectedSize)) {
      alert('No tenemos esa talla en este producto');
      return;
    }
    addToCart(product.id, selectedSize);
    alert('¡Producto añadido al carrito!');
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {product.image_urls.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt=""
              onMouseEnter={() => setMainImage(imageUrl)}
            />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={mainImage} alt="" />
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
              <div onClick={() => setSelectedSize("S")} className={selectedSize === "S" ? "selected" : ""}>S</div>
              <div onClick={() => setSelectedSize("M")} className={selectedSize === "M" ? "selected" : ""}>M</div>
              <div onClick={() => setSelectedSize("L")} className={selectedSize === "L" ? "selected" : ""}>L</div>
              <div onClick={() => setSelectedSize("XL")} className={selectedSize === "XL" ? "selected" : ""}>XL</div>
              <div onClick={() => setSelectedSize("XXL")} className={selectedSize === "XXL" ? "selected" : ""}>XXL</div>
            </div>
            {selectedSize && !product.tallas.includes(selectedSize) && (
              <p className="unavailable-size-message">No tenemos esa talla en este producto</p>
            )}
          </div>
        )}
        <button onClick={handleAddToCart}>Añadir al carrito</button>
        <p className="productdisplay-right-category"><span>Categoria :</span>{product.category}</p>
        <p className="productdisplay-right-category"><span>Etiquetas :</span>Trendy, Novedad</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
