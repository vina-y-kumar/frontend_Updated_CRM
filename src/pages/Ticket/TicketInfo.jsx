
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TicketInfo.css';
import TopNavbar from "../TopNavbar/TopNavbar.jsx";

const getTenantIdFromUrl = () => {
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null; 
  };

const TicketInfo = () => {

    const tenantId=getTenantIdFromUrl();
    const ticketNumber = "123456";
    const generatedTime = "2023-06-14 10:30 AM";
    const contactName = "John Doe";
    const accountName = "Acme Corporation";
    const email = "johndoe@example.com";
    const relatedTo = "Project X";
    const assignedPerson = "Jane Smith";
    const description = "This is a description of the ticket.";
    const remarks = "feaafgGEAGAGEGEG";
    const addComments="kfeak[-oskea[klc[sofKLc,[";


    const handleMarkAsSolved = () => {
        // Implement logic for marking as solved
        console.log("Marking as solved...");
    };

    const handleMarkAsImportant = () => {
        // Implement logic for marking as important
        console.log("Marking as important...");
    };

    const handleSave = () => {
        // Implement save logic
        console.log("Saving changes...");
    };


    return(
        <div className="ticket-info-page">
        <div className="call_nav">
        <TopNavbar/>
        </div>
        <div className="ticketinfo">
        <div className="ticket-info-sidebar">
        <Link to={`/${tenantId}/ticket`}>Back</Link>
      </div>
      <div className="info-ticket">
        <div className="ticket-info-header">
        <h1>Ticket Information</h1>
        <div className="ticket-markbutton">
        <button className="marksolved-button" onClick={handleMarkAsSolved}>+Mark as Solved</button>
        <button className="markimp-button" onClick={handleMarkAsImportant}>+Mark as Important</button>
        </div>
      </div>
      <div className="additional-details-box">
        <div className="info-additional">
                        <div className="additional-detail">
                            <label>Contact Name:</label> <span>{contactName}</span>
                        </div>
                        <div className="additional-detail">
                            <label>Account Name:</label><span>{accountName}</span>
                        </div>
                        </div>
                        <div className="info-additional">
                        <div className="additional-detail">
                            <label>Email:</label><span>{email}</span>
                            
                        </div>
                        <div className="additional-detail">
                            <label>Related to:</label><span>{relatedTo}</span>
                            
                        </div>
                        </div>
                        <div className="info-additional">
                        <div className="additional-detail">
                            <label>Assigned Person:</label><span>{assignedPerson}</span>
                            
                        </div>
                        <div className="additional-detail">
                            <label>Description:</label><span>{description}</span>
                        </div>
                        </div>
                        <div className='info-additional button'>
                            <button className="view-attachment">View Attachment</button>
                        </div>
                    </div>
                    <div className="additional-information">
                <h2>Additional Information:</h2>
                <div className="additional-information-box">
                    <div className="ticket-additional-info">
                    <div className="additional-detailinfo">
                <label>Remarks:</label><span>{remarks}</span>
                </div>
                <div className="additional-detailinfo">
                <label>Add Comments:</label><span>{addComments}</span>
                </div>
                </div>
                </div>
            </div>
            <div className="ticket-bottom-buttons">
                        <button className="ticketinfo-bottom-button-marksolved-button" onClick={handleMarkAsSolved}>+Mark as Solved</button>
                        <button className="ticketinfo-bottom-button-markimp-button" onClick={handleMarkAsImportant}>+Mark as Important</button>
                        <button className="ticketinfo-bottom-button-save-button" onClick={handleSave}>Save for later</button>
                    </div>
      </div>
      </div>
</div>
    );
};

export default TicketInfo;