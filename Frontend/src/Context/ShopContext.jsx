import React, {createContext, useEffect, useState} from "react";

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
    const [cartItems,setCartItems] = useState(getDefaultCart());
    
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
            }).then((response)=>response.json())
            .then((data)=>{
                console.log(data); 
                setCartItems(data);
            })
            .catch((error) => console.error('Error al obtener el carrito:', error));
        }
    }, [])
    
    const addToCart = (itemId) => {
        //setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        const authToken = localStorage.getItem('auth-token');
        if (authToken) {
            fetch('http://localhost:4000/addtocart', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Enviar el token en la cabecera de la solicitud
                },
                body: JSON.stringify({ "productId": itemId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error adding product to cart');
                    }
                    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
                    return response.json();
                })
                .then((data) => console.log(data))
                .catch((error) => console.error('Error al añadir al carrito:', error));
        }
    };
    

    const removeFromCart = (itemId) =>{
        const authToken = localStorage.getItem('auth-token');
        if(authToken){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Enviar el token en la cabecera de la solicitud
                },
                body:JSON.stringify({ "productId":itemId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error removing product from cart');
                    }
                    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
                    return response.json();
                })
                .then(data => {
                console.log('Producto eliminado del carrito:', data);
                })
                .catch((error) => console.error('Error al remover del carrito:', error));
        }
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
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

    const contextValue = {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount,getTotalCartItems};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>

    )
}

export default ShopContextProvider;