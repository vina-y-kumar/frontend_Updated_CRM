import React from 'react';
import {Link } from "react-router-dom";
import './opportunities-info.css';

const OpportunitiesInfo = () => {
    return (
      <div className="Opportunities-info-page">
        <div className="Sidebar">
        <Link to=""> Back</Link>
        </div>
        <div className="opportunities-info">
          <h1>Opportunities Info</h1>
          <div  className="content">
          <div className="info-box">
            <div className="info-item">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
              <label htmlFor="account">Account:</label>
              <input type="text" id="account" name="account" />
            </div>
            <div className="info-item">
              <label htmlFor="stage">Stage:</label>
              <input type="text" id="stage" name="stage" />
              <label htmlFor="amount">Amount:</label>
              <input type="text" id="amount" name="amount" />
            </div>
            <div className="info-item">
              <label htmlFor="lead-source">Lead Source:</label>
              <input type="text" id="lead-source" name="lead-source" />
              <label htmlFor="probability">Probability:</label>
              <input type="text" id="probability" name="probability" />
            </div>
          </div>
          <div className="info-box-custom"> {/* Different class name for the second box */}
            <div className="info-item">
            <label htmlFor="contacts">Contacts:</label>
              <input type="text" id="contacts" name="contacts" />
              <label htmlFor="closed-by">Closed By:</label>
              <input type="text" id="closed-by" name="closed-by" />
            </div>
            <div className="info-item">
            <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" rows="4"></textarea>
              <label htmlFor="closed-on">Closed On:</label>
              <input type="text" id="closed-on" name="closed-on" />
            </div>
            <div className="info-item">
            <label htmlFor="is-active">Is Active:</label>
              <input type="text" id="is-active" name="is-active" />
              <label htmlFor="tenant">Tenant:</label>
              <input type="text" id="tenant" name="tenant" />
              </div>
            </div>
          </div>
        </div>
        </div>
  );
};

export default OpportunitiesInfo;