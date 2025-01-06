import { useEffect, useState } from "react";
import { db } from "../data/db";
import { useMemo } from "react";

export const useCart = () => {
    const initialCart = () =>{
        const localDataCart = localStorage.getItem('cart');
        return localDataCart ? JSON.parse(localDataCart) : [];
    }

    const [products, setProducts] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_QUANTITY = 10;
    const MIN_QUANTITY = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(product) {
        const productExists = cart.findIndex(p => p.id === product.id);
        if (productExists >= 0) {
            const newCart = [...cart];
            newCart[productExists].quantity++;
            setCart(newCart);
        } else {
            setCart([...cart, {...product, quantity: 1}]);
        }
    }

    function removeFromCart(idProduct) {
        setCart(prevCart => prevCart.filter(product => product.id !== idProduct));
    }

    function increaseQuantity(idProduct) {
        const updatedCart = cart.map(product => {
            if (product.id === idProduct && product.quantity < MAX_QUANTITY) {
                return {
                    ...product,
                    quantity: product.quantity + 1
                }
            }
            return product;
        });
        setCart(updatedCart);
    }

    function decreaseQuantity(idProduct) {
        const updatedCart = cart.map(product => {
            if (product.id === idProduct && product.quantity > MIN_QUANTITY) {
                return {
                    ...product,
                    quantity: product.quantity - 1
                }
            }
            return product;
        });
        setCart(updatedCart);
    }

    function clearCart(e) {
        setCart([]);
    }
    //State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]); 
    const total = useMemo(() => cart.reduce((acc, product) => acc + product.price * product.quantity, 0), [cart]);

    return {
        products,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        total
    }
}