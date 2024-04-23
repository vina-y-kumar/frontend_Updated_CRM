import React, { useState } from 'react';
import axios from 'axios';
import './Addlead.css';
import Swal from 'sweetalert2';


function Form() {
  const [formData, setFormData] = useState({
    address: '',
    assigned_to: [''], 
    createdBy: '',
    description: '',
    email: '',
    first_name: '',
    last_name: '',
    account_name:'',
    
    phone: '',
    
    title: '',
    website: '',
    
    
    
    
  });
 



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

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    try {
      const response = await axios.post('https://backendcrmnurenai.azurewebsites.net/leads/', formData);
      
      Swal.fire({
        title: "Good job!",
        text: "Lead Created Successfully!",
        icon: "success"
      });
      if(!response){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
      // Reset form data after successful submission if needed
      setFormData({
        title: '',
        first_name: '',
        last_name: '',
        email: '',
        account_name:'',
        phone: '',
        website: '',
        address: '',
        description: '',
        createdBy: '',
        assigned_to: [''],
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Title</label>
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
          <label htmlFor="product">First Name</label>
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
          <label htmlFor="noOfLicenses">Last Name</label>
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
          <label htmlFor="client">E-mail</label>
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
          <label htmlFor="account_name">Organization</label>
          <input
            type="text"
            className="form-control"
            id="account_name"
            name="account_name"
            value={formData.account_name}
            onChange={handleChange}
            placeholder="Enter organization"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="paymentMethod">Phone No.</label>
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
          <label htmlFor="currency">Address</label>
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
          <label htmlFor="budget">Website</label>
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
          <label htmlFor="estRevenue">Status</label>
          <input
            type="text"
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Enter Status"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="estCloseDate">Description</label>
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
          <label htmlFor="pic">Created By</label>
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
          <label htmlFor="assigned_to">Assigned To</label>
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
      </div>
      <button style={{marginLeft:"20%", marginTop:"5%" }} type="submit" className="btn btn-primary">Create Lead</button>
    </form>
  );
}

export default Form;
