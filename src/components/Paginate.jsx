import React from "react";

export default function Paginate({productsPerPage, productos, paginate}) {
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(productos / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return( 
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(num => (
                    <li key={num}><button onClick={() => paginate(num)}>{num}</button></li>
                ))}
            </ul>
        </nav>
    )
}