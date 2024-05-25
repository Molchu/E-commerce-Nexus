import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    try {
        const guestCartItems = JSON.parse(localStorage.getItem('guestCartItems'));
        return guestCartItems || {};
    } catch (error) {
        console.error('Error al parsear guestCartItems:', error);
        return {};
    }
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_Product(data))
            .catch((error) => console.error('Error al obtener los productos:', error));

        const authToken = localStorage.getItem('auth-token');
        if (authToken) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (Array.isArray(data) && data.length > 0) {
                        setCartItems((prevCartItems) => {
                            const newCartItems = { ...prevCartItems };
                            data.forEach((item) => {
                                const { id, quantity } = item;
                                newCartItems[id] = quantity;
                            });
                            console.log(newCartItems);
                            return newCartItems;
                        });
                    }
                })
                .catch((error) => console.error('Error al obtener el carrito:', error));
        } else {
            const guestCartItems = JSON.parse(localStorage.getItem('guestCartItems'));
            if (guestCartItems) {
                setCartItems(guestCartItems);
            }
        }
    }, []);

    const addToCart = (itemId, size) => {
        const authToken = localStorage.getItem('auth-token');
        let guestCartId = localStorage.getItem('guestCartId');

        if (!guestCartId) {
            guestCartId = Math.random().toString(36).substring(2, 15);
            localStorage.setItem('guestCartId', guestCartId);
        }

        const key = `${itemId}-${size}`;

        if (!authToken) {
            setCartItems((prevCartItems) => {
                const newCartItems = { ...prevCartItems };
                newCartItems[key] = (newCartItems[key] || 0) + 1;
                return newCartItems;
            });
            const updatedCartItems = { ...cartItems, [key]: (cartItems[key] || 0) + 1 };
            localStorage.setItem('guestCartItems', JSON.stringify(updatedCartItems));

            fetch('http://localhost:4000/addtocartguest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'guestCartId': guestCartId
                },
                body: JSON.stringify({ "productId": itemId, "size": size }),
                credentials: 'include'
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error adding product to cart');
                    }
                    return response.json();
                })
                .then((data) => console.log(data))
                .catch((error) => console.error('Error adding product to cart:', error));

            return;
        }

        fetch('http://localhost:4000/addtocart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ "productId": itemId, "size": size }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error adding product to cart');
                }
                setCartItems((prevCartItems) => {
                    const newCartItems = { ...prevCartItems };
                    newCartItems[key] = (newCartItems[key] || 0) + 1;
                    return newCartItems;
                });
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Error al añadir al carrito:', error));
    };

    const removeFromCart = (itemId, size) => {
        const authToken = localStorage.getItem('auth-token');
        let guestCartId = localStorage.getItem('guestCartId');

        if (!guestCartId) {
            guestCartId = Math.random().toString(36).substring(2, 15);
            localStorage.setItem('guestCartId', guestCartId);
        }

        const key = `${itemId}-${size}`;

        if (!authToken) {
            setCartItems((prevCartItems) => {
                const newCartItems = { ...prevCartItems };
                if (newCartItems[key] > 0) {
                    newCartItems[key] -= 1;
                }
                return newCartItems;
            });
            const updatedCartItems = { ...cartItems, [key]: (cartItems[key] || 0) - 1 };
            localStorage.setItem('guestCartItems', JSON.stringify(updatedCartItems));

            fetch(`http://localhost:4000/removefromcartguest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'guestCartId': guestCartId
                },
                body: JSON.stringify({ "productId": itemId, "size": size }),
                credentials: 'include'
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error removing product from cart');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    const cartItemsArray = Object.values(updatedCartItems);
                    if (cartItemsArray.length === 0 || (cartItemsArray.length === 1 && cartItemsArray[0] === 0)) {
                        localStorage.removeItem('guestCartId');
                        localStorage.removeItem('guestCartItems');
                    }
                })
                .then((data) => console.log(data))
                .catch((error) => console.error('Error removing product from cart:', error));

            return;
        }

        fetch('http://localhost:4000/removefromcart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ "productId": itemId, "size": size }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error removing product from cart');
                }
                setCartItems((prev) => {
                    const newCartItems = { ...prev };
                    if (newCartItems[key] > 0) {
                        newCartItems[key] -= 1;
                    }
                    return newCartItems;
                });
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Error al remover del carrito:', error));
    };

    const mergeCarts = async () => {
        const authToken = localStorage.getItem("auth-token");
        const guestCartItems = JSON.parse(localStorage.getItem("guestCartItems"));
        const guestCartId = localStorage.getItem("guestCartId");
        const userCartId = localStorage.getItem("userCartId");

        if (authToken && guestCartItems && guestCartId) {
            try {
                await axios.post("http://localhost:4000/mergecarts", { guestCartItems, userCartId }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        guestCartId: guestCartId,
                        userCartId: userCartId,
                    },
                    credentials: 'include'
                });

                localStorage.removeItem("guestCartItems");
                localStorage.removeItem('guestCartId');
                setCartItems(guestCartItems);
            } catch (error) {
                console.error("Error al fusionar carritos:", error);
            }
        }
    };

    useEffect(() => {
        mergeCarts();
    }, []);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const key in cartItems) {
            if (cartItems[key] > 0) {
                const [itemId, size] = key.split('-');
                let itemInfo = all_product.find((product) => product.id === Number(itemId));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[key];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const key in cartItems) {
            if (cartItems[key] > 0) {
                totalItem += cartItems[key];
            }
        }
        return totalItem;
    };

    const renderProducts = () => {
        return all_product.map((product) => (
            <div key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Precio: {product.new_price}</p>
                <p>Tallas disponibles: {product.tallas.join(', ')}</p>
                {/* Renderizar imágenes, etc. */}
            </div>
        ));
    };

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        getDefaultCart,
        mergeCarts,
        renderProducts
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
