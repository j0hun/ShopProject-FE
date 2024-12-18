import React from "react";
import { Link } from "react-router-dom";
import '../../style/productList.css';

const ProductList = ({ products }) => {

    return (
        <div className="product-list">
            {products.map((product, index) => {
                return (
                    <div className="product-item" key={index}>
                        <Link to={`/product/${product.id}`}>
                            <img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} className="product-image" />
                            <h3>{product.name}</h3>
                            <span>{product.price}원</span>
                        </Link>                        
                    </div>
                )
            })}
        </div>
    )
};
export default ProductList;