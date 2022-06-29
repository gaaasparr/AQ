import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './Home.module.css';
import { Link } from 'react-router-dom';
import Paginate from './Paginate';


export default function Home() {

    const [productos, setProductos] = useState([]); // productos es un array de objetos

    const [currentPage, setCurrentPage] = useState(1); // currentPage es un numero
    const [productsPerPage, setproductsPerPage] = useState(30); // productsPerPage es un numero
    const indexOfLastProduct = currentPage * productsPerPage;// indexOfLastProduct es un numero
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;// indexOfFirstProduct es un numero
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);// currentProducts es un array de objetos

    const paginate = pageNumber => setCurrentPage(pageNumber); // paginate es una funcion que recibe un numero


    useEffect(() => {
        async function getProductos() {
            const response = await axios.get('http://localhost:3001/productos'); // response es un objeto
            setProductos(response.data); // setProductos es una funcion que recibe un array de objetos
        } 
		
        getProductos(); // getProductos es una funcion
	}, []);

    console.log(productos);

    return (
        <>
        <Link to='/a'><button>Agregar al Carrito</button></Link>
        <Paginate productsPerPage={productsPerPage} productos={productos.length} paginate={paginate}></Paginate>
        <div className={s.div_container}>
            {
                currentProducts && currentProducts.map((producto) => { // producto es un objeto
                    return (
                        <div className={s.div_container_items} key={producto.id}> {/* key es una propiedad que se usa para identificar un elemento */}
                            <h2>{producto.title}</h2> {/* title es una propiedad que se usa para mostrar un titulo */}
                            <div className={s.div_container_items_description}> {/* div_container_items_description es una clase que se usa para mostrar una descripcion */}
                                <p>${producto.price}</p> {/* price es una propiedad que se usa para mostrar el precio */}
                                <img src={producto.thumbnail} alt="" /> {/* thumbnail es una propiedad que se usa para mostrar una imagen */}
                                <button>Agregar al Carrito</button> {/* button es una clase que se usa para mostrar un boton */}
                            </div> 
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}