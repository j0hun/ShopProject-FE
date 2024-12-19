import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminProduct.css'
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";

const AdminProductPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    const fetchProducts = async () => {
        try {
            const response = await ApiService.getAllProducts();
            const productList = response.data || [];
            setTotalPages(Math.ceil(productList.length/itemsPerPage));
            setProducts(productList.slice((currentPage -1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const handleEdit = async (id) => {
        navigate(`/admin/edit-product/${id}`)
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm("상품을 삭제하겠습니까?")
        if (confirmed) {
            try {
                await ApiService.deleteProduct(id);
                fetchProducts();
            } catch (error) {
                setError(error.response?.data?.message || error.message)
            }
        }
    }

    return (
        <div className="admin-product-list">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <h2>상품 목록</h2>
                    <button className="product-btn" onClick={() => { navigate('/admin/add-product') }}>상품 등록</button>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <span>{product.name}</span>
                                <button className="product-btn" onClick={() => handleEdit(product.id)}>수정</button>
                                <button className="product-btn-delete" onClick={() => handleDelete(product.id)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)} />
                </div>
            )}
        </div>
    )

}
export default AdminProductPage;