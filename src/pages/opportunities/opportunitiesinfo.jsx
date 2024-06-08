import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from "../../api.jsx";
import './opportunities-info.css';

const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

const OpportunitiesInfo = () => {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const tenantId=getTenantIdFromUrl();
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    fetchOpportunity();
  }, [id]);

  const fetchOpportunity = async () => {
    try {
      const response = await axiosInstance.get(`/opportunities/${id}/`);
      setOpportunity(response.data);
      setEditedValues(response.data);
      console.log('Opportunity details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching opportunity details:', error);
    }
  };

  const stages = [
    'QUALIFICATION',
    'NEEDS ANALYSIS',
    'VALUE PROPOSITION',
    'ID.DECISION MAKERS',
    'PERCEPTION ANALYSIS',
    'PROPOSAL/PRICE QUOTE',
    'NEGOTIATION/REVIEW',
    'CLOSED WON',
    'CLOSED LOST',
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.patch(`/opportunities/${id}/`, editedValues);
      setOpportunity(response.data); // Update the opportunity state with the response data
      setIsEditing(false);
      console.log("Field updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating field:", error);
    }
    setIsEditing(false);
    const interactionData = {
      entity_type: "Opportunity",
      entity_id: id,
      interaction_type: "Note",
      tenant_id: tenantId, 
      notes: `User with ${id} makes changes in the details of the ${id}`,
    };
  
    try {
        await axiosInstance.post('/interaction/', interactionData);
        console.log('Interaction logged successfully');
      } catch (error) {
        console.error('Error logging interaction:', error);
      }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedValues(opportunity); // Reset edited values to original opportunity data
  };

  if (!opportunity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Opportunities-info-page">
      <div className="opportunities-Sidebar">
        <Link to={`/${tenantId}/opportunities`}>Back</Link>
      </div>
      <div className="opportunities-info">
        <h1>Opportunities Info</h1>
        <div className="opportunity-button">
        <button className="edit-button" onClick={handleEdit} disabled={isEditing}>Edit</button>
        {isEditing && (
          <>
            <button className="save-button" onClick={handleSubmit}>Save</button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>
      </div>
      <div className="content">
        <div className="info-box">
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedValues.name}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="info-pair">
              <label htmlFor="account">Account:</label>
              <input
                type="text"
                id="account"
                name="account"
                value={editedValues.account}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className="info-row">
      <div className="info-pair">
        <label htmlFor="stage">Stage:</label>
        {isEditing ? (
          <select
            id="stage"
            name="stage"
            value={editedValues.stage}
            onChange={handleChange}
          >
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            id="stage"
            name="stage"
            value={editedValues.stage}
            readOnly
          />
        )}
    </div>
            <div className="info-pair">
              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={editedValues.amount}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="leadSource">Lead Source:</label>
              <input
                type="text"
                id="leadSource"
                name="leadSource"
                value={editedValues.leadSource}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="info-pair">
              <label htmlFor="probability">Probability:</label>
              <input
                type="text"
                id="probability"
                name="probability"
                value={editedValues.probability}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>
        <div className="info-box-custom">
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="contacts">Contacts:</label>
              <input
                type="text"
                id="contacts"
                name="contacts"
                value={editedValues.contacts}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="info-pair">
              <label htmlFor="closedBy">Closed By:</label>
              <input
                type="text"
                id="closedBy"
                name="closedBy"
                value={editedValues.closedBy}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className="info-row">
            <div className="info-pair textarea-pair">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={editedValues.description}
                onChange={handleChange}
                readOnly={!isEditing}
              ></textarea>
            </div>
            <div className="info-pair">
              <label htmlFor="closedOn">Closed On:</label>
              <input
                type="text"
                id="closedOn"
                name="closedOn"
                value={editedValues.closedOn}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="createdBy">Created By:</label>
              <input
                type="text"
                id="createdBy"
                name="createdBy"
                value={editedValues.createdBy}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="info-pair">
              <label htmlFor="createdOn">Created On:</label>
              <input
                type="text"
                id="createdOn"
                name="createdOn"
                value={editedValues.createdOn}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesInfo;
