import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/addProduct.css'
import ApiService from "../../service/ApiService";

const AddProductPage = () => {
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        ApiService.getAllCategory().then(
            (res) => setCategories(res.data)
        );
    }, []);

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('categoryId', categoryId);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('stock', stock);

            const response = await ApiService.addProduct(formData);
            if (response.status === 200) {
                setMessage(response.message)
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/products')
                }, 1000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="product-form">
                <h2>상품 등록</h2>
                {message && <div className="message">{message}</div>}
                <input type="file" onChange={handleImage} />
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} >
                    <option value="">카테고리 선택</option>
                    {categories.map((category) => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>
                <input type="text"
                    placeholder="상품 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <textarea
                    placeholder="설명"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />

                <input type="number"
                    placeholder="가격"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />

                <input type="number"
                    placeholder="재고"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)} />
                <button type="submit">상품 등록</button>
            </form>
        </div>
    )


}
export default AddProductPage;