import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";

import axiosInstance from "../../api.jsx";

const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

export const CampaignInfo = () => {
  const tenantId = getTenantIdFromUrl();
  const [campaign, setCampaign] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [flowbuilder,setFlowbuilder]=useState({});
  const [postdraft,setPostDraft]=useState({});

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
    <div>
            
        <div className="addcampaign">
           
          <div className="combine">
            <div className="info">
            <h1 style={{fontSize:'40px',marginBottom:'30px'}}>{campaign.campaign_name}</h1>
              <h2>Campaign Details</h2>
              <div className="para1">
                <p className="para">Start Date - {campaign.start_date}</p>
                <p className="para">End Date - {campaign.end_date}</p>
                <p className="para">Expected Revenue - {campaign.expected_revenue}</p>
                <p className="para">Actual Cost - {campaign.actual_cost}</p>
                <p className="para">Type - {campaign.type}</p>
                <p className="para">Status - {campaign.status}</p>
                <p className="para">Budgeted Cost - {campaign.budgeted_cost}</p>
                <p className="para">Expected Response - {campaign.expected_response}</p>
                <p className="para">Description - {campaign.description}</p>
              </div>
            
            </div>
            <div className="info">
                <h1 style={{marginBottom:'20px'}}>Template</h1>
                <table className="flowbuilder_table">
                    <thead>
                        <tr>
                        <th className="flowbuilder_table_step">Name</th>
                        <th className="flowbuilder_table_description">Description</th>
                        <th className="flowbuilder_table_action">Date Created</th>
                        <th className="flowbuilder_table_category">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 
                        {flowbuilderData.map(step => (
                        <tr key={step.id}>
                            <td>{step.step}</td>
                            <td>{step.description}</td>
                            <td>{step.action}</td>
                            <td>{step.target}</td>
                        </tr>
                        ))}
                        */}
                    </tbody>
                </table>
            </div>
            <div className="info">
                <h1 style={{marginBottom:'20px'}}>Publish a post</h1>
                <table className="postdraft_table">
                <thead>
                    <tr>
                    <th className="postdraft_table_title">Draft Title</th>
                 
                    <th className="postdraft_table_author">Author</th>
                    <th className="postdraft_table_date">Date Created</th>
                    <th className="postdraft_table_category">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {/*
                    {postdraftData.map(post => (
                    <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td>{post.author}</td>
                        <td>{post.date}</td>
                        <td>{post.category}</td>
                    </tr>
                    ))}
                    */}
                </tbody>
                </table>
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default CampaignInfo;
