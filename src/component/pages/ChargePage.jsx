import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "../../style/chargePage.css";

const ChargePage = () => {

    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        setAmount(e.target.value);
    };

    const handleCharge = async (e) => {
        e.preventDefault();

        try {
            const response = await ApiService.createCharge({ amount: amount });
            console.log(response)
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    navigate("/profile")
                }, 1000);
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message);
        }
    };

    return (
        <div className="charge-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleCharge} className="charge-form">
                <h2>금액 충전</h2>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={handleInputChange}                    
                />
                <button type="submit">충전</button>
            </form>
        </div>
    );
};

export default ChargePage;
