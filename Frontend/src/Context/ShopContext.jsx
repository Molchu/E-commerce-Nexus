import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart= {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product,setAll_Product] = useState([]);
    const [cartItems,setCartItems] = useState({});
    useEffect(() => {
        setCartItems(getDefaultCart());
    }, []);
    
    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
        .catch((error) => console.error('Error al obtener los productos:', error));
        
        const authToken = localStorage.getItem('auth-token')
        if(authToken){
            fetch('http://localhost:4000/getcart',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
            })
            .then((response)=>response.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setCartItems((prevCartItems) => {
                        const newCartItems = { ...prevCartItems };
                        data.forEach((item) => {
                            const { id, quantity } = item;
                            newCartItems[id] = quantity; // Actualiza la cantidad del producto en el carrito
                        });
                        console.log(newCartItems); // Agrega esta línea para verificar el estado
                        return newCartItems;
                    });
                }
            })            
            .catch((error) => console.error('Error al obtener el carrito:', error));
        }
        else{
            const guestCartItems = JSON.parse(localStorage.getItem('guestCartItems'));
            if (guestCartItems) {
                setCartItems(guestCartItems);
            }
        }
    }, [])
    
    const addToCart = (itemId) => {
        const authToken = localStorage.getItem('auth-token');
        let guestCartId = localStorage.getItem('guestCartId');
        console.log('guestCartId:', guestCartId);
        // Configura la cookie en el localStorage si aún no está configurada
        if (!guestCartId) {
            guestCartId = Math.random().toString(36).substring(2, 15);
            localStorage.setItem('guestCartId', guestCartId);
        }
    
        if (!authToken) {
            setCartItems((prevCartItems) => {
                const newCartItems = { ...prevCartItems };
                newCartItems[itemId] = (newCartItems[itemId] || 0) + 1;
                return newCartItems;
            });
            const updatedCartItems = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
            localStorage.setItem('guestCartItems', JSON.stringify(updatedCartItems));
    
            // Envía los datos del carrito al servidor
            console.log('Sending request with guestCartId:', guestCartId);
            fetch('http://localhost:4000/addtocartguest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'guestCartId': guestCartId
                },
                body: JSON.stringify({ "productId": itemId }),
                credentials: 'include'
             }) // Incluir cookies en la solicitud
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
            body: JSON.stringify({ "productId": itemId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error adding product to cart');
                }
                setCartItems((prevCartItems) => {
                    const newCartItems = { ...prevCartItems };
                    newCartItems[itemId] = (newCartItems[itemId] || 0) + 1;
                    return newCartItems;
                });
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Error al añadir al carrito:', error));
    };
    
    
    

    const removeFromCart = (itemId) => {
        const authToken = localStorage.getItem('auth-token');
        let guestCartId = localStorage.getItem('guestCartId');
        console.log('guestCartId:', guestCartId);
    
        // Configura la cookie en el localStorage si aún no está configurada
        if (!guestCartId) {
            guestCartId = Math.random().toString(36).substring(2, 15);
            localStorage.setItem('guestCartId', guestCartId);
        }
        if (!authToken) {
            setCartItems((prevCartItems) => {
                const newCartItems = { ...prevCartItems };
                if (newCartItems[itemId] > 0) {
                    newCartItems[itemId] -= 1;
                }
                return newCartItems;
            });
            const updatedCartItems = { ...cartItems, [itemId]: (cartItems[itemId] || 0) - 1 };
            localStorage.setItem('guestCartItems', JSON.stringify(updatedCartItems));
        

            // Envía los datos del carrito al servidor
            console.log('Sending request with guestCartId:', guestCartId);
            fetch(`http://localhost:4000/removefromcartguest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'guestCartId': guestCartId
                },
                body: JSON.stringify({ "productId": itemId }),
                credentials: 'include'
            }) // Incluir cookies en la solicitud
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error removing product from cart');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // Check if cart is empty
                const cartItemsArray = Object.values(updatedCartItems);
                if (cartItemsArray.length === 0 || (cartItemsArray.length === 1 && cartItemsArray[0] === 0)) {
                    // Remove guestCartId and guestCartItems from localStorage
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
            body: JSON.stringify({ "productId": itemId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error removing product from cart');
                }
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Error al remover del carrito:', error));
    };

    const mergeCarts = async () => {
        const authToken = localStorage.getItem("auth-token");
        const guestCartItems = JSON.parse(localStorage.getItem("guestCartItems"));
        const guestCartId = localStorage.getItem("guestCartId"); // Obtener guestCartId de localStorage
        const userCartId = localStorage.getItem("userCartId");

        if (authToken && guestCartItems && guestCartId) {
          try {
            await axios.post("http://localhost:4000/mergecarts", { guestCartItems, userCartId }, {
              headers: {
                Authorization: `Bearer ${authToken}`,
                guestCartId: guestCartId, // Incluir guestCartId en los headers de la petición
                userCartId: userCartId, // Incluir userCartId en los headers de la petición
              },
              credentials: 'include'
            });
            
            // Limpiar el carrito de invitado después de la fusión
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

    const getDefaultCart = () => {
        try {
            const guestCartItems = JSON.parse(localStorage.getItem('guestCartItems'));
            return guestCartItems || {};
        } catch (error) {
            console.error('Error al parsear guestCartItems:', error);
            return {};
        }
    };
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                if(itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
            
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount,getTotalCartItems,getDefaultCart,mergeCarts};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>

    )
}

export default ShopContextProvider;