import React, { useState, useEffect } from "react";
import './TopNavbar.css';
import axiosInstance from "../../api.jsx";
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link } from 'react-router-dom'; 



const getTenantIdFromUrl = () => {
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1];
    }
    return null;
  };
const TopNavbar = ({}) => {
    const tenantId = getTenantIdFromUrl();
    const modelName = "TopNavbar";
    const [profileImageUrl, setProfileImageUrl] = useState(null); 


  const fetchProfileImageUrl = async () => {
    try {
      const response = await axiosInstance.get(`/documents/`); // Adjust the endpoint as needed
      console.log('GET request successful, response:', response.data[20]);
      setProfileImageUrl(response.data[20].file_url); // Assuming response.data.file_url contains the URL
      console.log(response.data[20].file_url);
    } catch (error) {
      console.error('Error fetching file URL:', error);
    }
  };

  useEffect(() => {
      fetchProfileImageUrl();
    
  }, []);


  return (
    <div className='topNavbar-head'>
        <CallRoundedIcon style={{ width:'24px', height:'24px' }}  className='topNavbar1'/>
      <InsertCommentRoundedIcon style={{ width:'24px', height:'24px' }} className='topNavbar2'/>
      <NotificationsNoneRoundedIcon style={{ width:'24px', height:'24px', fill:'#323743FF' }} className='topNavbar2'/>
      <Link to={`/${tenantId}/user_id`} className='topNavbar2'>
      {profileImageUrl ? (
          <img src={profileImageUrl}  style={{ width: '36px', height: '36px', borderRadius: '50%' }}  />
        ) : (
          <AccountCircleRoundedIcon style={{ width: '36px', height: '36px', fill: '#D3C1FAFF' }} />
        )}
      </Link>
    </div>
      
   
  )
}

export default TopNavbar
