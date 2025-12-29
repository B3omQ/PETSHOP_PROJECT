import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create(persist((set, get) => ({
    cart: [],
    addToCart: (product) => set((state) => {
        const existingItem = state.cart.find((item) => item.productId === product.productId)
        if (existingItem) {
            return {
                cart: state.cart.map((item) =>
                    item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
        }
        else {
            return { cart: [...state.cart, { ...product, quantity: 1 }] }
        }
    }),

    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.productId !== productId)
    })),

    updateQuantity: (productId, amount) => set((state) => ({
        cart: state.cart.map(item => {
            if (item.productId === productId) {
                const newQuantity = item.quantity + amount;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
            }
            return item
        })
    }))

})
    ,
    {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage), 
    }
));

