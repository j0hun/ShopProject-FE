import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import '../../style/addCategory.css'

const EditCategory = () => {
    const { categoryId } = useParams();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategory(categoryId);
    }, [categoryId])

    const fetchCategory = async () => {
        try {
            const response = await ApiService.getCategoryById(categoryId);
            setName(response.data.name);
        } catch (error) {
            setMessage(error.response?.data?.message || error.message)
            setTimeout(() => {
                setMessage('');
            }, 1000);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.updateCategory(categoryId, { name });
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate("/admin/categories")
                }, 1000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message)
        }
    }

    return (
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="category-form">
                <h2>카테고리 수정</h2>
                <input type="text"
                    placeholder="카테고리 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <button type="submit">수정</button>
            </form>
        </div>
    )

}
export default EditCategory;