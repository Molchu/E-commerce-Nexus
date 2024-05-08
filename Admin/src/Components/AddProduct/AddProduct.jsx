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
        image_urls: [], // Inicializar como un array vacío
    });

    const imageHandler = (e) => {
        const selectedImages = Array.from(e.target.files);

        // Verificar que la cantidad total de imágenes no supere 4
        if (images.length + selectedImages.length <= 4) {
            setImages([...images, ...selectedImages]);
        } else {
            alert("Solo puedes agregar hasta 4 imágenes");
        }
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        let formData = new FormData();

        // Agregar las imágenes al formData
        for (let i = 0; i < images.length; i++) {
            formData.append('image', images[i]);
        }

        let responseData;
        try {
            // Realizar la petición al servidor
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            // Obtener la respuesta como objeto JSON
            responseData = await response.json();

            if (responseData.success) {
                const { image_urls } = responseData;

                // Actualizar las URLs de las imágenes en productDetails
                setProductDetails({ ...productDetails, image_urls });

                await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...productDetails, image_urls }), // Actualizar los detalles del producto solo si la carga de imágenes fue exitosa
                }).then((resp) => resp.json()).then((data) => {
                    // Mostrar el mensaje de éxito o fracaso
                    data.success ? alert("Product Added") : alert("Failed");
                });
            } else {
                // Mostrar un mensaje de error si la carga de imágenes falla
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
                    <option value="Ropa">Ropa</option>
                    <option value="Electrodomesticos">Electrodomesticos</option>
                    <option value="Gamer">Gamer</option>
                    <option value="Joyeria">Joyeria</option>
                </select>
            </div>
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