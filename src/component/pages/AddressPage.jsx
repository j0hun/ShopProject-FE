import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/address.css';

const AddressPage = () => {

    const [address, setAddress] = useState({
        baseAddress: '',
        detailAddress: '',
        postalCode: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/edit-address') {
            fetchUserInfo();
        }
    }, [location.pathname]);

    const fetchUserInfo = async () => {
        try {
            const response = await ApiService.getLoggedInUserInfo();
            if (response.data.address) {
                setAddress(response.data.address)
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }))
    }

    const handSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService.saveAddress(address);
            navigate('/profile')
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        }
    }

    return (
        <div className="address-page">
            <h2>{location.pathname === '/edit-address' ? '주소 수정' : "주소 등록"}</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handSubmit}>
                <label>
                    주소:
                    <input type="text"
                        name="baseAddress"
                        value={address.baseAddress}
                        onChange={handleChange}
                        required />
                </label>

                <label>
                    상세 주소:
                    <input type="text"
                        name="detailAddress"
                        value={address.detailAddress}
                        onChange={handleChange}
                        required />
                </label>

                <label>
                    우편번호:
                    <input type="text"
                        name="postalCode"
                        value={address.postalCode}
                        onChange={handleChange}
                        required />
                </label>
                <button type="submit">{location.pathname === '/edit-address' ? '주소 수정' : "주소 등록"}</button>
            </form>
        </div>
    )

}
export default AddressPage;