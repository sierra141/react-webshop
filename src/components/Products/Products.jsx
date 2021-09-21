import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import Product from "./Product/Product";


const Products = ({ products, onAddToCart }) => {

    if(!products) return <CircularProgressbar value={50}/>
    return (
        <main>
        <div className='grid grid-cols-3 gap-4'>  
        {products.map((product) => (
            <div className='rounded overflow-hidden shadow-lg' item key={product.id}>     
                    <Product product = {product} onAddToCart={onAddToCart} />
            </div>
        ) )}
    </div>
    </main>

    );

}

export default Products;