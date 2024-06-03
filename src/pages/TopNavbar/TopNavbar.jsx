import React from 'react'
import './TopNavbar.css';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link } from 'react-router-dom'; // Import Link for routing



const getTenantIdFromUrl = () => {
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1];
    }
    return null;
  };
const TopNavbar = () => {
    const tenantId = getTenantIdFromUrl();
    const modelName = "TopNavbar";




  return (
    <div className='topNavbar-head'>
        <CallRoundedIcon style={{ width:'24px', height:'24px' }}  className='topNavbar1'/>
      <InsertCommentRoundedIcon style={{ width:'24px', height:'24px' }} className='topNavbar2'/>
      <NotificationsNoneRoundedIcon style={{ width:'24px', height:'24px', fill:'#323743FF' }} className='topNavbar2'/>
      <Link to={`/${tenantId}/user_id`}>
        <AccountCircleRoundedIcon style={{ width: '36px', height: '36px', fill: '#D3C1FAFF' }}  className='topNavbar2'/>
      </Link>
    </div>
      
   
  )
}

export default TopNavbar
