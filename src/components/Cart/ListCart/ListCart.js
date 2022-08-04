import React from "react";
import ItemCart from "./ItemCart/ItemCart";
import { useContext } from "react";
import { carrito } from "../../../context/cartContext";


export const ListCart = ({aQuitar}) => {

    const { contenido } = useContext(carrito)

    

    const lista = contenido.map((producto) =>
        <div className="row m-2" key={producto.id}>
            <ItemCart producto={producto}/>
        </div>
    )

    return (
        <div className="d-flex flex-row justify-content-around flex-wrap">
            {lista}
        </div>
    )

}