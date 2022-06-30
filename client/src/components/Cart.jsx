import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getUserProducts () {
            const response = await axios.get('http://localhost:3001/users'); //me traigo todos los usuarios
            let filtro = response.data.findIndex((user) => user.id == cookies.get('id'));
            filtro = filtro + 1; 
            console.log(filtro)
            const userProducts = response.data[filtro].products;
            setProducts(userProducts);
        }
        getUserProducts()
    }, [])

    async function handleBuy() {
        alert('Compra realizada con exito');
        const user = {
            id: parseInt(cookies.get('id')) + 1,
        }
        console.log(user)
        axios.post('http://localhost:3001/users', {user})
        window.location.href="./cart";
    }
  return (
    <>
        <h1>My Cart</h1>
        <ul>
            {products?.map((product) => (
                <li key={product.id}>
                    {product.title} x1
                </li>
            ))}
        </ul>
        <button onClick={handleBuy}>Confirmar Compra</button>
    </>
  )
}

export default Cart