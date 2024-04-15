import React, { useState } from 'react';
import axios from 'axios';


function CreateNewAccountForm() {
    const [accountData, setAccountData] = useState({
      Name: '',
      email: '',
      phone:'',
      createdBy: '',
    });
    const handleChange = (event) => {
        setAccountData({
          ...accountData,
          [event.target.name]: event.target.value,
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('https://backendcrmnurenai.azurewebsites.net/accounts/', accountData);
          console.log('Form submitted successfully:', response.data);
          setAccountData({
            Name: '',
            email: '',
            phone:'',
            createdBy: '',
          });
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
    
      return (
        <div>
    <div>

<h2>Create New Account</h2>
<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="Name">Name</label>
    <input
      type="text"
      className="form-control"
      id="Name"
      name="Name"
      value={accountData.Name}
      onChange={handleChange}
      placeholder="Enter Name"
    />
  </div>
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input
      type="text"
      className="form-control"
      id="email"
      name="email"
      value={accountData.email}
      onChange={handleChange}
      placeholder="Enter Email"
    />
  </div>
  <div className="form-group">
    <label htmlFor="phone">Phone</label>
    <input
      type="text"
      className="form-control"
      id="phone"
      name="phone"
      value={accountData.phone}
      onChange={handleChange}
      placeholder="Enter phone"
    />
  </div>
  <div className="form-group">
    <label htmlFor="createdBy">Created By</label>
    <input
      type="text"
      className="form-control"
      id="createdBy"
      name="createdBy"
      value={accountData.createdBy}
      onChange={handleChange}
      placeholder="Enter Created By"
    />
  </div>
  <button type="submit" className="btn btn-primary">
    Create Account
  </button>
  
</form>
</div>
        </div>
       
      );
    }
    
    export default CreateNewAccountForm;  