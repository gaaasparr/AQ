import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

function ProductDetail() {
    const {id} = useParams()
    const [product, setProduct] = useState([])

    useEffect(() => {
        async function getProduct() {
            const response = await axios.get(`http://localhost:3001/productos`); // response es un objeto
            let prod = response.data.filter(prod => prod.id === id)
            setProduct(prod)
        }
        getProduct()
   // setProductos es una funcion que recibe un array de objetos
    }, [])


  return (
    <> 
    {!product.length ? (<p>Loading...</p>) : (
            <>
                <div>{product[0].title}</div>
                <div>{product[0].price}</div>
                <div>{product[0].condition}</div>
                <img src={product[0].thumbnail} alt="img not found" />
                <div>{product[0].accepts_mercadopago}</div>
                <div>{product[0].currency_id}</div>
                <div>{product[0].available_quantity}</div>
            </>
        )}
    </>

  )
}

export default ProductDetail