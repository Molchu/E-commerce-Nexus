import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.png";

const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "",
        new_price: "",
        old_price: "",
        description: "",
        image_urls: [],
        tallas: []
    });

    const imageHandler = (e) => {
        const selectedImages = Array.from(e.target.files);

        if (images.length + selectedImages.length <= 4) {
            setImages([...images, ...selectedImages]);
        } else {
            alert("Solo puedes agregar hasta 4 imágenes");
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'tallas') {
            const tallasArray = value.split(',').map(talla => talla.trim());
            setProductDetails({ ...productDetails, [name]: tallasArray });
        } else {
            setProductDetails({ ...productDetails, [name]: value });
        }
    };

    const selectTalla = (talla) => {
        if (!productDetails.tallas.includes(talla)) {
            setProductDetails({ ...productDetails, tallas: [...productDetails.tallas, talla] });
        } else {
            setProductDetails({ ...productDetails, tallas: productDetails.tallas.filter(item => item !== talla) });
        }
    };

    const resetForm = () => {
        setProductDetails({
            name: "",
            category: "",
            new_price: "",
            old_price: "",
            description: "",
            image_urls: [],
            tallas: []
        });
        setImages([]);
    };

    const Add_Product = async () => {
        if (!productDetails.category) {
            alert("Debe seleccionar una categoría para el producto");
            return;
        }

        let formData = new FormData();

        for (let i = 0; i < images.length; i++) {
            formData.append('image', images[i]);
        }

        if (productDetails.category === 'Ropa') {
            for (let i = 0; i < productDetails.tallas.length; i++) {
                formData.append('tallas', productDetails.tallas[i]);
            }
        }

        let responseData;
        try {
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            responseData = await response.json();

            if (responseData.success) {
                const { image_urls } = responseData;
                await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...productDetails, image_urls }),
                }).then((resp) => resp.json()).then((data) => {
                    if (data.success) {
                        alert("Product Added");
                        resetForm(); // Restablecer el formulario después de agregar el producto
                    } else {
                        alert("Failed");
                    }
                });
            } else {
                alert("Failed to upload images");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add product");
        }
    };

    return (
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    name="name"
                    placeholder="Escriba aqui"
                />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="text"
                        name="old_price"
                        placeholder="Escriba aqui"
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="text"
                        name="new_price"
                        placeholder="Escriba aqui"
                    />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className="add-product-selector"
                >
                    <option value="">Seleccione una categoría</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Electrodomesticos">Electrodomesticos</option>
                    <option value="Gamer">Gamer</option>
                    <option value="Joyeria">Joyeria</option>
                </select>
            </div>
            {productDetails.category === 'Ropa' && (
                <div className="addproduct-itemfield">
                    <p>Tallas</p>
                    <div className="tallas-selector">
                        <button className={productDetails.tallas.includes('S') ? 'selected' : ''} onClick={() => selectTalla('S')}>S</button>
                        <button className={productDetails.tallas.includes('M') ? 'selected' : ''} onClick={() => selectTalla('M')}>M</button>
                        <button className={productDetails.tallas.includes('L') ? 'selected' : ''} onClick={() => selectTalla('L')}>L</button>
                        <button className={productDetails.tallas.includes('XL') ? 'selected' : ''} onClick={() => selectTalla('XL')}>XL</button>
                        <button className={productDetails.tallas.includes('XXL') ? 'selected' : ''} onClick={() => selectTalla('XXL')}>XXL</button>
                    </div>
                </div>
            )}
            {images.map((img, index) => (
                <div key={index} className="addproduct-itemfield1">
                    <label htmlFor={`file-input-${index}`}>
                        <img
                            src={URL.createObjectURL(img)}
                            className="addproduct-thumnail-img"
                            alt=""
                        />
                    </label>
                    <input
                        onChange={imageHandler}
                        type="file"
                        name={`image-${index}`}
                        id={`file-input-${index}`}
                        hidden
                    />
                </div>
            ))}
            {images.length < 4 && (
                <div className="addproduct-itemfield1">
                    <label htmlFor="file-input">
                        <img
                            src={upload_area}
                            className="addproduct-thumnail-img"
                            alt=""
                        />
                    </label>
                    <input
                        onChange={imageHandler}
                        type="file"
                        name="image"
                        id="file-input"
                        hidden
                    />
                </div>
            )}

            <div className="addproduct-itemfield">
                <p>Product description</p>
                <input
                    value={productDetails.description}
                    onChange={changeHandler}
                    type="text"
                    name="description"
                    placeholder="Escriba aqui una descripcion"
                />
            </div>

            <button onClick={Add_Product} className="addproduct-btn">
                ADD
            </button>
        </div>
    );
};

export default AddProduct;
