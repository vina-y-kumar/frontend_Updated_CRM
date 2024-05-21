import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';
// import Home from '../../assets/hisobot.png';
// import Pupils from '../../assets/pupils.png';
// import Davomat from '../../assets/davomat.png';
// import Group from '../../assets/group.png';
// import Messanger from '../../assets/messanger.png';
// import task from '../../assets/task.png';
// import meet from '../../assets/meet.png';
// import call from '../../assets/call.jpg';
// import Payment from '../../assets/payment.png';
// import Togo from '../../assets/logo1.png';
// import Task from '../../assets/task image.jpg';
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
import './sidebar.css';
import {useAuth} from '../../authContext';
// import { Interaction } from 'chart.js';

export const Sidebar = () => {
  const [clientsDropdownOpen, setClientsDropdownOpen] = useState(false);
  const [taskDropdownOpen, setTaskDropdownOpen] = useState(false);
  const { authenticated, setAuthenticated } = useAuth();

  const handleLogout = () => {
    setAuthenticated(false);
    window.location.href = '/login'
  };
  const toggleClientsDropdown = () => {
    setClientsDropdownOpen(!clientsDropdownOpen);
  };

  const toggleTaskDropdown = () => {
    setTaskDropdownOpen(!taskDropdownOpen);
  };

  return (
    <>
      {/* <input type="checkbox" name="check" id="check" /> */}
      {/* <label htmlFor="check">
        <i className="bx bx-menu" id="btn"></i>
        <i className="bx bx-x" id="cancel"></i>
      </label> */}
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
              <NavLink className="sidebar_link" to="/home">
                <span style={{ display: 'flex', alignItems:'center' }}>
                  {/* <img
                    src={Home}
                    alt="icon"
                    style={{color:"black"}}
                    className="sidebar_link_img"
                    width={20}
                    height={10}
                  /> */}
<ViewWeekIcon style={{fontSize:'2rem'}}/>
                  <p className="sidebar_link_text">Dashboard</p>
                </span>
              </NavLink>
            </li>
            <li className="sidebar_item">
          <div className="sidebar_link" onClick={toggleClientsDropdown}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {/* <img
                src={Pupils}
                alt="icon"
                className="sidebar_link_img"
                width={22}
                height={10}
              /> */}
              <PeopleIcon style={{fontSize:'2rem'}}/>
              <p className="sidebar_link_text">Clients</p>
              <i className={`bx ${clientsDropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`} style={{ fontSize: '1.5rem', marginLeft: 'auto' }}></i>
            </span>
          </div>
          {clientsDropdownOpen && (
            <ul className="dropdown_list">
              <li className="dropdown_item">
                <NavLink to="/contacts">Contacts</NavLink>
              </li>
              <li className="dropdown_item">
                <NavLink to="/accounts">Accounts</NavLink>
              </li>
            </ul>
          )}
        </li>
            <li className="sidebar_item">
          <div className="sidebar_link" onClick={toggleTaskDropdown}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {/* <img
                src={task}
                alt="icon"
                className="sidebar_link_img"
                width={25}
                height={10}
              /> */}
              <FormatListNumberedIcon style={{fontSize:'2rem'}}/>
              <p className="sidebar_link_text">Task Management</p>
              <i className={`bx ${taskDropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`} style={{ fontSize: '1.5rem', marginLeft: 'auto' }}></i>
            </span>
          </div>
          {taskDropdownOpen && (
            <ul className="dropdown_list">
              <li className="sidebar_item">
                <NavLink className="sidebar_link" to="/meetings">
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <img
                      src={meet}
                      alt="icon"
                      className="sidebar_link_img"
                      width={25}
                      height={25}
                    /> */}
                    <MeetingRoomIcon style={{fontSize:'2rem'}}/>
                    <p className="sidebar_link_text">Meetings</p>
                  </span>
                </NavLink>
              </li>
              <li className="sidebar_item">
                <NavLink className="sidebar_link" to="/callpage">
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <img
                      src={call}
                      alt="icon"
                      className="sidebar_link_img"
                      width={25}
                      height={25}
                    /> */}
                    <CallIcon style={{fontSize:'2rem'}}/>
                    <p className="sidebar_link_text">CallPage</p>
                  </span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
            <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/lead">
                <span style={{ display: 'flex', alignItems:'center' }}>
                  {/* <img
                    src={Payment}
                    alt="icon"
                    className="sidebar_link_img"
                    width={20}
                    height={10}
                  /> */}
                  <RocketLaunchIcon style={{fontSize:'2rem'}}/>
                  <p className="sidebar_link_text">Leads</p>
                </span>
              </NavLink>
            </li>
          
           
            <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/opportunities">
                <span style={{ display: 'flex', alignItems:'center' }}>
                  {/* <img
                    src={Davomat}
                    alt="icon"
                    className="sidebar_link_img"
                    width={20}
                    height={20}
                  /> */}
                  <EmojiObjectsIcon style={{fontSize:'2rem'}}/>
                  <p className="sidebar_link_text">Opportunities</p>
                </span>
              </NavLink>
            </li>
            <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/tasks">
                <span style={{ display: 'flex', alignItems:'center' }}>
                  {/* <img
                    src={Task}
                    alt="icon"
                    className="sidebar_link_img"
                    width={20}
                    height={10}
                  /> */}
                  <AssignmentIcon style={{fontSize:'2rem'}}/>
                  <p className="sidebar_link_text">Tasks</p>
                </span>
              </NavLink>
            </li>
            <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/interaction">
                <span style={{ display: 'flex', alignItems:'center' }}>
                  {/* <img
                    src={Interaction}
                    alt="icon"
                    className="sidebar_link_img"
                    width={20}
                    height={10}
                  /> */}
                  <LayersIcon style={{fontSize:'2rem'}}/>
                  <p className="sidebar_link_text">Interaction</p>
                </span>
              </NavLink>
            </li>
            <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/campaign">
                <span style={{ display: 'flex', alignItems:'center' }}>
                  {/* <img
                    src={Interaction}
                    alt="icon"
                    className="sidebar_link_img"
                    width={20}
                    height={10}
                  /> */}
                  <CampaignRoundedIcon style={{fontSize:'2rem'}}/>
                  <p className="sidebar_link_text">Campaigns</p>
                </span>
              </NavLink>
            </li>
           
            
          </ul>
        </div>
        <div style={{marginLeft:"15px"}} className="logout_btn">
          <button onClick={handleLogout}>Logout</button>
        </div>
        {/* <p style={{ marginLeft: '50px' }} className="sidebar_info_text">
          Nuren AI
        </p> */}
        {/* <div style={{ marginLeft: '50px', marginTop: '50px' }}>
          <img height="80px" width="80px" src={Togo} alt="Logo" />
        </div> */}
       
      </div>
    </>
  );
};

