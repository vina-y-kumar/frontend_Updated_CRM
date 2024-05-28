import React from 'react';
import {Link } from "react-router-dom";
import './opportunities-info.css';

const OpportunitiesInfo = () => {
  return (
    <div className="Opportunities-info-page">
      <div className="opportunities-Sidebar">
        <Link to="">Back</Link>
      </div>
      <div className="opportunities-info">
        <h1>Opportunities Info</h1>
      </div>
      <div className="content">
        <div className="info-box">
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="info-pair">
              <label htmlFor="account">Account:</label>
              <input type="text" id="account" name="account" />
            </div>
          </div>
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="stage">Stage:</label>
              <input type="text" id="stage" name="stage" />
            </div>
            <div className="info-pair">
              <label htmlFor="amount">Amount:</label>
              <input type="text" id="amount" name="amount" />
            </div>
          </div>
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="lead-source">Lead Source:</label>
              <input type="text" id="lead-source" name="lead-source" />
            </div>
            <div className="info-pair">
              <label htmlFor="probability">Probability:</label>
              <input type="text" id="probability" name="probability" />
            </div>
          </div>
        </div>
        <div className="info-box-custom">
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="contacts">Contacts:</label>
              <input type="text" id="contacts" name="contacts" />
            </div>
            <div className="info-pair">
              <label htmlFor="closed-by">Closed By:</label>
              <input type="text" id="closed-by" name="closed-by" />
            </div>
          </div>
          <div className="info-row">
            <div className="info-pair textarea-pair">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" rows="4"></textarea>
            </div>
            <div className="info-pair">
              <label htmlFor="closed-on">Closed On:</label>
              <input type="text" id="closed-on" name="closed-on" />
            </div>
          </div>
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="is-active">Is Active:</label>
              <input type="text" id="is-active" name="is-active" />
            </div>
            <div className="info-pair">
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