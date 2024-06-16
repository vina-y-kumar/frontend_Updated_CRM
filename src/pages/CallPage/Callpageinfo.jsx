import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../api";
import "./callpage.css";

const getTenantIdFromUrl = () => {
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; 
  }
  return null;
};

const CallPageInfo = () => {
  const { id } = useParams();
  const tenantId = getTenantIdFromUrl();
  const [callInfo, setCallInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    fetchCallInfo();
  }, [id]);

  const fetchCallInfo = async () => {
    try {
      const response = await axiosInstance.get(`/calls/${id}`);
      setCallInfo(response.data);
      setEditedValues(response.data);
      console.log("Call details fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching call details:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.put(`/calls/${id}/`, editedValues);
      setCallInfo(response.data);
      setIsEditing(false);
      
      const interactionData = {
        entity_type: "calls",
        entity_id: id, 
        interaction_type: "Note",
        tenant_id: tenantId,
        notes: `Call details updated - Contact Name: ${editedValues.call_to}, Call Type: ${editedValues.call_type}, Call Start Time: ${editedValues.start_time}, Call Duration: ${editedValues.call_duration}, Related To: ${editedValues.related_to}, Location: ${editedValues.location}, Voice Recording: ${editedValues.voice_recording}`,
        interaction_datetime: new Date().toISOString(),
      };

      await axiosInstance.post('/interaction/', interactionData);
      console.log('Interaction logged successfully');
      
      console.log("Call information updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating call information:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedValues(callInfo);
  };

  if (!callInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="call-info">
         <div className="callpagelist">
        <Link to={`/${tenantId}/callpage`} id='back-inter-task'>
          Back
        </Link>
        </div>
      <div className="call_info_pagee">
      <div className="call_head">
        <h1>Call Info</h1>

        </div>
      <div className="call-details">
     
        <ul className="callpage_list">
          <li className="callpage_list_item">
            <strong>Contact Name:</strong>
            {isEditing ? (
              <input
                type="text"
                name="call_to"
                className="callpage_list_data"
                value={editedValues.call_to}
                onChange={handleChange}
              />
            ) : (
              <span     className="callpage_list_da"   >{callInfo.call_to}</span>
            )}
          </li>
          <li className="callpage_list_item">
            <strong>Call Type:</strong>
            {isEditing ? (
              <input
                type="text"
                name="call_type"
                className="callpage_list_data"
                value={editedValues.call_type}
                onChange={handleChange}
              />
            ) : (
              <span className="callpage_list_da" >{callInfo.call_type}</span>
            )}
          </li>
          <li className="callpage_list_item">
            <strong>Call Start Time:</strong>
            {isEditing ? (
              <input
                type="text"
                name="start_time"
                className="callpage_list_data"
                value={editedValues.start_time}
                onChange={handleChange}
              />
            ) : (
              <span  className="callpage_list_da">{callInfo.start_time}</span>
            )}
          </li>
          <li className="callpage_list_item">
            <strong>Call Duration:</strong>
            {isEditing ? (
              <input
                type="text"
                name="call_duration"
                className="callpage_list_data"
                value={editedValues.call_duration}
                onChange={handleChange}
              />
            ) : (
              <span  className="callpage_list_da">{callInfo.call_duration}</span>
            )}
          </li>
          <li className="callpage_list_item">
            <strong>Related To:</strong>
            {isEditing ? (
              <input
                type="text"
                name="related_to"
                className="callpage_list_data"

                value={editedValues.related_to}
                onChange={handleChange}
              />
            ) : (
              <span  className="callpage_list_da">{callInfo.related_to}</span>
            )}
          </li>
          <li className="callpage_list_item">
            <strong>Location:</strong>
            {isEditing ? (
              <input
                type="text"
                name="location"
                className="callpage_list_data"

                value={editedValues.location}
                onChange={handleChange}
              />
            ) : (
              <span  className="callpage_list_da">{callInfo.location}</span>
            )}
          </li>
          <li className="callpage_list_item">
            <strong>Recording:</strong>
            {isEditing ? (
              <input
                type="text"
                name="voice_recording"
                className="callpage_list_data"

                value={editedValues.voice_recording}
                onChange={handleChange}
              />
            ) : (
              <span  className="callpage_list_da">{callInfo.voice_recording}</span>
            )}
          </li>
          
          


        </ul>
        <ul>
        <li className="callpage_list_item">
            <strong>Tenant ID:</strong>
            {isEditing ? (
              <input
                type="text"
                name="tenantId"
                className="callpage_list_data"
                value={editedValues.tenantId}
                onChange={handleChange}
              />
            ) : (
              <span className="callpage_list_da">{callInfo.tenantId}</span>
            )}
          </li>
          <li className="callpage_list_item">
            <strong>Voice Recording:</strong>
            {isEditing ? (
              <input
                type="text"
                name="voice_recording"
                className="callpage_list_data"
                value={editedValues.voice_recording}
                onChange={handleChange}
              />
            ) : (
              <span  className="callpage_list_da">{callInfo.voice_recording}</span>
            )}
          </li>
        </ul>
        <div className="button-container">
          {!isEditing ? (
            <button  className='edit-call'  onClick={handleEdit}>Edit</button>
          ) : (
            <>
              <button  className='edit-call-save'  onClick={handleSubmit}>Save</button>
              <button   className='edit-call-cancel' onClick={handleCancel}>Cancel</button>
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default CallPageInfo;
