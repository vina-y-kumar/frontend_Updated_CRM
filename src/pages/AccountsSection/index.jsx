import "./accountsSection.css";
import { Sidebar } from "../../components/Sidebar/index.jsx";
import AccountsTable1 from "../../components/AccountsTableContent/Table.jsx";
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
    <div className='accounts_main_page'>
              <div className="home_left_box1">
                <Sidebar />
              </div>
              <div className="accounts_containerofcomp_accountstable1">
              <AccountsTable1/>
              </div>
    </div>
  );
};
