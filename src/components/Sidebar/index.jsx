import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Home from '../../assets/hisobot.png';
import Pupils from '../../assets/pupils.png';
import Davomat from '../../assets/davomat.png';
import Group from '../../assets/group.png';
import Messanger from '../../assets/messanger.png';
import task from '../../assets/task.png';
import meet from '../../assets/meet.png';
import call from '../../assets/call.jpg';
import Payment from '../../assets/payment.png';
import Togo from '../../assets/logo1.png';
import Task from '../../assets/task image.jpg';
import './sidebar.css';
import {useAuth} from '../../authContext';
import { Interaction } from 'chart.js';

export const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { authenticated, setAuthenticated } = useAuth();

  const handleLogout = () => {
    setAuthenticated(false);
    window.location.href = '/login'
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <input type="checkbox" name="check" id="check" />
      <label htmlFor="check">
        <i className="bx bx-menu" id="btn"></i>
        <i className="bx bx-x" id="cancel"></i>
      </label>
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
            <p className="sidebar_logo_text">CRM</p>
          </a>
          <hr className="hr" />
          <ul className="sidebar_list">
            <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/home">
                <span style={{ display: 'flex' }}>
                  <img
                    src={Home}
                    alt="icon"
                    style={{color:"black"}}
                    className="sidebar_link_img"
                    width={20}
                    height={10}
                  />
                  <p className="sidebar_link_text">Dashboard</p>
                </span>
              </NavLink>
            </li>
            <li className="sidebar_item">
              <div className="sidebar_link" onClick={toggleDropdown}>
                <span style={{ display: 'flex' }}>
                  <img
                    src={Pupils}
                    alt="icon"
                    className="sidebar_link_img"
                    width={22}
                    height={10}
                  />
                  <p className="sidebar_link_text">Clients</p>
                  <i className={`bx ${dropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                </span>
              </div>
              {dropdownOpen && (
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
              <div className="sidebar_link" onClick={toggleDropdown}>
                <span style={{ display: 'flex' }}>
                  <img
                    src={task}
                    alt="icon"
                    className="sidebar_link_img"
                    width={25}
                    height={10}
                  />
                  <p className="sidebar_link_text">Task Management</p>
                  <i className={`bx ${dropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                </span>
              </div>
              {dropdownOpen && (
                <ul className="dropdown_list">
                  <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/meetings">
                <span style={{ display: 'flex' }}>
                <img
                    src={meet}
                    alt="icon"
                    className="sidebar_link_img"
                    width={25}
                    height={25}
                  />
                  <p className="sidebar_link_text">Meetings </p>
                </span>
              </NavLink>
            </li>
            <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/callpage">
                <span style={{ display: 'flex' }}>
                <img
                    src={call}
                    alt="icon"
                    className="sidebar_link_img"
                    width={25}
                    height={25}
                  />
                  <p className="sidebar_link_text">CallPage </p>
                </span>
              </NavLink>
            </li>
                </ul>
              )}
            </li>
            <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/lead">
                <span style={{ display: 'flex' }}>
                  <img
                    src={Payment}
                    alt="icon"
                    className="sidebar_link_img"
                    width={20}
                    height={10}
                  />
                  <p className="sidebar_link_text">Leads</p>
                </span>
              </NavLink>
            </li>
          
           
            <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/opportunities">
                <span style={{ display: 'flex' }}>
                  <img
                    src={Davomat}
                    alt="icon"
                    className="sidebar_link_img"
                    width={20}
                    height={20}
                  />
                  <p className="sidebar_link_text">Opportunities</p>
                </span>
              </NavLink>
            </li>
            <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/tasks">
                <span style={{ display: 'flex' }}>
                  <img
                    src={Task}
                    alt="icon"
                    className="sidebar_link_img"
                    width={20}
                    height={10}
                  />
                  <p className="sidebar_link_text">Tasks</p>
                </span>
              </NavLink>
            </li>
            <li className="sidebar_item">
              <NavLink className="sidebar_link" to="/interaction">
                <span style={{ display: 'flex' }}>
                  <img
                    src={Interaction}
                    alt="icon"
                    className="sidebar_link_img"
                    width={20}
                    height={10}
                  />
                  <p className="sidebar_link_text">Interaction</p>
                </span>
              </NavLink>
            </li>
            
          </ul>
        </div>
        <div style={{marginLeft:"15px"}} className="logout_btn">
          <button onClick={handleLogout}>Logout</button>
        </div>
        <p style={{ marginLeft: '50px' }} className="sidebar_info_text">
          {/* Nuren AI */}
        </p>
        <div style={{ marginLeft: '50px', marginTop: '50px' }}>
          <img height="100px" width="100px" src={Togo} alt="Logo" />
        </div>
       
      </div>
    </>
  );
};