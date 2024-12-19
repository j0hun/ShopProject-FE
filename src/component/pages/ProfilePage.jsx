import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/profile.css';
import Pagination from "../common/Pagination";

const ProfilePage = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserInfo();
    }, []);
    const fetchUserInfo = async () => {

        try {
            const response = await ApiService.getLoggedInUserInfo();
            console.log(response)
            setUserInfo(response.data);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    }

    if (!userInfo) {
        return <div>사용자 정보를 찾을 수 없습니다.</div>
    }

    const handleAddressClick = () => {
        navigate(userInfo.address ? '/edit-address' : '/add-address');
    }

    return (
        <div className="profile-page">
            <h2>{userInfo.name}님 환영합니다.</h2>

            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <p><strong>이름: </strong>{userInfo.name}</p>
                    <p><strong>이메일: </strong>{userInfo.email}</p>
                    <p><strong>전화번호: </strong>{userInfo.phoneNumber}</p>

                    <div>
                        <h3>주소</h3>
                        {userInfo.address ? (
                            <div>
                                <p><strong>주소: </strong>{userInfo.address.baseAddress},{userInfo.address.detailAddress}</p>
                                <p><strong>우편번호: </strong>{userInfo.address.postalCode}</p>
                            </div>
                        ) : (
                            <p>주소가 없습니다.</p>
                        )}
                        <button className="profile-button" onClick={handleAddressClick}>
                            {userInfo.address ? "주소 수정" : "주소 등록"}
                        </button>
                    </div>                
                </div>
            )}
        </div>
    )
}
export default ProfilePage;