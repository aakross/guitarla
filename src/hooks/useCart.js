import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {

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

    //State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])//useMemo es un hook para el perfonmance
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0))

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        cleanCart,
        isEmpty,
        cartTotal
    }
}
