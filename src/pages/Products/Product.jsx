import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Link } from "react-router-dom";
import "./product.css";
import axiosInstance from "../../api.jsx";
import { useNavigate } from 'react-router-dom';

const getTenantIdFromUrl = () => {
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
        return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null; 
};

export const Product = () => {
    const tenantId = getTenantIdFromUrl();
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        active: "",
        owner: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("/products/");
                setProducts(response.data);
                console.log(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleClick = () => {
        navigate(`/${tenantId}/productform`);
    };

    const filteredProducts = products.filter(
        (product) =>
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.product_code.includes(searchTerm) ||
          (filters.active === "" || product.productActive === (filters.active === "true")) &&
          (filters.owner === "" || product.product_owner.toLowerCase().includes(filters.owner.toLowerCase()))
      );

    const handleImport = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const content = event.target.result;
            const importedProducts = JSON.parse(content); // Assuming JSON format for simplicity
            setProducts([...products, ...importedProducts]);
        };

        reader.readAsText(file);
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(products, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "products.json";
        link.click();
    };

    return (
        <div className="product-page">
            <Sidebar className="product-sidebar" />
            <div className="product-content">
                <div className="product-header">
                    <h1>Products</h1>
                    <div className="product-header-actions">
                        <input
                            type="text"
                            placeholder="Search Products"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="product-search-bar"
                        />
                        <div className="product-import-export-container">
                            <button className="product-import-export-button">Import/Export</button>
                            <div className="product-dropdown-content">
                                <label className="product-import-label">
                                    Import
                                    <input
                                        type="file"
                                        className="import-button"
                                        onChange={handleImport}
                                        accept=".json"
                                        style={{ display: "none" }}
                                    />
                                </label>
                                <button className="product-export-button" onClick={handleExport}>Export</button>
                            </div>
                        </div>
                            <button className="product-add-product-button" onClick={handleClick}>+ Create Product</button>
                    </div>
                </div>
                <div className="product-filter-container">
                    <select
                        name="active"
                        value={filters.active}
                        onChange={handleFilterChange}
                        className="product-filter-select"
                    >
                        <option value="">All</option>
                        <option value="Yes">Active</option>
                        <option value="No">Inactive</option>
                    </select>
                    <input
                        type="text"
                        name="owner"
                        placeholder="Filter by Owner"
                        value={filters.owner}
                        onChange={handleFilterChange}
                        className="product-filter-input"
                    />
                </div>
                <div className="product-table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Code</th>
                                <th>Product Active</th>
                                <th>Product Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product, index) => (
                                 <tr key={product.id}>
                                  <Link to={`/${tenantId}/productinfo/${product.id}`}>{product.product_name}</Link>
                                 <td>{product.product_code}</td>
                                 <td>{product.productActive ? "Yes" : "No"}</td>
                                 <td>{product.product_owner}</td>
                               </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Product;
