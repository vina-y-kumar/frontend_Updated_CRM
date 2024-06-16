import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from "../../api.jsx";
import './opportunities-info.css';

const OpportunitiesInfo = () => {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    fetchOpportunity();
  }, [id]);

  const fetchOpportunity = async () => {
    try {
      const response = await axiosInstance.get(`/opportunities/${id}/`);
      setOpportunity(response.data);
      console.log('Opportunity details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching opportunity details:', error);
    }
  };

  if (!opportunity) {
    return <div>Loading...</div>;
  }

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
              <input type="text" id="name" name="name" value={opportunity.name} readOnly />
            </div>
            <div className="info-pair">
              <label htmlFor="account">Account:</label>
              <input type="text" id="account" name="account" value={opportunity.account} readOnly />
            </div>
          </div>
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="stage">Stage:</label>
              <input type="text" id="stage" name="stage" value={opportunity.stage} readOnly />
            </div>
            <div className="info-pair">
              <label htmlFor="amount">Amount:</label>
              <input type="text" id="amount" name="amount" value={opportunity.amount} readOnly />
            </div>
          </div>
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="lead-source">Lead Source:</label>
              <input type="text" id="lead-source" name="lead-source" value={opportunity.leadSource} readOnly />
            </div>
            <div className="info-pair">
              <label htmlFor="probability">Probability:</label>
              <input type="text" id="probability" name="probability" value={opportunity.probability} readOnly />
            </div>
          </div>
        </div>
        <div className="info-box-custom">
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="contacts">Contacts:</label>
              <input type="text" id="contacts" name="contacts" value={opportunity.contacts} readOnly />
            </div>
            <div className="info-pair">
              <label htmlFor="closed-by">Closed By:</label>
              <input type="text" id="closed-by" name="closed-by" value={opportunity.closedBy} readOnly />
            </div>
          </div>
          <div className="info-row">
            <div className="info-pair textarea-pair">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" rows="4" value={opportunity.description} readOnly></textarea>
            </div>
            <div className="info-pair">
              <label htmlFor="closed-on">Closed On:</label>
              <input type="text" id="closed-on" name="closed-on" value={opportunity.closedOn} readOnly />
            </div>
          </div>
          <div className="info-row">
            <div className="info-pair">
              <label htmlFor="created-by">Created By:</label>
              <input type="text" id="created-by" name="created-by" value={opportunity.createdBy} readOnly />
            </div>
            <div className="info-pair">
              <label htmlFor="created-on">Created On:</label>
              <input type="text" id="created-on" name="created-on" value={opportunity.createdOn} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesInfo;
