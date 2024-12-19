import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import '../../style/adminCategory.css'

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await ApiService.getAllCategory();
            setCategories(response.data || []);
        } catch (error) {
            console.log("카테고리 목록을 불러오지 못했습니다.", error)
        }
    }

    const handleEdit = async (id) => {
        navigate(`/admin/edit-category/${id}`)
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm("카테고리 삭제를 하겠습니까?")
        if(confirmed) {
            try {
                await ApiService.deleteCategory(id);
                fetchCategories();
            }catch(error) {
                console.log("카테고리를 삭제하지 못했습니다.")
            }
        }
    }

    return (
        <div className="admin-category-page">
            <div className="admin-category-list">
                <h2>카테고리 목록</h2>
                <button onClick={()=> navigate('/admin/add-category')}>카테고리 등록</button>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <span>{category.name}</span>
                            <div className="admin-bt">
                                <button className="admin-btn-edit" onClick={()=> handleEdit(category.id)}>수정</button>
                                <button onClick={()=> handleDelete(category.id)}>삭제</button>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}
export default AdminCategoryPage;