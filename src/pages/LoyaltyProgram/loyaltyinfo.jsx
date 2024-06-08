import { NavLink, Link } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Dropdown, Card, ListGroup } from "react-bootstrap";
import axiosInstance from "../../api";
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; // Adjust the import path
import './loyalty.css';
import React, { useState, useEffect } from 'react';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const getTenantIdFromUrl = () => {
    // Example: Extract tenant_id from "/3/home"
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null;
  };

const LoyaltyInfo = () => {
    const tenantId = getTenantIdFromUrl();

    const [loyal, setLoyal] = useState(null); // Initialize with null instead of empty array
    const [id, setId] = useState(null); // State to hold the fetched id   
    useEffect(() => {
        const fetchLoyaltyId = async () => {
            try {
                const response = await axiosInstance.get('/loyalty_programs/');
                const firstProgram = response.data[0]; // Assuming you need the first program's id
                if (firstProgram) {
                    setId(firstProgram.id);
                }
            } catch (error) {
                console.error("Error fetching loyalty programs:", error);
            }
        };

        fetchLoyaltyId();
    }, []);


    useEffect(() => {
        const fetchLoyaltyDetails = async () => {
            if (id) {
                try {
                    const response = await axiosInstance.get(`/loyalty_programs/${id}`);
                    setLoyal(response.data);
                } catch (error) {
                    console.error("Error fetching loyalty program details:", error);
                }
            }
        };

        fetchLoyaltyDetails();
    }, [id]);

    if (!loyal) {
        return <div>Loading...</div>;
    }

  return (
    <div className='loyal_page'>
        <div className="home_left_box-loyal">
            <Sidebar />
        </div>
        <div>
            <div className='loyal_topbar'>
                <TopNavbar />
            </div>
            <div>
                <h1 className='loyal-head'>Loyalty Program</h1>
            </div>
            <div className='total-loyal'>
                <span><LoyaltyIcon style={{ width: '28px', height: '28px', fill: '#FFFFFFFF' }} />Loyalty Points</span>
                <p className='total-loyal1'>15</p>
            </div>
            <div>
                <h1 className='loyalprogram'>Program Type :<span className='loyalprogram1'>Loyalty Points</span></h1>
                <p className='loyalprogram2'>When customers make an order, they accumulate points</p>
                <p className='loyalprogram2'>they can exchange for rewards on the current order or on a future one</p>
            </div>
            <div className='loyal-box'>
                    <div className='loyal-program-details'>
                        <div>
                            <ul>
                                <li className='loyal_list'>Currency: <span className="loyal_list-data">{loyal.currency}</span></li>
                                <li className='loyal_list'>Pricelist: <span className="loyal_list-data">{loyal.pricelist}</span></li>
                                <li className='loyal_list'>Points Unit: <span className="loyal_list-data">{loyal.points_unit}</span></li>
                                <li className='loyal_list'>Start Date: <span className="loyal_list-data">{loyal.start_date}</span></li>
                                <li className='loyal_list'>End Date: <span className="loyal_list-data">{loyal.end_date}</span></li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li className='loyal_list'>Limit Usage</li>
                                <li className='loyal_list'>Company: <span className="loyal_list-data">{loyal.company}</span></li>
                                <li className='loyal_list'>Reward Type: <span className="loyal_list-data">{loyal.reward_type}</span></li>
                                <li className='loyal_list'>Website? <span className="loyal_list-data">{loyal.minimum_website}</span></li>
                                <li className='loyal_list'>Minimum Quantity: <span className="loyal_list-data">{loyal.minimum_quantity}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            <div className='btn-rulebtn'>
                <button className='btn-rule'>Rules & Rewards</button>
                <button className='btn-rule1'>Communications</button>
            </div>
            <div className='loyal__btnn'>
                <div>
                    <div className='btnn-loyall'>
                        <h1 className='loyal-rule'>Conditional rules</h1>
                        <div className='btnloyal'>
                            <button className='add-loyal'>+ Add</button>
                            <button className='edit-loyal'>+ Edit</button>
                        </div>
                    </div>
                    <div className='btnloyal-box'>
                        <div>
                            <p className="btnloyal-boxdata"> If minimum 1 item(s) bought</p>
                            <p>If minimum$1,000.00 spent</p>
                        </div>
                        <div>
                        <p className="btnloyal-boxdata"> You will get</p>
                        <p>10,000 Loyalty Points per $ spent</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='btnn-loyall'>
                        <h1 className='loyal-rule'>Rewards</h1>
                        <div className='btnloyal'>
                            <button className='add-loyal'>+ Add</button>
                            <button className='edit-loyal'>+ Edit</button>
                        </div>
                    </div>
                    <div className='btnloyal-box1'>
                    <div>
                            <p className="btnloyal-boxdata"> 10.00% discount on your order</p>
                            <p> In exchange of 200 Points</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoyaltyInfo;
