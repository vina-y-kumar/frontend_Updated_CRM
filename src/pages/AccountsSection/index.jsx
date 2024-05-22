import "./accountsSection.css";
import { Header } from "../../components/Header/index.jsx";
import { Sidebar } from "../../components/Sidebar/index.jsx";
import AccountsTable1 from "../../components/AccountsTableContent/Table.jsx";
import { AccountTableContent } from "../../components/AccountsTableContent/index.jsx";
import React, { useState, useEffect } from 'react';
import './AccountForm.jsx';
import { NavLink } from 'react-router-dom';

const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};
export const AccountsTable = () => {
  const tenantId = getTenantIdFromUrl();
  const handleAllCalls1 = (event) => {
    console.log("Filter by: ", event.target.value);
  };

  const handleAction = (event) => {
    const selectedValue = event.target.value;
    console.log("Action required:", selectedValue);

    // Check the selected value and redirect accordingly
    if (selectedValue === "1") {
      // Redirect to the bulk import page
      navigate('/bulk-import');
    } else if (selectedValue === "2") {
      // Handle other actions as needed
      console.log("Logging out...");
    }
  };

  const handlePlusClick1 = () => {
    console.log("Plus clicked");
  };

  const handleRecords1 = (event) => {
    console.log("Records per page: ", event.target.value);
  };
 

  return (
    <div className="all_students">
      <div className='calls1'>
        <div className="home_left_box1">
          <Sidebar />
        </div>
        <div className="contain1" style={{width:"100%"}}>
          <div className="meet1" >

        
            <div className="Addcalls1">
              <select className="view-mode-select" onChange={handleAllCalls1}>
                <option value="">All Accounts</option>
                <option value="1">Log in</option>
                <option value="2">Log out</option>
              </select>  
            </div>
            <div className="accountlist">
          <h1 >Account list</h1>
          </div>
            <div className="handle1 ">
              {/* <select onChange={handlePlusClick1} className="view-mode-select">
                <option value="">!!!</option>
                <option value="1">Log in</option>
                <option value="2">Log out</option>
              </select>
               */}
              {/* <select className="view-mode-select" onChange={handleAction}>
                <option value="">Action</option>
                <option value="1">Bulk Import</option>
                <option value="2">Log out</option>
              </select>  */}
              <div className="create1">
                <NavLink to={`/${tenantId}/addaccount`} id="btn3">+CreateAccount</NavLink>
              </div>
            </div>
          </div>
          {/* <div className="records2"style={{width:"100%"}}>
            <select className="pages1" onChange={handleRecords1}>
              <option value="">50 Records per page</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div> */}
          {/* <div className="bugs">
            <div className="filter-container">
              <h2>Filter Accounts by</h2>
              <div className="search-bar">
                <input type="text" placeholder="Search..." />
              </div>
              <div className="dropdown-container">
                <button className="dropdown-button">System Defined Filters</button>
                <div className="dropdown-content">
                  <a href="#">Contacts</a>
                  <a href="#">Deals</a>
                  <a href="#">Deal Amount</a>
                  <a href="#">Deal Stage</a>
                  <a href="#">Deal Owner</a>
                  <a href="#">Deal Closing Date</a>
                  <a href="#">Locked</a>
                </div>
                <button className="dropdown-button">Filter By Fields</button>
                <div className="dropdown-content">
                  <a href="#">Account Name</a>
                  <a href="#">Account Number</a>
                </div>
              </div>
            </div>
            <div className="table1">
            <AccountsTable1 />
            </div>
          </div> */}
          <AccountsTable1/>
        </div>
      </div>
    </div>
  );
};
