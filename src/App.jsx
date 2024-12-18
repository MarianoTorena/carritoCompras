import { useEffect, useState } from "react";
import Header from "./components/Header"
import ProductCard from "./components/Product"
import { db } from "./data/db";

function App() { 
    const [products, setProducts] = useState(db);
    const [cart, setCart] = useState([]);

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

    function cleanCart(e) {
        setCart([]);
    }

    return (
        <>
        <Header 
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            cleanCart={cleanCart}
        />
        
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>
            
            <div className="row mt-5">
                {products.map((product) => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                    />
                ))}
                
            </div>
        </main>

        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>

        </>
    )
}

export default App
