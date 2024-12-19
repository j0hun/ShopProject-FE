import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import '../../style/addCategory.css'

const AddCategory = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.createCategory({ name });
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
                <h2>카테고리 등록</h2>
                <input type="text"
                    placeholder="카테고리 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <button type="submit">등록</button>
            </form>
        </div>
    )
}

export default AddCategory;