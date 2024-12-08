import { useEffect, useState } from "react";
import Header from "./components/Header"
import ProductCard from "./components/Product"
import { db } from "./data/db";

function App() { 
    const [products, setProducts] = useState(db);
    const [cart, setCart] = useState([]);

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

    return (
        <>
        <Header />
        
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
