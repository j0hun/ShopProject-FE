import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import '../../style/orderHistoryPage.css';

const OrderHistoryPage = () => {

    const [orderItems, setOrderItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrderItems();
    }, []);

    const fetchOrderItems = async () => {
        try {
            const response = await ApiService.getOrderHistory(); 
            console.log(response.data);
            setOrderItems(response.data);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    const handleCancelOrderItem = async (orderItemId) => {       
        try {            
            // 주문 취소 API 호출
            await ApiService.cancelOrderItem(orderItemId);
            alert("주문이 취소되었습니다.");
            fetchOrderItems();
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="order-history-page">
            <h1>주문 상품 내역</h1>

            {error && <p className="error-message">{error}</p>}

            {orderItems.length === 0 ? (
                <p>주문 상품 내역이 없습니다.</p>
            ) : (
                <div>
                    {orderItems.map((item) => (
                        <div key={item.id} className="order-card">
                            <div>
                                <ul>
                                    <li className="order-item">
                                        <img src={`http://localhost:8080${item.product.imageUrl}`} alt={item.product.name} className="product-image" />
                                        <div className="order-item-info">
                                            <h5>{item.product.name}</h5>
                                            <p>상품 설명: {item.product.description}</p>
                                            <p>가격: {item.price}원</p>
                                            <p>수량: {item.quantity}</p>
                                            <p>합계: {item.price * item.quantity}</p>
                                            <p>상태: {item.status}</p>
                                            <button 
                                                className="cancel-btn"
                                                onClick={() => handleCancelOrderItem(item.id)}
                                                disabled={item.status !== 'COMPLETED'} // 주문 취소 가능한 상태일 때만 버튼 활성화
                                            >
                                                주문 취소
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistoryPage;
