import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './campaigninfo.css'; // Import the CSS file

import axiosInstance from "../../api.jsx";

const getTenantIdFromUrl = () => {
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1];
  }
  return null;
};

export const CampaignInfo = () => {
  const tenantId = getTenantIdFromUrl();
  const [campaign, setCampaign] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await axiosInstance.get(`/campaign/${id}`);
        setCampaign(response.data);
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      }
    };

    fetchCampaignData();
  }, [id]);

  return (
    <div className="campaign-info-page">
      <div className="campaign-sidebar">
        <Link to="">Back</Link>
      </div>
      <div className="campaign-info">
        <h1>{campaign.campaign_name}</h1>
        <div className="content">
          <div className="info-box">
            <div className="info-row">
              <p><strong>Campaign Name:</strong> {campaign.campaign_name}</p>
              <p><strong>Campaign Owner:</strong> {campaign.campaign_owner}</p>
            </div>
            <div className="info-row">
              <p><strong>Start Date:</strong> {campaign.start_date}</p>
              <p><strong>End Date:</strong> {campaign.end_date}</p>
            </div>
            <div className="info-row">
              <p><strong>Expected Revenue:</strong> {campaign.expected_revenue}</p>
              <p><strong>Actual Cost:</strong> {campaign.actual_cost}</p>
            </div>
          </div>
          <div className="info-box">
            <div className="info-row">
              <p><strong>Numbers Sent:</strong> {campaign.numbers_sent}</p>
              <p><strong>Type:</strong> {campaign.type}</p>
            </div>
            <div className="info-row">
              <p><strong>Status:</strong> {campaign.status}</p>
              <p><strong>Budgeted Cost:</strong> {campaign.budgeted_cost}</p>
            </div>
            <div className="info-row">
              <p><strong>Expected Response:</strong> {campaign.expected_response}</p>
              <p><strong>Tenant:</strong> {campaign.tenant}</p>
            </div>
            <div className="info-row">
              <p><strong>Description:</strong>{campaign.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfo;
