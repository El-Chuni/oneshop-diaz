import React, { createContext, useState, useEffect } from "react";

export const carrito = createContext({});
const { Provider } = carrito;
const carritoDeLocalStorage = JSON.parse(localStorage.getItem('contenido') || '[]' );

//El contexto del carrito, el contenido es lo que lleva y las otras constantes sirven de función para actualizarlo

const ContextoCompras = ({children}) => {

    const [contenido, setContenido] = useState(carritoDeLocalStorage);

    useEffect(() => {
    
        localStorage.setItem('contenido', JSON.stringify(contenido))
    
    }, [contenido])

    

    const existeEnElCarrito = (item) => {
        if (contenido.find((producto) => producto.id === item.id)) {
            return true
        }else{
            return false
        }
    }

    const llenarCarrito = (productoParaCarrito) =>{
        
        if(existeEnElCarrito(productoParaCarrito)){

            const actualizarCarrito = contenido.map((prod) => {

                if(prod.id === productoParaCarrito.id){

                    return {...prod, cantidad: prod.cantidad + productoParaCarrito.cantidad}

                }else{

                    return prod

                }

            })

            setContenido(actualizarCarrito)

        }else{

            setContenido([...contenido, productoParaCarrito])
        }
        
        console.log(contenido)
    }

    const sacarDelCarrito = (id) => {
        setContenido(contenido.filter(producto => producto.id !== id));
    }

    const cantidadTotal = () =>{
        return contenido.reduce((acc, item)=> acc += item.cantidad, 0)

    }
    const totalCarrito = () => {
        return (contenido.reduce((acc, item)=> acc += item.cantidad * item.precio, 0)).toFixed(2)
    }

    const resetearCarrito = () => {
        setContenido([])
    }


    return (
        <Provider value={{contenido, llenarCarrito, sacarDelCarrito, existeEnElCarrito, totalCarrito, resetearCarrito, cantidadTotal}} >
            {children}
        </Provider>
    )


}


export default ContextoCompras;