import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "react-modal";
import axiosInstance from "../../api";
import { Button } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";

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
  const [callInfo, setCallInfo] = useState({});
 

  useEffect(() => {
    const fetchCallInfo = async () => {
        try {
            const response = await axiosInstance.get(`/callpage/${id}`);
            console.log("Response from API:", response.data); 
            setCallInfo(response.data);
        
        } catch (error) {
            console.error("Error fetching call info:", error);
         
        }
    };

    fetchCallInfo();
}, [id]);

// Add this below your JSX to check if callInfo is populated
console.log("callInfo:", callInfo);

 
 

  return (
    <div className="call-info">
      <div className="Call_combine">
      <div className="callpagelist">
        <Link to={`/${tenantId}/callpage`} id='back-inter-task'>
          Back
        </Link>
      </div>
      <div>
      <div>
      <h1 className="call_head">Call Info</h1>
      </div>
      <div >
      <div className="call-details">
       <div>
       <ul className="callpage_list">
         <li className="callpage_listtt">Contact Name -
         <span className="callpage_list_data">{callInfo.call_to}</span> </li>
         <li className="callpage_listtt">Call Type - 
         <span className="callpage_list_data">{callInfo.call_type}</span></li>
         <li className="callpage_listtt">Call Start Time - 
         <span className="callpage_list_data">{callInfo.start_time}</span></li>
         <li className="callpage_listtt">Call Duration - 
         <span className="callpage_list_data">{callInfo.call_duration}</span></li>
         <li className="callpage_listtt">Related To -
         <span className="callpage_list_data">{callInfo.related_to}</span> </li>
         <li className="callpage_listtt">Location - 
         <span className="callpage_list_data">{callInfo.location}</span></li>
         <li className="callpage_listtt">Recording - 
         <span className="callpage_list_data">{callInfo.voice_recording}</span></li>
       </ul>
       </div>
       <div className="tenet-call">
       
       <ul className="callpage_list1">
         <li className="callpage_listtt">Tenant-
         <span className="callpage_list_data">{tenantId}</span> </li>
         <li className="callpage_listtt">Voice Recording - 
         <span className="callpage_list_data">{callInfo.voice_recording}</span></li>
         <li className="callpage_listtt">Call Start Time - 
         <span className="callpage_list_data">{callInfo.start_time}</span></li>
         <li className="callpage_listtt">Call Duration - 
         <span className="callpage_list_data">{callInfo.call_duration}</span></li>
       
       </ul>
     
     </div>
      
     
     </div>
     <div>

     </div>
      </div>
      
     
      </div>
      
      </div>
     
    </div>
  );
};

export default CallPageInfo;
