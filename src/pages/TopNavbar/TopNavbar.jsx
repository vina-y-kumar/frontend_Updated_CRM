import React, { useState, useEffect } from "react";
import './TopNavbar.css';
import axiosInstance from "../../api.jsx";
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link } from 'react-router-dom';
import Chatbot from "../Chatbot/chatbot"; 


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
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);


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

  const fetchNotificationCount = async () => {
    try {
      const response = await axiosInstance.get(`/interaction`); // Adjust the endpoint as needed
      console.log('Response:', response);

      if (response.data && response.data.length > 0) {
        const data = response.data;
        const lastEntry = data[data.length - 1];

        // Get the id of the last entry
        const lastId = lastEntry.id;

        console.log('Last Entry ID:', lastId);
        setNotificationCount(parseInt(lastId, 10));

        // Get the last five notifications
        const lastFiveNotifications = data.slice(-5);
        setNotifications(lastFiveNotifications);
      } else {
        console.log('No data available');
        setNotificationCount(0); // Set to 0 if no data is available
      }
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  const handleNotificationClick = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    fetchProfileImageUrl();
    fetchNotificationCount();
  }, []);

  return (
    <div className='topNavbar-head'>
      <CallRoundedIcon style={{ width: '24px', height: '24px' }} className='topNavbar1' />
      <Link to={`/${tenantId}/chatbot`} >
      <InsertCommentRoundedIcon style={{ width: '24px', height: '24px' }} className='topNavbar2' />

        </Link>
      <div className='notification-icon-container' onClick={handleNotificationClick}>
        <NotificationsNoneRoundedIcon style={{ width: '24px', height: '24px', fill: '#323743FF' }} className='topNavbar2' />
        {notificationCount > 0 && (
          <div className='notification-count'>{notificationCount}</div>
        )}
        {showDropdown && (
          <div className='notification-dropdown'>
            {notifications.map((notification, index) => (
              <div key={index} className='notification-item'>
                {notification.notes}
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to={`/${tenantId}/user_id`} className='topNavbar2'>
        {profileImageUrl ? (
          <img src={profileImageUrl} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
        ) : (
          <AccountCircleRoundedIcon style={{ width: '36px', height: '36px', fill: '#D3C1FAFF' }} />
        )}
      </Link>
    </div>
  );
};

export default TopNavbar;