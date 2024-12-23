import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import '../../style/orderHistoryPage.css';

const OrderHistoryPage = () => {

    const [orderHistory, setOrderHistory] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrderHistory();
    },[]);

    const fetchOrderHistory = async () => {
        try {
            const response = await ApiService.getOrderHistory();
            console.log(response.data);
            setOrderHistory(response.data);
        }catch(error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="order-history-page">
            <h1>주문 내역</h1>

            {error && <p className="error-message">{error}</p>}

            {orderHistory.length === 0 ? (
                <p>주문 내역이 없습니다.</p>
            ) : (
                <div>
                    {orderHistory.map((order) => (
                        <div key={order.id} className="order-card">
                            <h3>주문 ID: {order.id}</h3>
                            <p>총액: {order.totalPrice}원</p>
                            <div>
                                <h4>주문 아이템</h4>
                                <ul>
                                    {order.orderItemList.map((item) => (
                                        <li key={item.id} className="order-item">
                                            <img src={`http://localhost:8080${item.product.imageUrl}`} alt={item.product.name} className="product-image" />
                                            <div className="order-item-info">
                                                <h5>{item.product.name}</h5>
                                                <p>상품 설명: {item.product.description}</p>
                                                <p>가격: {item.price}원</p>
                                                <p>수량: {item.quantity}</p>
                                                <p>상태: {item.status}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination 컴포넌트가 필요하다면 여기에 추가 */}
            {/* <Pagination currentPage={currentPage} totalPages={totalPages} /> */}
        </div>
    );

}

export default OrderHistoryPage;