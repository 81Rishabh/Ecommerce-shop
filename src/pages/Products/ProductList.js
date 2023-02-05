import React from 'react'
import ProductCard from './ProductCard';

function ProductList(props) {
    const products = props.products;

    return (
        <div className="product-lists-container">
            {products 
                &&
              products.map(product => <ProductCard product={product} key={product.id} />
            )}
        </div>
    )
}

export default ProductList;