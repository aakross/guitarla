import { useState } from "react";
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

    const [data, setData] = useState(db);//Aqui se pasa la informacion de la base de datos utilizando useState
    const [cart, setCart] = useState([]);

    function addToCart(item) {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id);
        if (itemExist >= 0) {
            console.log('Ya existe');
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }

    }

    return (
        <>
            <Header />
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