import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Ticketform.css';
import TopNavbar from "../TopNavbar/TopNavbar.jsx";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const getTenantIdFromUrl = () => {
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null; 
  };


const Ticketform = () => {

    const tenantId=getTenantIdFromUrl();

    return(
        <div className="ticket-form-page">
                 <div className="call_nav">
    <TopNavbar/>
  </div>
  <div className="ticketform">
        <div className="ticket-sidebar">
        <Link to={`/${tenantId}/ticket`}>Back</Link>
      </div>
      <div className="form-ticket">
        <div className="ticket-form-header">
        <h1>Generate a Ticket</h1>
        <button className="newticket-button">+Create a new ticket</button>
      </div>
      <div className="ticket-box">
            <h2>Create new Ticket</h2>
            <div className="ticket-input-flex-container">
                            <div className="ticket-input-group">
                                <label htmlFor="contactName">Enter contact Name</label>
                                <input type="text" id="contactName" name="contactName" placeholder='Enter the task'/>
                            </div>
                            <div className="ticket-input-group">
                                <label htmlFor="accountName">Enter Account Name</label>
                                <input type="text" id="accountName" name="accountName" placeholder='Enter the task' />
                            </div>
                        </div>
                        <div className="ticket-input-flex-container">
                        <div className="ticket-input-group">
                            <label htmlFor="contactMail">Enter Contact mail</label>
                            <input type="text" id="contactMail" name="contactMail" placeholder='Enter the task' />
                        </div>
                        <div className="ticket-input-group">
                                <label htmlFor="reason">Select the Reason of Raising Ticket</label>
                                <select  className=" ticket-select" id="reason" name="reason">
                                    <option value="">Select a reason...</option>
                                    <option value="Technical Issue">Technical Issue</option>
                                    <option value="Account Inquiry">Account Inquiry</option>
                                    <option value="Billing Issue">Billing Issue</option>
                                    <option value="Feature Request">Feature Request</option>
                                </select>
                            </div>
                        </div>
                        <div className="ticket-input-flex-container">
                        <div className="ticket-input-group">
                        <label htmlFor="file-upload" className="ticket-upload-label">Upload Related Documents
                            </label>
                            <button className="ticket-input-button"> Upload File</button>
                        </div>
                        <div className="ticket-input-group">
                            <div className="ticket-addcomment">
                            <label htmlFor="comment">Add Comment</label>
                            <textarea id="comment" name="comment" rows="4" cols="50"></textarea>
                        </div>
                        </div>
                        </div>
                        <div className="generate-ticket-container">
                            <button className="generate-ticket-button">
                                <AddCircleOutlineIcon className="generate-ticket-icon" /> Generate Ticket
                            </button>
                        </div>
     </div>
      </div>
      </div>
      </div>
    );

}

export default Ticketform;