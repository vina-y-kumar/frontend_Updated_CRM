import React, { useEffect, useState } from "react";
import ProductForm from "./productform";
import { Sidebar } from "../../components/Sidebar";
import { NavLink,Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./product.css";



export const Product = ()=>{
    return(
        <div className="product-page">
        <Sidebar className="product-sidebar"/>
        <div className="product-content">
            <div className="product-header">
            <h1>Products</h1>
            <Link to="/productform">
            <button className="add-product-button">Create Product</button>
          </Link>
            </div>
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
                        
                        <tr>
                            <td>Product 1</td>
                            <td>001</td>
                            <td>Yes</td>
                            <td>Owner 1</td>
                        </tr>
                        <tr>
                            <td>Product 2</td>
                            <td>002</td>
                            <td>No</td>
                            <td>Owner 2</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
        </div>
        </div>
    );
};
