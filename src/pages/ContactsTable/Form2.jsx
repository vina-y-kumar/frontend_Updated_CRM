import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import CreateNewAccountForm from "./CreateNewAccountForm";
import Select from "react-select"; 
import { Link, useParams } from "react-router-dom";
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import axiosInstance from "../../api";
import { useAuth } from "../../authContext";
import "./contactsTable.css";
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; // Adjust the import path

const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

function Form2() {
  const tenantId = getTenantIdFromUrl();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [contacts, setContacts] = useState([]);
  const [contactData, setContactData] = useState({
    ContactOwner: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    OtherPhone: "",
    Mobile: "",
    Assistant: "",
    Currency1: "",
    address: "",
    MailingStreet: "",
    MailingCity: "",
    MailingState: "",
    MailingZip: "",
    MailingCountry: "",
    Fax: "",
    DateOfBirth: "",
    AsstPhone: "",
    SkypeId: "",
    SecondaryEmail: "",
    Twitter: "",
    ReportingTo: "",
    createdBy: "",
    description: "",
    AccountName: "",
    name: "",
    account: "",
  });

  const [accountOptions, setAccountOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const { userId } = useAuth();

  const [photoColor, setPhotoColor] = useState(""); // Declare photoColor state variable

  useEffect(() => {
    fetchAccountOptions();
  }, []);

  useEffect(() => {
    // Generate a random color when the component mounts
    const randomColor = generateRandomColor();
    setPhotoColor(randomColor);
  }, []);

  const fetchAccountOptions = async () => {
    try {
      const response = await axiosInstance.get('/accounts/');
      setAccountOptions(response.data);
      setFilteredOptions(response.data);
    } catch (error) {
      console.error("Error fetching account options:", error);
    }
  };

  const [showCreateNewAccountForm, setShowCreateNewAccountForm] = useState(false);

  const handleChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;
      setContactData({
        ...contactData,
        [name]: value,
      });
      if (name === "name") {
        const filtered = accountOptions.filter((option) =>
          option.Name.toUpperCase().startsWith(value.toUpperCase())
        );
        setFilteredOptions(filtered);
      }
    } else {
      // Handle changes from Select component
      setContactData({
        ...contactData,
        account: event.value,
      });
      if (event.value === "create-new-account") {
        handleOpen();
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const tenantId = getTenantIdFromUrl(); // Get tenant ID from the URL
      const dataToSend = {
        ...contactData,
        createdBy: userId, // Pass userId as createdBy
        tenant: tenantId,
      };
      const response = await axiosInstance.post('/contacts/',dataToSend);
      const contactId = response.data.id;
      const interactionData = {
        entity_type: "Contact",
        entity_id: contactId,
        interaction_type: "Note",
        tenant_id: tenantId, // Make sure you have tenant_id in movedCard
        notes: `Contact created with id : ${contactId} created by user : ${userId}`,
        interaction_datetime: new Date().toISOString(),
      };

      try {
          await axiosInstance.post('/interaction/', interactionData);
          console.log('Interaction logged successfully');
        } catch (error) {
          console.error('Error logging interaction:', error);
        }
      console.log("Form submitted successfully:", response.data);
      setContactData({
        ContactOwner: "",
        first_name: "",
        last_name: "",
        AccountName: "",
        email: "",
        phone: "",
        OtherPhone: "",
        Mobile: "",
        address: "",
        Assistant: "",
        Currency1: "",
        MailingStreet: "",
        MailingCity: "",
        MailingState: "",
        MailingZip: "",
        MailingCountry: "",
        Fax: "",
        DateOfBirth: "",
        AsstPhone: "",
        SkypeId: "",
        SecondaryEmail: "",
        Twitter: "",
        ReportingTo: "",
        createdBy: "",
        description: "",
        account: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
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

  const generateSmiley4 = (color) => (
    <div className="colored-circle4" style={{ backgroundColor: color, color: "white" }}>
      <SentimentSatisfiedRoundedIcon style={{ fontSize: "50px" }} />
    </div>
  );

  const handleCancel = () => {
    const isConfirmed = window.confirm("Are you sure you want to cancel? Any unsaved data will be lost.");
    if (isConfirmed) {
      console.log("Cancel button clicked");
      window.location.href = `../${tenantId}/contacts`;
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
     <div className="contact_nav">
    <TopNavbar/>
  </div>
    <div className="contactfill_forms">
      {showCreateNewAccountForm && <CreateNewAccountForm />}
      <div className="back_container111">
        <div className="relatedList-Contacts3">
          <Link to={`../${tenantId}/contacts`}> Back</Link>
        </div>
      </div>
      <div>
        <Header name="Create Contact" />
        <div className='btnsss1'>
          <button type="button" onClick={handleCancel} className="btn-submit5">Cancel</button>
          <button type="save" onClick={handleSaveAsDraft} className="btn-submit4">Save as Draft</button>
          <button type="submit" onClick={handleSubmitForm} className="btn-submit6">Submit</button>
        </div>
        <div className="photo">
          {generateSmiley4(photoColor)}
        </div>
        <FileUploadRoundedIcon className="upload_icon1_contact" />
        <button className="upload_button1-image">Upload Image</button>
        <h1 className="cont_infoo">Contact Information</h1>
        <form onSubmit={handleSubmit}>
        <div className="contact_form_fill">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="ContactOwner" className="contact_owner_form">Contact Owner:</label>
            <input
              type="text"
              className="form-control_contact-owner"
              id="ContactOwner"
              name="ContactOwner"
              value={contactData.ContactOwner}
              onChange={handleChange}
              placeholder="Enter contact Owner"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="first_name" className="contact_first_name">First Name:</label>
            <input
              type="text"
              className="form-control_first_name"
              id="first_name"
              name="first_name"
              value={contactData.first_name}
              onChange={handleChange}
              placeholder="Enter First Name"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="last_name" className="contact_last_name">Last Name:</label>
            <input
              type="text"
              className="form-control_last_name"
              id="last_name"
              name="last_name"
              value={contactData.last_name}
              onChange={handleChange}
              placeholder="Enter last Name"
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="email" className="contact_email">Email:</label>
            <input
              type="text"
              className="form-control-email"
              id="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group col-md-6">
  <label htmlFor="account" className="contact_account" style={{ backgroundColor: "#F3F4F6FF" }}>Account:</label>
  <div className="form-control_account3">
    <Select 
      options={[
        ...filteredOptions.map((option) => ({
          value: option.Name,
          label: option.Name,
        })),
        { value: "create-new-account", label: "Create New Account" },
      ]}
      onChange={handleChange}
      styles={{
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#F3F4F6FF" : "white",
          color: "black",
        }),
      }}
    />
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CreateNewAccountForm />
      </Box>
    </Modal>
  </div>
</div>


          <div className="form-group col-md-6">
            <label htmlFor="phone" className="contact_phone">Phone:</label>
            <input
              type="text"
              className="form-control_contact-owner"
              id="phone"
              name="phone"
              value={contactData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
          </div>
          
          <div className="form-group col-md-6">
            <label htmlFor="Mobile" className="other_mobile">Mobile:</label>
            <input
              type="text"
              className="form-control_mobil"
              id="Mobile"
              name="Mobile"
              value={contactData.Mobile}
              onChange={handleChange}
              placeholder="Enter Mobile "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="address" className="other_addres">Address:</label>
            <input
              type="text"
              className="form-control-other-address"
              id="address"
              name="address"
              value={contactData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="description" className="other_description">description:</label>
            <input
              type="text"
              className="form-control-description1"
              id="description"
              name="description"
              value={contactData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Assistant" className="other_assistant">Assistant:</label>
            <input
              type="text"
              className="form-control-assistantt"
              id="Assistant"
              name="Assistant"
              value={contactData.Assistant}
              onChange={handleChange}
              placeholder="Enter Assistant "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Currency1" className="other_currency">Currency:</label>
            <input
              type="text"
              className="form-control-currency2"
              id="Currency1"
              name="Currency1"
              value={contactData.Currency1}
              onChange={handleChange}
              placeholder="Enter Currency1 "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Fax" className="other_fax"> Fax:</label>
            <input
              type="text"
              className="form-control_faxx"
              id="Fax"
              name="Fax"
              value={contactData.Fax}
              onChange={handleChange}
              placeholder="Enter Fax "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="DateOfBirth" className="other_DOB"> Date Of Birth:</label>
            <input
              type="date"
              className="form-control-DOBB"
              id="DateOfBirth"
              name="DateOfBirth"
              value={contactData.DateOfBirth}
              onChange={handleChange}
              placeholder="Enter DateOfBirth "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="AsstPhone" className="other_asst"> Asst Phone:</label>
            <input
              type="text"
              className="form-control-Asst-phone"
              id="AsstPhone"
              name="AsstPhone"
              value={contactData.AsstPhone}
              onChange={handleChange}
              placeholder="Enter AsstPhone "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="SkypeId" className="other_skype"> Skype ID:</label>
            <input
              type="text"
              className="form-control-skype-id"
              id="SkypeId"
              name="SkypeId"
              value={contactData.SkypeId}
              onChange={handleChange}
              placeholder="Enter SkypeId "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="SecondaryEmail" className="other_secondaryemail"> Secondary Email:</label>
            <input
              type="text"
              className="form-control-secondary_mail"
              id="SecondaryEmail"
              name="SecondaryEmail"
              value={contactData.SecondaryEmail}
              onChange={handleChange}
              placeholder="Enter SecondaryEmail "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Twitter" className="other_Twitter"> Twitter:</label>
            <input
              type="text"
              className="form-control_twitter"
              id="Twitter"
              name="Twitter"
              value={contactData.Twitter}
              onChange={handleChange}
              placeholder="Enter Twitter "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="createdBy" className="other_createdBy"> Created By:</label>
            <input
              type="text"
              className="form-control-createdBy"
              id="createdBy"
              name="createdBy"
              value={contactData.createdBy}
              onChange={handleChange}
              placeholder="Enter Created By "
            />
          </div>
         
        </div>
        </div>
        

        <h1 className="info_address_info" style={{ textAlign: "center" }}>
          Address Information
        </h1>
        <div className='contanct_mailing_form'>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="MailingStreet" className='mailing_cont_street'>Mailing Street:</label>
            <input
              type="text"
              className="form-control_street_mail"
              id="MailingStreet"
              name="MailingStreet"
              value={contactData.MailingStreet}
              onChange={handleChange}
              placeholder="Enter  mailing street"
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="MailingCity" className='mailing_cont_city'> Mailing City:</label>
            <input
              type="text"
              className="form-control_city_mail"
              id="MailingCity"
              name="MailingCity"
              value={contactData.MailingCity}
              onChange={handleChange}
              placeholder="Enter Mailing City "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="MailingState" className='mailing-cont-state'> Mailing State:</label>
            <input
              type="text"
              className="form-control_state_mail"
              id="MailingState"
              name="MailingState"
              value={contactData.MailingState}
              onChange={handleChange}
              placeholder="Enter Mailing state "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="MailingZip" className="mailing-cont-zip"> Mailing Zip:</label>
            <input
              type="text"
              className="form-control_zip_mail"
              id="MailingZip"
              name="MailingZip"
              value={contactData.MailingZip}
              onChange={handleChange}
              placeholder="Enter Mailing zip "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="MailingCountry" className="mailing-cont-country"> Mailing Country:</label>
            <input
              type="text"
              className="form-control_country_mail"
              id="MailingCountry"
              name="MailingCountry"
              value={contactData.MailingCountry}
              onChange={handleChange}
              placeholder="Enter Mailing country "
            />
          </div>
        </div>

        </div>
        

        <div className="submit_to_contact">
          <button type="submit" className="btn btn-primary_submit_contact">
            Submit
          </button>
        </div>
      </form>
      </div>
    </div>
   </div>
  );
}

export default Form2;
