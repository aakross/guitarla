import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {
    //State
    // const [auth, setAuth] = useState(false);
    // const [total, setTotal] = useState(0);
    // const [cart, setCart] = useState([]);
    // //useEffect
    // useEffect(() => {

    // }, [auth]);

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data, setData] = useState(db);//Aqui se pasa la informacion de la base de datos utilizando useState
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id);
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= 5) return
            const updateCart = [...cart] // Aqui se crea una copia del carrito utilizando el operator spread, ya que el state es inmutable por eso se hace de esta forma
            updateCart[itemExist].quantity++//Aqui se toma la copia del state para incrementarlo
            setCart(updateCart)//Aqui lo seteamos para incrementar el carrito sin mutar el state original
        } else {
            item.quantity = 1,
                setCart([...cart, item])
        }

    }

    function removeFromCart(id) {
        //Se regresa como callback donde tendremos el valor previo del carrito y este se lo pasa al filter el cual nos permite acceder al arreglo
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) //Esto filtra las guitarras cuyo id que sean diferentes a id y las eliminara
    }

    function decreaseQuantity(id) {
        console.log('decrementando', id);
        const decreaseCart = cart.map(item => {
            if (item.id === id && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(decreaseCart)
    }

    function increaseQuantity(id) {
        console.log('Incrementando', id);
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity < 5) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function cleanCart() {
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
                    {data.map((guitar) => ( //Se esta declarando guitar en el map para poder pasarle la data y por medio de este guitar se accede a la informacion
                        <Guitar //Aqui se pasan por medio de props la informacion de la BD
                            key={guitar.id}
                            guitar={guitar}
                            cart={cart}
                            setCart={setCart}
                            addToCart={addToCart}
                            cleanCart={cleanCart}
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