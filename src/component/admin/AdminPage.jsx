import React from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminPage.css';

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-page">
            <h1>관리자</h1>
            <button onClick={() => navigate("/admin/categories")}>카테고리 관리</button>
            <button onClick={() => navigate("/admin/products")}>상품 관리</button>
        </div>
    )
}
export default AdminPage;