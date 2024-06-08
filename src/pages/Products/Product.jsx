import React, { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Link } from "react-router-dom";
import "./product.css";

export const Product = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([
        { name: "Product 1", code: "001", active: "Yes", owner: "Owner 1" },
        { name: "Product 2", code: "002", active: "No", owner: "Owner 2" },
        // Add more products as needed
    ]);
    const [filters, setFilters] = useState({
        active: "",
        owner: ""
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };


    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.includes(searchTerm)
        (filters.active === "" || product.active === filters.active) &&
        (filters.owner === "" || product.owner.toLowerCase().includes(filters.owner.toLowerCase()))
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
                        <Link to="/productform">
                            <button className="product-add-product-button">+ Create Product</button>
                        </Link>
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
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.code}</td>
                                <td>{product.active}</td>
                                <td>{product.owner}</td>
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
