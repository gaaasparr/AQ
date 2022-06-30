import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import s from './Home.module.css';


import { Link } from 'react-router-dom';

import Paginate from './Paginate';
import Searchbar from './Searchbar';
import ProductDetail from './ProductDetail';

const cookies = new Cookies();


export default function Home() {

    const [productos, setProductos] = useState([]); // productos es un array de objetos

    const [currentPage, setCurrentPage] = useState(1); // currentPage es un numero
    const [productsPerPage, setproductsPerPage] = useState(30); // productsPerPage es un numero
    const indexOfLastProduct = currentPage * productsPerPage;// indexOfLastProduct es un numero
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;// indexOfFirstProduct es un numero
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);// currentProducts es un array de objetos

    const paginate = pageNumber => setCurrentPage(pageNumber); // paginate es una funcion que recibe un numero

    function cerrarSesion(){
        cookies.remove('id', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href='./';
    }

    useEffect(() => {
        if(!cookies.get('username')){
            window.location.href="./";
        }

        async function getProductos() {
            const response = await axios.get('http://localhost:3001/productos'); // response es un objeto
            setProductos(response.data); // setProductos es una funcion que recibe un array de objetos
        } 
        
		
        getProductos(); 
        // getProductos es una funcion
	}, []);
    
    console.log(productos);

    function handleReload(e){
        window.location.reload(false);
    }

    function handleCart (id, product){
        console.log(id, product)
        const user = {
            id: cookies.get('id'),
            product: {
                id: id,
                title: product,
            }
        }
        console.log(user)
        axios.post('http://localhost:3001/users', {user}) //mandando la info al backend por body
        console.log('Producto agregado al carrito')
    }

    async function handleSearch(e) {
        const search = e.target.value;
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${search}`);
        console.log(search)
        setProductos(response.data.results);
        setCurrentPage(1)
    }

    console.log(cookies.get('username'));

    return (
        <>
        {/*<Link to='/a'><button>Agregar al Carrito</button></Link>*/}
        <p>Bienvenido {cookies.get('username')}</p>
        <button onClick={() => cerrarSesion()}>Cerrar Sesión</button>
        <figure className={s.App_logo}><img alt="Logo" src="/logo.png" /></figure>
        <Link to="/cart"><button>My Cart</button></Link>
        <Searchbar onSearch={(e) => handleSearch(e)}/>      {/*props*/}
        <button onClick={handleReload}>Reiniciar busqueda</button>
        <Paginate productsPerPage={productsPerPage} productos={productos.length} paginate={paginate}></Paginate>
        <div className={s.div_container}>
            {
                currentProducts && currentProducts.map((producto) => { // producto es un objeto
                    return (
                        <div className={s.div_container_items} key={producto.id}> {     /* key es una propiedad que se usa para identificar un elemento */}
                            <Link to={`/${producto.id}`}><h2>{producto.title}</h2></Link> {                                 /* title es una propiedad que se usa para mostrar un titulo */}
                            <div className={s.div_container_items_description}> {       /* div_container_items_description es una clase que se usa para mostrar una descripcion */}
                                <p>${producto.price}</p> {                              /* price es una propiedad que se usa para mostrar el precio */}
                                <img src={producto.thumbnail} alt="" /> {               /* thumbnail es una propiedad que se usa para mostrar una imagen */}
                                <button onClick={(e) => handleCart(producto.id, producto.title)}>Agregar al Carrito</button> {                   /* button es una clase que se usa para mostrar un boton */}
                            </div> 
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}