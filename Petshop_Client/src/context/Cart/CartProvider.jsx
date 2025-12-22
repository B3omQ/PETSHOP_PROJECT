import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    return (
        <CartContext.Provider value={{
            showCart,
            openCart: () => setShowCart(true),
            closeCart: () => setShowCart(false)
        }}>
            {children}
        </CartContext.Provider>
    );
};
export const useCart = () => useContext(CartContext);
export default CartProvider;
