import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Addlead.css';
import Swal from 'sweetalert2';
import axiosInstance from '../../api';
import { useAuth } from '../../authContext';

const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

function Form() {
  const tenantId = getTenantIdFromUrl();
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    address: '',
    assigned_to: [''],
    createdBy: '',
    description: '',
    email: '',
    first_name: '',
    last_name: '',
    account_name: '',
    phone: '',
    title: '',
    website: '',
    status: '', // Adding status to the formData state
  });
  const [accountOptions, setAccountOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'assigned_to') {
      // Split the input value by commas to create an array of assigned_to values
      const assignedToArray = value.split(',').map((item) => item.trim());
      setFormData({
        ...formData,
        [name]: assignedToArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const fetchAccountOptions = async () => {
    try {
      const response = await axiosInstance.get('/accounts/');
  
        console.log("Account options response:", response.data);
        setAccountOptions(response.data);
        setFilteredOptions(response.data);
        
    } catch (error) {
        console.error("Error fetching account options:", error);
    }
};

useEffect(() => {
  fetchAccountOptions();
}, []);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const dataToSend = {
        ...formData,
        createdBy: userId, // Pass userId as createdBy
        tenant: tenantId,
      };
      const response = await axiosInstance.post(`/leads/`, dataToSend);
      const leadId = response.data.id;

      const interactionData = {
        entity_type: "Lead",
        entity_id: leadId,
        interaction_type: "Note",
        tenant_id: tenantId, // Make sure you have tenant_id in movedCard
        notes: `Lead with id : ${leadId}created by user : ${userId}`,
        interaction_datetime: new Date().toISOString(),
      };

      try {
          await axiosInstance.post('/interaction/', interactionData);
          console.log('Interaction logged successfully');
        } catch (error) {
          console.error('Error logging interaction:', error);
        }
      Swal.fire({
        title: 'Good job!',
        text: 'Lead Created Successfully!',
        icon: 'success',
      });
      if (!response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
      // Reset form data after successful submission if needed
      setFormData({
        address: '',
        assigned_to: [''],
        createdBy: '',
        description: '',
        email: '',
        first_name: '',
        last_name: '',
        account_name: '',
        phone: '',
        title: '',
        website: '',
        status: '', // Reset status field
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='lead_form'>
      <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="title" className='lead_title'>Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="product" className='lead_title'>First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter first name"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="noOfLicenses" className='lead_title'>Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="client" className='lead_title'>E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="account_name" className='lead_title'>Organization</label>
          <select
  className="form-control"
  id="account_name"
  name="account_name"
  value={formData.account}
  onChange={handleChange}
  placeholder="Enter organization"
>
  {filteredOptions.length === 0 ? (
    <option value="">Loading organizations...</option>
  ) : (
    <>
      <option value="">Select Organization</option>
      {filteredOptions.map((option) => (
        <option key={option.id} value={option.value}>
          {option.Name}
        </option>
      ))}
    </>
  )}
</select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="paymentMethod" className='lead_title'>Phone No.</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.paymentMethod}
            onChange={handleChange}
            placeholder="Enter Phone No."
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="currency" className='lead_title'>Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="budget" className='lead_title'>Website</label>
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="status" className='lead_title'>Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="assigned">Assigned</option>
            <option value="in process">In Process</option>
            <option value="converted">Converted</option>
            <option value="recycled">Recycled</option>
            <option value="dead">Dead</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="estRevenue" className='lead_title'>Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder='Enter Description'
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="pic" className='lead_title'>Created By</label>
          <input
            type="text"
            className="form-control"
            id="createdBy"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            placeholder="Enter created by"
          />
        </div>
        
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="assigned_to" className='lead_title'>Assigned To</label>
          <input
  type="text"
  className="form-control"
  id="assigned_to"
  name="assigned_to"
  value={formData.assigned_to}
  onChange={handleChange}
  placeholder="Enter Assigned To"
/>
</div>
<div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="paymentMethod" className='lead_title'>Opportunity Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            name="amount"
            value={formData.opportunityamount}
            onChange={handleChange}
            placeholder="Enter Opportunity Amount"
          />
        </div>
        </div>
      

        
      </div>
      <button  type="submit" className="btn_lead">
        Create Lead
      </button>
    </form>
    </div>
    
  );
}

export default Form;