import React, { useState } from 'react';
import { Sidebar } from "../../components/Sidebar";
import axios from 'axios';

import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axiosInstance from "../../api";
import { useAuth } from "../../authContext";
const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};
const Campaignform = () => {
  const tenantId = getTenantIdFromUrl();
  const {userId}=useAuth();
  const [campaignData, setCampaignData] = useState({
    
    campaign_name: "",
    start_date: "",
    end_date: "",
    expected_revenue: "",
    actual_cost: "",
    numbers_sent:"" ,
    type: "",
    status: "",
    budgeted_cost: "",
    expected_response: "",
    description: "",
    campaign_owner: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCampaignData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/campaign/', campaignData);
      const campaignId = response.data.id;
          const interactionData = {
            entity_type: "campaign",
            entity_id: campaignId,
            interaction_type: "Event",
            tenant_id: tenantId, // Make sure you have tenant_id in movedCard
            notes: `Campaign created with id : ${campaignId} created by user : ${userId}`,
            interaction_datetime: new Date().toISOString(),
          };

          try {
              await axiosInstance.post('/interaction/', interactionData);
              console.log('Interaction logged successfully');
            } catch (error) {
              console.error('Error logging interaction:', error);
            }
      console.log('Form submitted successfully:', response.data);
      setCampaignData({
        
        campaign_name: "",
        start_date: "",
        end_date: "",
        expected_revenue: "",
        actual_cost: "",
        numbers_sent:"" ,
        type: "",
        status: "",
        budgeted_cost: "",
        expected_response: "",
        description: "",
        campaign_owner: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleSocialButtonClick = (type) => {
    setCampaignData(prevState => ({
      ...prevState,
      type: type,
    }));
    if (type === 'Instagram') {
      window.location.href = "/instagramflow";
    }
    else if (type === 'WhatsApp'){
      window.location.href = "/whatsappflow"
    }
  };

  const handleCancel = () => {
    
    const isConfirmed = window.confirm("Are you sure you want to cancel? Any unsaved data will be lost.");
    
  
    if (isConfirmed) {
      console.log("Cancel button clicked");
     
      window.location.href = `../${tenantId}/campaign`;
    }
  };
  
  
  const handleSaveAsDraft = () => {
    // Implement save as draft logic here
    console.log("Save as Draft button clicked");
  
  };
  const handleSubmitForm = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Call your submit logic here
    handleSubmit(event);
  };
  return (
    <div>
      <div className='campaign_form_head'>
       <div className="home_left_box1">
        <Sidebar />
      </div>
      <div>
        <h1 className="campaign_form_heading"> Create Campaigns</h1>
      </div>

    </div>
    <div className='btnsss10'>
   <button type="cancel"  onClick={handleCancel} className="btn-submit50">Cancel</button>

   <button type="save"  onClick={handleSaveAsDraft} className="btn-submit40">Save as Draft</button>


   <button type="submit"  onClick={handleSubmitForm} className="btn-submit60" >Submit</button>

   </div>
   <div className='capaign_form_container'>
   <form onSubmit={handleSubmit}>
      <div className='campaign_forms'>
      <div className="form-row">
        <h1 className='create_campaign'>
          Create a campaign
        </h1>
        <div className='roundicon1'>
        <CreateRoundedIcon />

        </div>

  <div>
  <div className="form-group col-md-6 ">
          <label htmlFor="text" className='campaign_name'>Campaign Name :</label>
          <input
            type="text"
            className="form-campaign_name"
            id="name"
            name="campaign_name"
            value={campaignData.campaign_name}
            onChange={handleChange}
            placeholder="Enter Campaign Name"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="text" className='campaign_owner'>Campaign Owner :</label>
          <input
            type="text"
            className="form-campaign_owner"
            id="owner"
            name="campaign_owner"
            value={campaignData.campaign_owner}
            onChange={handleChange}
            placeholder="Enter campaign Owner"
          />
        </div>
        <div className="form-group col-md-6">
                  <label htmlFor="date" className='campaign_start_date'>Starting Date :</label>
                  <input
                    type="date"
                    className="form-campaign_start_date"
                    id="date"
                    name="start_date" // Corrected name
                    value={campaignData.start_date}
                    onChange={handleChange}
                    placeholder="Enter start date"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="Date" className='campaign_end_date'>End Date :</label>
                  <input
                    type="date"
                    className="form-campaign_end_date"
                    id="Date"
                    name="end_date" // Corrected name
                    value={campaignData.end_date}
                    onChange={handleChange}
                    placeholder="Enter end date"
                  />
                </div>

        <div className="form-group col-md-6">
                  <label htmlFor="expected_revenue" className='campaign_expected_revenue'>Expected Revenue :</label>
                  <input
                    type="text"
                    className="form-campaign_expected_revenue"
                    id="expected_revenue"
                    name="expected_revenue"
                    value={campaignData.expected_revenue}
                    onChange={handleChange}
                    placeholder="Enter expected revenue"
                  />
                </div>

         <div className="form-group col-md-6">
                  <label htmlFor="message" className='campaign_message'>Message :</label>
                  <input
                    type="text"
                    className="form-campaign_message"
                    id="message"
                    name="message"
                    value={campaignData.message}
                    onChange={handleChange}
                    placeholder="Enter message"
                  />
                </div>
        <div>
       
        <h1 className='audience_campaign'>Audience</h1>
        <div className='roundicon'>
        <CreateRoundedIcon />

        </div>
        <div className="form-group col-md-6">
                  <label htmlFor="expected_count" className='campaign_expected_count'>Expected Count :</label>
                  <input
                    type="text"
                    className="form-campaign_expected_count"
                    id="expected_count"
                    name="expected_count"
                    value={campaignData.expected_count}
                    onChange={handleChange}
                    placeholder="Enter expected count"
                  />
                </div>
       
        
<h1 className='campaign_type'>Type :</h1>
<div className='capaign_form_section'>
          <button className={`campanign_btn_form ${campaignData.type === 'Facebook' ? 'active' : ''}`} onClick={() => handleSocialButtonClick('Facebook')}>
            <FacebookIcon />
          </button>
          <button className={`campaign_btn_form2 ${campaignData.type === 'Instagram' ? 'active' : ''}`} onClick={() => handleSocialButtonClick('Instagram')}>
            <InstagramIcon />
          </button>
          <button className={`campaign_btn_form3 ${campaignData.type === 'WhatsApp' ? 'active' : ''}`} onClick={() => handleSocialButtonClick('WhatsApp')}>
            <WhatsAppIcon />
          </button>
          <button className={`campaign_btn_form4 ${campaignData.type === 'Email' ? 'active' : ''}`} onClick={() => handleSocialButtonClick('Email')}>
            <EmailIcon />
          </button>
          <button className={`campaign_btn_form5 ${campaignData.type === 'Message' ? 'active' : ''}`} onClick={() => handleSocialButtonClick('Message')}>
            <ChatBubbleOutlineIcon />
          </button>
        </div>
        <div className="form-group col-md-6">
                  <label htmlFor="expected_response" className='campaign_expected_response'>Expected Response :</label>
                  <input
                    type="text"
                    className="form-campaign_expected_response"
                    id="expected_response"
                    name="expected_response"
                    value={campaignData.expected_response}
                    onChange={handleChange}
                    placeholder="Enter expected response"
                  />
                </div>

       
       

        </div>

  </div>
     
</div>



      </div>
   

     

        
        



  
        
 </form> 
   </div>
    </div>
    
  )
}

export default Campaignform
