import React, { useState, useEffect } from 'react';
import {Link, useParams } from "react-router-dom";
import './TicketInfo.css';
import TopNavbar from "../TopNavbar/TopNavbar.jsx";
import axiosInstance from "../../api.jsx";

const getTenantIdFromUrl = () => {
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null; 
  };

const TicketInfo = () => {

    const tenantId=getTenantIdFromUrl();
    const { id } = useParams();
    const [ticketData, setTicketData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const response = await axiosInstance.get(`/tickets/${id}`);
                setTicketData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchTicketData();
    }, [id]);



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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div className="ticket-info-page">
            <div className="call_nav">
                <TopNavbar />
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
                                <label>Contact Name:</label> <span>{ticketData.contactName}</span>
                            </div>
                            <div className="additional-detail">
                                <label>Account Name:</label><span>{ticketData.owner}</span>
                            </div>
                        </div>
                        <div className="info-additional">
                            <div className="additional-detail">
                                <label>Email:</label><span>{ticketData.webemail}</span>
                            </div>
                            <div className="additional-detail">
                                <label>Related to:</label><span>{ticketData.case_reason}</span>
                            </div>
                        </div>
                        <div className="info-additional">
                            <div className="additional-detail">
                                <label>Status:</label><span>{ticketData.Status}</span>
                            </div>
                            <div className="additional-detail">
                                <label>Description:</label><span>{ticketData.description}</span>
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
                                    <label>Remarks:</label><span>{ticketData.subject}</span>
                                </div>
                                <div className="additional-detailinfo">
                                    <label>Add Comments:</label><span>{ticketData.addComments}</span>
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