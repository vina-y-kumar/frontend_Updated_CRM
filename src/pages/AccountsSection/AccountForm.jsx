import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./accountsSection.css";
import {Link, useParams } from "react-router-dom";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'; // Importing the icon
import { useAuth } from '../../authContext';
import { Header } from '../../components/Header';
import axiosInstance from '../../api';
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; // Adjust the import path


const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

function AccountForm() {
  const { userId } = useAuth();
  const tenantId=getTenantIdFromUrl();
  const [accountData, setAccountData] = useState({
    Name: '',
    email:'',
    AccountName: '',
    AccountSite: '',
    ParentAccount: '',
    AccountNumber: '',
    AccountType: '',
    Industry: '',
    AnnualRevenue: '',
    BillingStreet: '',
    BillingCity: '',
    BillingState: '',
    BillingCode: '',
    BillingCountry: '',
    Rating: '',
    phone: '',
    Fax: '',
    Website: '',
    TickerSymbol: '',
    Ownership: '',
    Employees: '',
    SicCode: '',
    ShippingStreet:'',
    ShippingCountry:'',
    ShippingState:'',
    ShippingCity:'',
    ShippingCode:'',
    Description:'',
  });

  const [photoColor, setPhotoColor] = useState('');

  useEffect(() => {
    setPhotoColor(generateRandomColor());
  }, []); // Empty dependency array ensures that this effect runs only once, when the component mounts

  const handleChange = (event) => {
    setAccountData({
      ...accountData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const tenantId = getTenantIdFromUrl(); // Get tenant ID from the URL
      const dataToSend = {
        ...accountData,
        createdBy: userId, // Pass userId as createdBy
        tenant: tenantId,
      };
  
      const response = await axiosInstance.post('/accounts/', dataToSend);
      console.log('Form submitted successfully:', response.data);
      setAccountData({
        Name: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateSmiley3 = () => (
    <div className="colored-circle3" style={{ backgroundColor: photoColor, color:"white" }}>
      <span className="material-icons" style={{ fontSize: "50px", fontFamily: "'Material Symbols Outlined'" }}>person</span>
    </div>
  );

  const handleCancel = () => {
    const isConfirmed = window.confirm("Are you sure you want to cancel? Any unsaved data will be lost.");
    
    if (isConfirmed) {
      console.log("Cancel button clicked");
      window.location.href = `../${tenantId}/accounts`;
    }
  };
  
  const handleSaveAsDraft = () => {
    console.log("Save as Draft button clicked");
    // Implement save as draft logic here
  };

  const handleSubmitForm = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    handleSubmit(event);
  };

  return (
    <div>
      <div className="account_nav">
    <TopNavbar/>
  </div>
    <div className="account_form_submit" style={{display:'flex',flexDirection:'row'}}>
       <div className="back_container122">
        <div className="relatedList-Accounts3">
          <Link to={`../${tenantId}/accounts`}> Back</Link>
        </div>
      </div>
     
      <div className='form_account' style={{display:'flex',flexDirection:'column'}}>
        <Header className="create_account" name="Create Account"/>
        <div className='btnnnnn'>
          <div>
            <h1 className='acc_head' >Create Account</h1>
          </div> 
          <div className='btnsss1'>
            <button type="button" onClick={handleCancel} className="btn-submit5">Cancel</button>
            <button type="save" onClick={handleSaveAsDraft} className="btn-submit4">Save as Draft</button>
            <button type="submit" onClick={handleSubmitForm} className="btn-submit6">Submit</button>
          </div>
        </div>
                   
        <div className="photo">
          {generateSmiley3()}
          <div className='pic_btn'>
          <FileUploadRoundedIcon className="upload_icon" />
          <button className="upload_button">Upload Image</button>
          </div>
       
        </div>
        
        <h1 className="create_account3">Account Information</h1>
        <form onSubmit={handleSubmit}>
                            <div className='account_forms'>
                            <div className="form-row">
                        <div>
                        <div className="form-group col-md-6 ">
                                <label htmlFor="Name" className='anual_ownership'>Account Owner:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="Name"
                                  name="Name"
                                  value={accountData.Name}
                                  onChange={handleChange}
                                  placeholder="Enter Account Owner"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor="email" className='anual_email'>Email:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="email"
                                  name="email"
                                  value={accountData.email}
                                  onChange={handleChange}
                                  placeholder="Enter email"
                                />
                              </div>
                      <div className="form-group col-md-6">
                                <label htmlFor="AccountName" className='account_name'>Account Name:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="AccountName"
                                  name="AccountName"
                                  value={accountData.AccountName}
                                  onChange={handleChange}
                                  placeholder="Enter AccountName"
                                />
                              </div>
                      <div className="form-group col-md-6">
                                <label htmlFor="AccountSite" className='account_site'>Account Site:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="AccountSite"
                                  name="AccountSite"
                                  value={accountData.AccountSite}
                                  onChange={handleChange}
                                  placeholder="Enter site name"
                                />
                              </div>
                        <div className="form-group col-md-6">
                                <label htmlFor="ParentAccount" className='parent_account'>Parent Account:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="ParentAccount"
                                  name="ParentAccount"
                                  value={accountData.ParentAccount}
                                  onChange={handleChange}
                                  placeholder="Enter Parent account"
                                />
                              </div>
                      <div className="form-group col-md-6">
                                <label htmlFor="AccountNumber" className='account_number'>Account Number:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="AccountNumber"
                                  name="AccountNumber"
                                  value={accountData.AccountNumber}
                                  onChange={handleChange}
                                  placeholder="Enter account number"
                                />
                              </div>
                      <div className="form-group col-md-6">
                                <label htmlFor="AccountType"className='account_type'>Account Type: </label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="AccountType"
                                  name="AccountType"
                                  value={accountData.AccountType}
                                  onChange={handleChange}
                                  placeholder="Enter account type"
                                />
                                </div>
                      <div className="form-group col-md-6">
                                <label htmlFor="Industry" className='industryy'>Industry:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="Industry"
                                  name="Industry"
                                  value={accountData.Industry}
                                  onChange={handleChange}
                                  placeholder="Enter industry"
                                />
                              </div>
                      <div className="form-group col-md-6">
                                <label htmlFor="AnnualRevenue" className='anual_revenue'>Annual Revenue:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="AnnualRevenue"
                                  name="AnnualRevenue"
                                  value={accountData.AnnualRevenue}
                                  onChange={handleChange}
                                  placeholder="Enter revenue"
                                />
                              </div>
                        </div>
                          
                      </div>

                      <div className="form-row">

                      <div className="form-group col-md-6">
                                <label htmlFor="Rating" className='ratings'>Rating:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="Rating"
                                  name="Rating"
                                  value={accountData.Rating}
                                  onChange={handleChange}
                                  placeholder="Enter rating"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor="Tax" className='anual_phone'>Phone:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="phone"
                                  name="phone"
                                  value={accountData.phone}
                                  onChange={handleChange}
                                  placeholder="Enter Phone"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor="Fax" className='anual_fax'>Fax:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="Fax"
                                  name="Fax"
                                  value={accountData.Fax}
                                  onChange={handleChange}
                                  placeholder="Enter Fax"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor="Website" className='anual_website'>Website:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="Website"
                                  name="Website"
                                  value={accountData.Website}
                                  onChange={handleChange}
                                  placeholder="Enter Website"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor="TickerSymbol" className='anual_ticker'>Ticker Symbol:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="TickerSymbol"
                                  name="TickerSymbol"
                                  value={accountData.TickerSymbol}
                                  onChange={handleChange}
                                  placeholder="Enter Ticker"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor="Ownership" className='anual_owner'>Ownership:</label>
                                <input
                                  type="Ownership"
                                  className="form-control_account1"
                                  id="Ownership"
                                  name="Ownership"
                                  value={accountData.Ownership}
                                  onChange={handleChange}
                                  placeholder="Enter Ownership"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor="Employees" className='anual_employess'>Employees:</label>
                                <input
                                  type="Employees"
                                  className="form-control_account1"
                                  id="Employees"
                                  name="Employees"
                                  value={accountData.Employees}
                                  onChange={handleChange}
                                  placeholder="Enter Employees"
                                />
                              </div>
                    </div>
                          </div>

                            
                            

                          <h1 className='info_address'>Address Information</h1>  

                    <div className='account_forms2'>
                    <div className="form-row">
                      <div>
                      <div className="form-group col-md-6">
                              <label htmlFor="BillingStreet" className='bill_street'>Billing Street: </label>
                              <input
                                type="text"
                                className="form-control_account1"
                                id="BillingStreet"
                                name="BillingStreet"
                                value={accountData.BillingStreet}
                                onChange={handleChange}
                                placeholder="Enter billing street"
                              />
                            </div>
                    <div className="form-group col-md-6">
                              <label htmlFor="BillingCity" className='bill_city'>Billing City: </label>
                              <input
                                type="text"
                                className="form-control_account1"
                                id="BillingCity"
                                name="BillingCity"
                                value={accountData.BillingCity}
                                onChange={handleChange}
                                placeholder="Enter billing city"
                              />
                            </div>
                      <div className="form-group col-md-6">
                              <label htmlFor="BillingState" className='bill_state'> Billing State:</label>
                              <input
                                type="text"
                                className="form-control_account1"
                                id="BillingState"
                                name="BillingState"
                                value={accountData.BillingState}
                                onChange={handleChange}
                                placeholder="Enter billing state"
                              />
                            </div>
                    <div className="form-group col-md-6">
                              <label htmlFor="BillingCode" className='bill_code'> Billing Code:</label>
                              <input
                                type="text"
                                className="form-control_account1"
                                id="BillingCode"
                                name="BillingCode"
                                value={accountData.BillingCode}
                                onChange={handleChange}
                                placeholder="Enter billing code"
                              />
                            </div>
                    <div className="form-group col-md-6">
                              <label htmlFor="BillingCountry" className='bill_country'>Billing Country:</label>
                              <input
                                type="text"
                                className="form-control_account1"
                                id="BillingCountry"
                                name="BillingCountry"
                                value={accountData.BillingCountry}
                                onChange={handleChange}
                                placeholder="Enter Billing country"
                              />
                            </div>
                    </div>

                    <div className="form-row">
                            <div className="form-group col-md-6">
                              <label htmlFor="ShippingStreet" className='ship_street'>Shipping Street:</label>
                              <input
                                type="text"
                                className="form-control_account1"
                                id="ShippingStreet"
                                name="ShippingStreet"
                                value={accountData.ShippingStreet}
                                onChange={handleChange}
                                placeholder="Enter shipping street"
                              />
                            </div>
                    <div className="form-group col-md-6">
                              <label htmlFor="ShippingCity" className='ship_city'>Shipping City:</label>
                              <input
                                type="text"
                                className="form-control_account1"
                                id="ShippingCity"
                                name="ShippingCity"
                                value={accountData.ShippingCity}
                                onChange={handleChange}
                                placeholder="Enter shipping city"
                              />
                            </div>
                    <div className="form-group col-md-6">
                              <label htmlFor="ShippingState" className='ship_state'>Shipping State:</label>
                              <input
                                type="text"
                                className="form-control_account1"
                                id="ShippingState"
                                name="ShippingState"
                                value={accountData.ShippingState}
                                onChange={handleChange}
                                placeholder="Enter shipping state"
                              />
                            </div>
                    <div className="form-group col-md-6">
                              <label htmlFor="ShippingCode" className='ship_code'>Shipping Code:</label>
                              <input
                                type="text"
                                className="form-control_account1"
                                id="ShippingCode"
                                name="ShippingCode"
                                value={accountData.ShippingCode}
                                onChange={handleChange}
                                placeholder="Enter shipping Code"
                              />
                            </div>
                    <div className="form-group col-md-6">
                              <label htmlFor="ShippingCountry" className='ship_country'>Shipping Country:</label>
                              <input
                                type="text"
                                className="form-control_account1"
                                id="ShippingCountry"
                                name="ShippingCountry"
                                value={accountData.ShippingCountry}
                                onChange={handleChange}
                                placeholder="Enter shipping country"
                              />
                            </div>
                    </div>
                    {/* <div className="form-row">
                            <div className="form-group ">
                              <label htmlFor="Description" className='ship_descri'>Description:</label>
                              <input
                                type="text"
                                className="form-control_account1"
                                id="Description"
                                name="Description"
                                value={accountData.Description}
                                onChange={handleChange}
                                placeholder="Enter description"
                              />
                            </div>
                          </div> */}
                          <button type="submit" className="submit_to_contact">Submit</button>


                        </div>  

                      
                    </div>
                      
                            
                </form> 
      </div>
    </div>
    </div>
  );
}

export default AccountForm;
