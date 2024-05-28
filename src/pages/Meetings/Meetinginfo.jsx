import React, { useState, useEffect } from "react";
import axiosInstance from "../../api";

import { Link, useParams } from "react-router-dom";

const getTenantIdFromUrl = () => {
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1]; 
    }
    return null;
  };

const MeetingInfo = () => {
  const { id } = useParams();
  const tenantId = getTenantIdFromUrl();

  const [meetingInfo, setMeetingInfo] = useState({});

  useEffect(() => {
    const fetchMeetingInfo = async () => {
      try {
        const response = await axiosInstance.get(`/meetings/${id}`);
        setMeetingInfo(response.data);
      } catch (error) {
        console.error("Error fetching meeting info:", error);
      }
    };

    fetchMeetingInfo();
  }, [id]);

  return (
    <div>
      <div className="meet-head">
      <div className="meetinglist">
        <Link to={`../${tenantId}/meetings`} id='back-inter-task'>
          Back
        </Link>
      </div>
      <div>
      <div>
      <h1 className='meeting-infohead'>Meeting Info</h1>
      </div>
      <div className="meeting_infobox1">
      <ul>
        <li className="meet-list">Title  : 
        <span className="meet-list-data">
        {meetingInfo.title}</span></li>
        <li className="meet-list">From   :
        <span className="meet-list-data1"> {meetingInfo.from_time}</span> </li>
        <li className="meet-list">To : 
        <span className="meet-list-data2">{meetingInfo.to_time}</span></li>
        <li className="meet-list">Related To  :
        <span className="meet-list-data3">{meetingInfo.related_to}</span> </li>
        <li className="meet-list">Contact Name   :
        <span className="meet-list-data4">
        {meetingInfo.contact_name}</span> </li>
        <li className="meet-list">Host Name  : 
        <spna className="meet-list-data5">{meetingInfo.host}</spna></li>
      
      </ul>
      </div>
      <div className="meeting_infobox2">
      <ul>
        <li className="meet-list">Description  : 
        <span className="meet-list-data">
        {meetingInfo.description}</span></li>
        <li className="meet-list">Assigned To   :
        <span className="meet-list-data1"> {meetingInfo.assigned_to}</span> </li>
        <li className="meet-list">Created By: 
        <span className="meet-list-data2">{meetingInfo.createdBy}</span></li>
        <li className="meet-list">Tanent :
        <span className="meet-list-data3">{tenantId}</span> </li>
       
        
      
      </ul>
      </div>
      </div>
     
      </div>
 
        
      
      
    </div>
  );
};

export default MeetingInfo;
