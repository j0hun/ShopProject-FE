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
            setCart(response.data);  // 가져온 데이터로 cart 상태 업데이트
        } catch (error) {
            console.error("Failed to fetch cart", error);
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

    const handleCheckout = async () => {
        if (!ApiService.isAuthenticated()) {
            setMessage("You need to login first before you can place an order");
            setTimeout(() => {
                setMessage('')
                navigate("/login")
            }, 3000);
            return;
        }

        const orderItems = cart.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        const orderRequest = {
            totalPrice,
            items: orderItems,
        };

        try {
            const response = await ApiService.createOrder(orderRequest);
            setMessage(response.message);

            setTimeout(() => {
                setMessage('');
            }, 5000);

            if (response.status === 200) {
                setCart([]);
            }

        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Failed to place an order');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    return (
        <div className="cart-page">
            <h1>Cart</h1>
            {message && <p className="response-message">{message}</p>}

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <img src={`http://localhost:8080${item?.imageUrl}`} alt={item.name} />
                                <div>
                                    <h2>{item.name}</h2>
                                    <p>{item.description}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => decrementItem(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => incrementItem(item)}>+</button>
                                    </div>
                                    <span>${item.price.toFixed()}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>Total: ${totalPrice.toFixed(2)}</h2>
                    <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    )
}

export default CartPage;
