import React from 'react'
import { Link } from "react-router-dom";
import './EditDocument.css';
import TopNavbar from '../TopNavbar/TopNavbar.jsx';


const getTenantIdFromUrl = () => {
    // Example: Extract tenant_id from "/3/home"
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null; // Return null if tenant ID is not found or not in the expected place
  };

const EditDocument = () => {
    const tenantId=getTenantIdFromUrl();


  return (

    <div className='edit-docspage'>
      <div className='side-editdocs'>
        <Link to={`/${tenantId}/home`} id='back-inter-task' className='back-button-edit'>
          Back
        </Link>
      </div>
      <div>
      <div className="editdocs-nav">
          <TopNavbar />
        </div>
      </div>
    </div>
  )
}

export default EditDocument
