import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import "./LeadPage.css"

function ConvertLead(props) {
//Declarations
  const { id } = useParams();
  const [leadData, setLeadData] = useState();
  const [showConversionForm, setShowConversionForm] = useState(false);

  const [accountFormData, setAccountFormData] = useState({
      Name: "",
      phone: "",
      email: "",
      createdBy:1
  });

  const [contactFormData, setContactFormData] = useState({
      first_name: "",
      last_name:"",
      phone: "",
      email: "",
      createdBy:1
  });

  const [error, setError] = useState(null);
  const [accountExists, setAccountExists] = useState(false);
  const [contactExists, setContactExists] = useState(false);

//Functions
                    const handleAccountFormSubmit = async (event) => {
                      event.preventDefault();
                      try {
                        await axios.post("https://backendcrmnurenai.azurewebsites.net/accounts/", accountFormData);
                        setAccountExists(true);
                        console.log(response);
                      } catch (error) {
                        setError(error.message);
                      }
                    };

                  const handleContactFormSubmit = async (event) => {
                    event.preventDefault();
                    try {
                      await axios.post("https://backendcrmnurenai.azurewebsites.net/contacts/", contactFormData);
                      setContactExists(true);
                    } catch (error) {
                      setError(error.message);
                    }
                  };

                  useEffect(() => {
                    fetchLeadData();
                  }, []);

                  const fetchLeadData = async () => {
                    try {
                      const response = await axios.get(
                        `https://backendcrmnurenai.azurewebsites.net/leads/${id}`
                      );
                      setLeadData(response.data);
                      setAccountFormData({
                        Name: response.data.name,
                        phone: response.data.phone,
                        email: response.data.email,
                        createdBy:1
                      });
                      setContactFormData({
                        first_name: response.data.name,
                        last_name: "text",
                        phone: response.data.phone,
                        email: response.data.email,
                        createdBy:1
                      });
                    } catch (error) {
                      setError(error.message)
                      console.error("Error fetching contacts:", error);
                    }
                  };

                  console.log(leadData);
  return (
    <div>
      <h1>Convert Lead Page </h1>

      {leadData? (
        <div>
          <h3>Lead Information</h3>
          <p>Name: {leadData.name}</p>
          <p>Email: {leadData.email}</p>
        </div>
      ) : (
        <div>
          <h3>No Lead Found</h3>
        </div>
      )}

      {accountExists && <p>Account already exists for this lead.</p>}
      {contactExists && <p>Contact already exists for this lead.</p>}

      {!accountExists &&!contactExists && (
        <div>
          <h2>Create Account </h2>
          <div>
          <form onSubmit={handleAccountFormSubmit}>
  
  <label htmlFor="Name">Name:</label>
  <input
    type="text"
    id="Name"
    name="Name"
    value={accountFormData.Name}
    onChange={(e) => setAccountFormData({...accountFormData, Name: e.target.value })}
    required
  />
  <br />
  <label htmlFor="account-phone">Phone:</label>
  <input
    type="text"
    id="account-phone"
    name="phone"
    value={accountFormData.phone}
    onChange={(e) => setAccountFormData({...accountFormData, phone: e.target.value })}
    required
  />
  <br />
  <label htmlFor="account-email">Email:</label>
  <input
    type="email"
    id="account-email"
    name="email"
    value={accountFormData.email}
    onChange={(e) => setAccountFormData({...accountFormData, email: e.target.value })}
    required
  />
  <br />
  <button type="submit">Save Account</button>
</form>      
          </div>
         <h2>
         Create Contact
         </h2>
         <div>
         <form onSubmit={handleContactFormSubmit}>
            <label htmlFor="contact-name">Name:</label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={contactFormData.first_name}
              onChange={(e) => setContactFormData({...contactFormData, first_name: e.target.value })}
              required
            />
            <br />
            <label htmlFor="contact-phone">Phone:</label>
            <input
              type="text"
              id="contact-phone"
              name="phone"
              value={contactFormData.phone}
              onChange={(e) => setContactFormData({...contactFormData, phone: e.target.value })}
              required
            />
            <br />
            <label htmlFor="contact-email">Email:</label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={contactFormData.email}
              onChange={(e) => setContactFormData({...contactFormData, email: e.target.value })}
              required
            />
            <br />
            <button type="submit">Save Contact</button>
          </form>
         </div>
          
        </div>
      )}

      {showConversionForm && (
        <div>
          <p>Account and Contact created successfully. Proceed with conversion.</p>
        </div>
      )}
    </div>
  );
}

export default ConvertLead;