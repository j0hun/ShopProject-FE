import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";
import "../../style/home.css";

const Home = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {

        const fecthProducts = async () => {
            try {
                let allProducts = [];
                const queryparams = new URLSearchParams(location.search)
                const searchItem = queryparams.get('search')

                if (searchItem) {
                    const response = await ApiService.searchProducts(searchItem)
                    allProducts = response.data || [];
                } else {
                    const response = await ApiService.getAllProducts();
                    console.log(response)
                    allProducts = response.data || [];
                }

                setTotalPages(Math.ceil(allProducts.length / itemsPerPage))
                setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage))
            } catch (error) {
                setError(error.response?.data?.message || error.message || '상품을 찾을 수 없습니다.')
            }
        }
        fecthProducts();
    }, [location.search, currentPage])

    return (
        <div className="home">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <ProductList products={products} />
                    <Pagination currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)} />
                </div>
            )}
        </div>
    )

}
export default Home;