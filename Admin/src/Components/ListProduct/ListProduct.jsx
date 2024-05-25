import React, { useEffect, useState } from 'react';
import "./ListProduct.css";
import cross_icon from '../../assets/cart_cross_icon.png';

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => setAllProducts(data));
    }, []);

    const removeProduct = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        setAllProducts(allproducts.filter(product => product.id !== id)); // Remove the product from the list
    };

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Description</p>
                <p>Size</p> {/* Nueva columna para la talla */}
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product) => (
                    <div key={product.id} className="listproduct-format-main listproduct-format">
                        {Array.isArray(product.image_urls) && product.image_urls.length > 0 && (
                            <img src={product.image_urls[0]} alt="" className="listproduct-product-icon" />
                        )}
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <p>{product.description}</p>
                        <p>{product.category === 'Ropa' && product.tallas.length > 0 ? product.tallas.join(', ') : '-'}</p> {/* Mostrar tallas si el producto es de categoría "Ropa" */}
                        <img onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="" />
                    </div>
                ))}
                <hr />
            </div>
        </div>
    );
};

export default ListProduct;
