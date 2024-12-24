import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/cart.css'

const CartPage = () => {
    const [cart, setCart] = useState([]);  // 장바구니 상태
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await ApiService.getMyCart();  // getMyCart 호출하여 장바구니 데이터 가져오기
            console.log(response.data)
            setCart(response.data);  // 가져온 데이터로 cart 상태 업데이트
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    const incrementItem = (product) => {
        const updatedCart = cart.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCart(updatedCart);
    }

    const decrementItem = (product) => {
        const updatedCart = cart.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity }
                : item
        );
        setCart(updatedCart);
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleOrder = async () => {
        if (!ApiService.isAuthenticated()) {
            setMessage("주문을 하시려면 먼저 로그인이 필요합니다.");
            setTimeout(() => {
                setMessage('')
                navigate("/login")
            }, 1000);
        }

        const orderItems = cart.map(item => ({
            productId: item.product.id,
            quantity: item.quantity
        }));

        const orderRequest = {
            items: orderItems,
            orderType:"order"
        };

        try {
            const response = await ApiService.createOrder(orderRequest);
            setMessage(response.message);

            setTimeout(() => {
                setMessage('');
            }, 1000);

            if (response.status === 200) {
                
            }

        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
            setTimeout(() => {
                setMessage('');
            }, 1000);
        }
    };

    return (
        <div className="cart-page">
            <h1>장바구니</h1>
            {message && <p className="response-message">{message}</p>}

            {cart.length === 0 ? (
                <p>장바구니는 비어있습니다.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>                            
                                <img src={`http://localhost:8080${item.product.imageUrl}`} alt={item.name} />
                                <div>
                                    <h2>{item.name}</h2>
                                    <p>{item.description}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => decrementItem(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => incrementItem(item)}>+</button>
                                    </div>
                                    <span>{item.price.toFixed()}원</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>총액: {totalPrice}원</h2>
                    <button className="checkout-button" onClick={handleOrder}>주문하기</button>
                </div>
            )}
        </div>
    )
}

export default CartPage;
