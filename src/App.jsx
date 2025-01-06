import Header from "./components/Header"
import ProductCard from "./components/Product"
import { useCart } from "./hooks/useCart";

function App() { 

    const {
        products,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        total
    } = useCart()

    return (
        <>
        <Header 
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}
            isEmpty={isEmpty}
            total={total}
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
