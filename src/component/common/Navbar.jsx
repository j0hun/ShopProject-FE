import React, { useState } from "react";
import '../../style/navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const Navbar = () => {

    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        navigate(`/?search=${searchValue}`)
    }

    const handleLogout = () => {
        const confirm = window.confirm("로그아웃 하시겠습니까?");
        if (confirm) {
            ApiService.logout();
            setTimeout(() => {
                navigate('/login')
            }, 500);
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/"> <img src="./mart.png" alt="Mart" /></NavLink>
            </div>
            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <input type="text"
                    placeholder="Search products"
                    value={searchValue}
                    onChange={handleSearchChange} />
                <button type="submit">Search</button>
            </form>

            <div className="navbar-link">
                <NavLink to="/categories" >카테고리</NavLink>
                {!isAuthenticated && <NavLink to="/login" >로그인</NavLink>}
                {!isAuthenticated && <NavLink to="/register" >회원가입</NavLink>}
                {isAuthenticated && <NavLink onClick={handleLogout} >로그아웃</NavLink>}
                {isAuthenticated && <NavLink to="/profile" >마이페이지</NavLink>}
                {isAuthenticated && <NavLink to="/cart" >장바구니</NavLink>}
                {isAdmin && <NavLink to="/admin" >관리자</NavLink>}
            </div>
        </nav>
    );
};
export default Navbar;