import React from "react";
import s from './Paginate.module.css';

export default function Paginate({productsPerPage, productos, paginate}) {
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(productos / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return( 
        <nav>
            <ul className={s.ul_container}>
                {pageNumbers && pageNumbers.map(num => (
                    <li key={num}><button onClick={() => paginate(num)}>{num}</button></li>
                ))}
            </ul>
        </nav>
    )
}