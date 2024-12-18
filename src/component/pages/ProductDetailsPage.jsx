import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/productDetailsPage.css';


const ProductDetailsPage = () => {

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [productId])

    const fetchProduct = async () => {
        try {
            const response = await ApiService.getProductById(productId);
            setProduct(response.data);

        } catch (error) {
            console.log(error.message || error)
        }
    }

    const incrementQuantity = () => {
        setQuantity(quantity => quantity + 1);
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity => quantity - 1);
        }
    }

    const cart = async () => {
        try {
            const cartItem = {
                quantity: quantity,
            };
            await ApiService.createCart(productId,cartItem); // 백엔드에 데이터 전송
            alert("장바구니에 추가되었습니다.");
        } catch (error) {
            console.error("장바구니 추가 중 오류 발생:", error.message || error);
            alert("장바구니 추가에 실패했습니다.");
        }
    };

    if (!product) {
        return <p>Loading product details ...</p>
    }


    return (
        <div className="product-detail">
            <div className="product-img">
                <img src={`http://localhost:8080${product?.imageUrl}`} alt={product?.name} className="product-image" />
            </div>
            <div className="product">
                <h1>{product?.name}</h1>
                <p>{product?.description}</p>
                <span>{product.price}원</span>
                <div className="quantity-controls">
                    <button onClick={incrementQuantity}>+</button>
                    <span>{quantity}</span>
                    <button onClick={decrementQuantity}>-</button>
                </div>
                <button onClick={cart}>장바구니 담기</button>
                
            </div>
        </div>
    )

}

export default ProductDetailsPage;