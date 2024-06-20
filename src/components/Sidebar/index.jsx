import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import PeopleIcon from '@mui/icons-material/People';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import LayersIcon from '@mui/icons-material/Layers';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CallIcon from '@mui/icons-material/Call';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import './sidebar.css';
import { useAuth } from '../../authContext';
import axiosInstance from '../../api';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

export const Sidebar = () => {
  const { authenticated, setAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const tenantId = getTenantIdFromUrl();

  function getTenantIdFromUrl() {
    const pathArray = pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null; // Return null if tenant ID is not found or not in the expected place
  }

  const [clientsDropdownOpen, setClientsDropdownOpen] = useState(false);
  const [taskDropdownOpen, setTaskDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false); 
  const [socialDropdownOpen, setSocialDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/logout/');
  
      if (response.status === 200) {
        setAuthenticated(false);
        window.location.href = '/login';
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleClientsDropdown = () => {
    setClientsDropdownOpen(!clientsDropdownOpen);
    setTaskDropdownOpen(false);
    setMoreDropdownOpen(false);
    setSocialDropdownOpen(false);
  };

  const toggleTaskDropdown = () => {
    setTaskDropdownOpen(!taskDropdownOpen);
    // Close other dropdowns if open
    setClientsDropdownOpen(false);
    setMoreDropdownOpen(false);
    setSocialDropdownOpen(false);
  };
  const toggleMoreDropdown = () => {
    setMoreDropdownOpen(!moreDropdownOpen);
    // Close other dropdowns if open
    setClientsDropdownOpen(false);
    setTaskDropdownOpen(false);
    setSocialDropdownOpen(false);
  };
  const toggleSocialDropdown = () => {
    setSocialDropdownOpen(!socialDropdownOpen);
    setTaskDropdownOpen(false);
    setMoreDropdownOpen(false);
    setClientsDropdownOpen(false);
  };

  const formatLink = (link) => {
    if (tenantId) {
      return `/${tenantId}${link}`;
    }
    return link;
  };

  return (
    <div className="siadebar">
      <div className="sidebar_inner">
        <a href="/home" className="sidebar_logo">
          <img
            src={Logo}
            alt="logo"
            className="sidebar_img"
            width={48}
            height={48}
          />
          <p className="sidebar_logo_text"> <b>Nuren AI</b> <br /> CRM</p>
        </a>
        <hr className="hr" />
        <ul className="sidebar_list">
          <li className="sidebar_item">
            <NavLink className="sidebar_link" to={formatLink("/home")}>
              <span style={{ display: 'flex', alignItems:'center' }}>
                <ViewWeekIcon style={{fontSize:'2rem'}}/>
                <p className="sidebar_link_text">Dashboard</p>
              </span>
            </NavLink>
          </li>
          <li className="sidebar_item">
            <div className="sidebar_link" onClick={toggleClientsDropdown}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon style={{fontSize:'2rem'}}/>
                <p className="sidebar_link_text">Clients</p>
                <i className={`bx ${clientsDropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`} style={{ fontSize: '1.5rem', marginLeft: 'auto' }}></i>
              </span>
            </div>
            {clientsDropdownOpen && (
              <ul className="dropdown_list">
                <li className="dropdown_item">
                  <NavLink className="sidebar_link" to={formatLink("/contacts")}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <ContactPhoneRoundedIcon style={{fontSize:'2rem'}}/>
                      <p className="sidebar_link_text">Contacts</p>
                    </span>
                  </NavLink>
                </li>
                <li className="dropdown_item">
                  <NavLink className="sidebar_link" to={formatLink("/accounts")}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <GroupAddRoundedIcon style={{fontSize:'2rem'}}/>
                      <p className="sidebar_link_text">Accounts</p>
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li> 
          <li className="sidebar_item">
            <NavLink className="sidebar_link" to={formatLink("/lead")}>
              <span style={{ display: 'flex', alignItems:'center' }}>
                <RocketLaunchIcon style={{fontSize:'2rem'}}/>
                <p className="sidebar_link_text">Leads</p>
              </span>
            </NavLink>
          </li>
           <li className="sidebar_item">
            <NavLink className="sidebar_link" to={formatLink("/opportunities")}>
              <span style={{ display: 'flex', alignItems:'center' }}>
                <EmojiObjectsIcon style={{fontSize:'2rem'}}/>
                <p className="sidebar_link_text">Opportunities</p>
              </span>
            </NavLink>
          </li> 
          <li className="dropdown_item">
                <NavLink className="sidebar_link" to={formatLink("/tasks")}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <AssignmentIcon style={{fontSize:'2rem'}}/>
                    <p className="sidebar_link_text">Tasks</p>
                  </span>
                </NavLink>
              </li>
          
          <li className="sidebar_item">
            <div className="sidebar_link" onClick={toggleTaskDropdown}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <FormatListNumberedIcon style={{fontSize:'2rem'}}/>
                <p className="sidebar_link_text">Task Management</p>
                <i className={`bx ${taskDropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`} style={{ fontSize: '1.5rem', marginLeft: 'auto' }}></i>
              </span>
            </div>
            {taskDropdownOpen && (
              <ul className="dropdown_list">
                <li className="sidebar_item">
                  <NavLink className="sidebar_link" to={formatLink("/meetings")}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <MeetingRoomIcon style={{fontSize:'2rem'}}/>
                      <p className="sidebar_link_text">Meetings</p>
                    </span>
                  </NavLink>
                  </li>
                <li className="sidebar_item">
                  <NavLink className="sidebar_link" to={formatLink("/callpage")}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <CallIcon style={{fontSize:'2rem'}}/>
                      <p className="sidebar_link_text">CallPage</p>
                    </span>
                  </NavLink>
                </li>
                
                
              </ul>
            )}
          </li>
          <li className="sidebar_item">
            <div className="sidebar_link" onClick={toggleSocialDropdown}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <FormatListNumberedIcon style={{fontSize:'2rem'}}/>
                <p className="sidebar_link_text">Social</p>
                <i className={`bx ${socialDropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`} style={{ fontSize: '1.5rem', marginLeft: 'auto' }}></i>
              </span>
            </div>
            {socialDropdownOpen && (
              <ul className="dropdown_list">
                <li className="sidebar_item">
                  <NavLink className="sidebar_link" to={formatLink("/instagrampost")}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <MeetingRoomIcon style={{fontSize:'2rem'}}/>
                      <p className="sidebar_link_text">Instagram</p>
                    </span>
                  </NavLink>
                  </li>
                  <li className="sidebar_item">
                  <NavLink className="sidebar_link" to={formatLink("/chatbot")}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <MeetingRoomIcon style={{fontSize:'2rem'}}/>
                      <p className="sidebar_link_text">Chatbot</p>
                    </span>
                  </NavLink>
                  </li>
                  <li className="sidebar_item">
                  <NavLink className="sidebar_link" to={formatLink("/email")}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <MeetingRoomIcon style={{fontSize:'2rem'}}/>
                      <p className="sidebar_link_text">Email</p>
                    </span>
                  </NavLink>
                  </li>
                <li className="sidebar_item">
                  <NavLink className="sidebar_link" to={formatLink("/linkedinauth")}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <CallIcon style={{fontSize:'2rem'}}/>
                      <p className="sidebar_link_text">LinkedIn</p>
                    </span>
                  </NavLink>
                </li>
                
              </ul>
            )}
          </li>
          <li className="sidebar_item">
            <NavLink className="sidebar_link" to={formatLink("/calendar")}>
              <span style={{ display: 'flex', alignItems:'center' }}>
                <ViewWeekIcon style={{fontSize:'2rem'}}/>
                <p className="sidebar_link_text">Calendar</p>
              </span>
            </NavLink>
          </li>
          
        
          
        
        <li className="sidebar_item">
        <div className="dropdown_container" onClick={toggleMoreDropdown}>
        <button className="sidebar_link">
          <MoreHorizRoundedIcon style={{fontSize:'2rem'}}/>
          <p className="sidebar_link_text">More</p>
          <i className={`bx ${moreDropdownOpen ? 'bx-chevron-left' : 'bx-chevron-right'}`} style={{ fontSize: '1.5rem', marginLeft: 'auto' }}></i>
        </button>
                      
        
          {moreDropdownOpen && (

          <div className="dropdown_menu">
            <ul className="dropdown_list">
              <div className="dropdown_list-data">
              <div>
          
           
              <li className="dropdown_item">
                <NavLink className="sidebar_link" to={formatLink("/vendors")}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <CampaignRoundedIcon style={{fontSize:'2rem'}}/>
                    <p className="sidebar_link_text">Vendors</p>
                  </span>
                </NavLink>
              </li>
              <li className="dropdown_item">
                <NavLink className="sidebar_link" to={formatLink("/product")}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <CampaignRoundedIcon style={{fontSize:'2rem'}}/>
                    <p className="sidebar_link_text">Products</p>
                  </span>
                </NavLink>
              </li>
              <li className="sidebar_item">
            <NavLink className="sidebar_link" to={formatLink("/loyalty")}>
              <span style={{ display: 'flex', alignItems:'center' }}>
                <ViewWeekIcon style={{fontSize:'2rem'}}/>
                <p className="sidebar_link_text">Loyalty Program</p>
              </span>
            </NavLink>
          </li>
          <li className="sidebar_item">
            <NavLink className="sidebar_link" to={formatLink("/report")}>
              <span style={{ display: 'flex', alignItems:'center' }}>
                <ViewWeekIcon style={{fontSize:'2rem'}}/>
                <p className="sidebar_link_text">Reports</p>
              </span>
            </NavLink>
          </li>
             
          </div>
          <div>
         
              <li className="dropdown_item">
                <NavLink className="sidebar_link" to={formatLink("/interaction")}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <LayersIcon style={{fontSize:'2rem'}}/>
                    <p className="sidebar_link_text">Interaction</p>
                  </span>
                </NavLink>
              </li>
              <li className="dropdown_item">
                <NavLink className="sidebar_link" to={formatLink("/campaign")}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <CampaignRoundedIcon style={{fontSize:'2rem'}}/>
                    <p className="sidebar_link_text">Campaigns</p>
                  </span>
                </NavLink>
              </li>
              <li className="sidebar_item">
            <NavLink className="sidebar_link" to={formatLink("/reminder")}>
              <span style={{ display: 'flex', alignItems:'center' }}>
                <RocketLaunchIcon style={{fontSize:'2rem'}}/>
                <p className="sidebar_link_text">Reminder</p>
              </span>
            </NavLink>
          </li>
          <li className="sidebar_item">
            <NavLink className="sidebar_link" to={formatLink("/ticket")}>
              <span style={{ display: 'flex', alignItems:'center' }}>
                <RocketLaunchIcon style={{fontSize:'2rem'}}/>
                <p className="sidebar_link_text">Tickets</p>
              </span>
            </NavLink>
          </li>
       
          </div>
              </div>
         
            </ul>
          </div>
                )}
        </div>
          
        </li>
     
         
        
        </ul>
      </div>
   
        
        <div className="logout_btn">
        <button className="logout_btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

