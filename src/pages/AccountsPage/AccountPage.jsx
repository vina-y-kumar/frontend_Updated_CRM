import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import Link
import "./page.css";

import axios from "axios";
import RelatedList from "../ContactsTable/RelatedList";



const AccountsPage = () => {
  const companyInfo = {
    name: "Neuren AI",
    logo: "https://plus.unsplash.com/premium_photo-1675793715068-8cd9ce15f430?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9nb3xlbnwwfHwwfHx8MA%3D%",
    website: "https://www.yourcompany.com",
    email: "info@gmail.com",
    owner: "John Doe",
    industry: "Technology",
    employees: 100,
    revenue: "$10 million",
    contactNumber: "+1 123-456-7890",
  };
  const { id } = useParams(); // Get the account ID from the URL parameter
  const [account, setAccount] = useState(null);
  const [attachments, setAttachments] = useState([]);
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(
          `https://backendcrmnurenai.azurewebsites.net/accounts/${id}`
        );
        setAccount(response.data);
        console.log(account[0].Name);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchAccountData();
  }, [id]);

  if (!account) {
    return <div className="loader"></div>; // Show a loading message while fetching data
  }

  const contactPersons = [
    {
      name: "Jane Smith",
      position: "Manager",
      email: "jane@example.com",
      phone: "+1 234-567-8901",
    },
    {
      name: "Mike Johnson",
      position: "Sales Rep",
      email: "mike@example.com",
      phone: "+1 345-678-9012",
    },
    {
      name: "Mike Johnson2",
      position: "Sales Repes",
      email: "mike@example.com",
      phone: "+1 345-678-3456",
    },
    {
      name: "joyes Kofil",
      position: "Sales Repes",
      email: "mike@example.com",
      phone: "+1 345-888-3456",
    },
    // Add more contact persons as needed
  ];
  const accountInfo = {
    accountNumber: "ACC123456789",
    accountType: "Premium",
    startDate: "01/01/2022",
    renewalDate: "01/01/2023",
  };

  const addressInfo = {
    street: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "USA",
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    setAttachments([...attachments, ...files]);
  };

  const handleDeleteAttachment = (index) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };
  const relatedListItems = [
    
    "Attachments",
   "Purchase Orders",
    "Emails",
    "Invoices",
    "Company Overview",
    "Contacts",
    "Account Information",
    "Address Information",
  ];
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const getCircleColor = (letter) => {
    const colors = ['#ff6347', '#32cd32', '#1e90ff', '#ff69b4', '#ffd700']; // Define your color palette
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };
  return (
    <>
      <div className="classs">
        <div className="buttonss">
          <div className="pages1">
            <div className="relatedList-Accounts">
              <Link to="/accounts"> Back</Link>
            </div>

            {/* <RelatedList title="Related List" items={relatedListItems} /> */}
            <div className="sidebar1">
        <ul>
          {relatedListItems.map((item) => (
            <li key={item}>
              <a href={`#${item}`} onClick={() => handleScrollToSection(item)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
          </div>
          <div className="blank-page1">
            {/* Header */}

            <div className="header">
              <h1 className="viewaccounts">View Account</h1>
              {/* <img src={companyInfo.logo} className="logo" alt="Company Logo" /> */}
              
              <span className="account-circle1" style={{ backgroundColor: getCircleColor(account.company.charAt(0)) }}>
                          {account.company.charAt(0).toUpperCase()}
              </span>
                     
              <a
                href={`mailto:${account.email}`}
                className="sendemailInfo"
                style={{ float: "right", color: "white" }}
              >
                Send Email
              </a>

              <div className="header-content">
                <h1 className="header-content1">{account.company}</h1>
              </div>
             <div className="account-descp">
              {account.description}
             </div>

              <a
                className="visitwebsite"
                href={account.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </div>
            <div className="overview" id='Company Overview'>
              <h2 className="accountinfos">Company Overview</h2>
              <div className="account-details">
                <p>
                  <strong className="account-para1">Account Owner:</strong>
                  <div className="account-names"> {account.Name}</div>
                </p>
                <p>
                  <strong className="account-para2">Industry:</strong>
                  <div className="account-industry">{account.industry}</div>
                </p>
                <p>
                  <strong className="account-para3">Description:</strong>
                  <div className="account-desc">{account.description}</div>
                </p>
                <p>
                  <strong className="account-para4">Employees:</strong>
                  <div className="account-employe">{companyInfo.employees}</div>
                </p>
                <p>
                  <strong className="account-para5">Annual Revenue:</strong>
                  <div className="account-revenue">{companyInfo.revenue}</div>
                </p>
                <p>
                  <strong className="account-para6">Contact Number:</strong>
                  <div className="account-phone">{account.phone}</div>
                </p>
              </div>
            </div>

            <div className="contacts" id="Contacts">
              <ul className="list-group">
                <h2 className="contactheading">Contacts</h2>
                {contactPersons.map((contact, index) => (
                  <li key={index} className="list-group-item">
                    <strong>Name:</strong> {contact.name}
                    <br />
                    <strong>Position:</strong> {contact.position}
                    <br />
                    <strong>Email:</strong> {contact.email}
                    <br />
                    <strong>Phone:</strong> {contact.phone}
                  </li>
                ))}
              </ul>
            </div>
            <div className="account-info" id="Account Information">
              <h2 className="accountinfos">Account Information</h2>
              <div className="addresssinformation">
                <p>
                  <strong className="accountinfos1">Account Number:</strong>
                  <div className="account-number">
                    {accountInfo.accountNumber}
                  </div>
                </p>
                <p>
                  <strong className="accountinfos2">Account Type:</strong>
                  <div className="account-type"> {accountInfo.accountType}</div>
                </p>
                <p>
                  <strong className="accountinfos3">Start Date:</strong>
                  <div className="account-startdate">
                    {" "}
                    {accountInfo.startDate}
                  </div>
                </p>
                <p>
                  <strong className="accountinfos4">Renewal Date:</strong>
                  <div className="account-renewaldate">
                    {" "}
                    {accountInfo.renewalDate}
                  </div>
                </p>
              </div>
            </div>
            <div className="address-info" id="Address Information">
              <h2 className="accountinfos">Address Information</h2>
              <div className="addressOverview">
                <p>
                  <strong className="address-placepara1">Street:</strong>
                  <div className="account-street"> {addressInfo.street}</div>
                </p>
                <p>
                  <strong className="address-placepara2">City:</strong>
                  <div className="account-city"> {addressInfo.city}</div>
                </p>
                <p>
                  <strong className="address-placepara3">State:</strong>
                  <div className="account-state"> {addressInfo.state}</div>
                </p>
                <p>
                  <strong className="address-placepara4">ZIP Code:</strong>
                  <div className="account-zip">{addressInfo.zip} </div>
                </p>
                <p>
                  <strong className="address-placepara5">Country:</strong>
                  <div className="account-country">{addressInfo.country}</div>
                </p>
              </div>
            </div>
            {/* <div className="attachment-section">
              <h2 className="attachments">Attachments</h2>
              <input
                className="filebtn"
                type="file"
                onChange={handleFileUpload}
                multiple
              />
              <ul className="">
                {attachments.map((file, index) => (
                  <li key={index} className="files">
                    {file.name}
                    <button
                      className="dltbtn"
                      onClick={() => handleDeleteAttachment(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div> */}
            {/* <div className="attachment-section">
  <h2>Attachments</h2>
  <ul className="attachment-list">
    {attachments.map((file, index) => (
      <li key={index}>
        <span>{file.name}</span>
        <button onClick={() => handleDeleteAttachment(index)}>Delete</button>
      </li>
    ))}
  </ul>
  <input type="file" onChange={handleFileUpload} multiple />
  <button className="upload-button">Upload Files</button>
</div> */}

            <div className="attachment-section" id='Attachments'>
              <div className="attachments">Attachments</div>
              <div class="attachment-upload">
                <input type="file" id="attachment-input" />
                <label for="attachment-input">
                  <div className="clicktoupload">clicktoupload</div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountsPage;
