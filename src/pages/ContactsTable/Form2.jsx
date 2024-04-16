import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import CreateNewAccountForm from "./CreateNewAccountForm";
import Select from "react-select"; 

import "./contactsTable.css";

function Form2() {
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

  useEffect(() => {
    fetchAccountOptions();
  }, []);

  const fetchAccountOptions = async () => {
    try {
      const response = await axios.get(
        "https://backendcrmnurenai.azurewebsites.net/accounts/"
      );
      setAccountOptions(response.data);
      setFilteredOptions(response.data);
    } catch (error) {
      console.error("Error fetching account options:", error);
    }
  };
  const [showCreateNewAccountForm, setShowCreateNewAccountForm] =
    useState(false);

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
      const response = await axios.post(
        "https://backendcrmnurenai.azurewebsites.net/contacts/",
        contactData
      );
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

 


  return (
    <div>
      {showCreateNewAccountForm && <CreateNewAccountForm />}

      <Header name="Contact Information" />
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="ContactOwner">Contact Owner</label>
            <input
              type="text"
              className="form-control"
              id="ContactOwner"
              name="ContactOwner"
              value={contactData.ContactOwner}
              onChange={handleChange}
              placeholder="Enter contact Owner"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              value={contactData.first_name}
              onChange={handleChange}
              placeholder="Enter First Name"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              value={contactData.last_name}
              onChange={handleChange}
              placeholder="Enter last Name"
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="account">Account</label>
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
                  backgroundColor: state.data && state.data.value === "create-new-account" ? "lightblue" : "white",
                  color: state.data && state.data.value === "create-new-account" ? "black" : "black",
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
          <div className="form-group col-md-6">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={contactData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="OtherPhone">Other Phone</label>
            <input
              type="text"
              className="form-control"
              id="OtherPhone"
              name="OtherPhone"
              value={contactData.OtherPhone}
              onChange={handleChange}
              placeholder="Enter Other Phone"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Mobile">Mobile</label>
            <input
              type="text"
              className="form-control"
              id="Mobile"
              name="Mobile"
              value={contactData.Mobile}
              onChange={handleChange}
              placeholder="Enter Mobile "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={contactData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="description">description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={contactData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Assistant">Assistant</label>
            <input
              type="text"
              className="form-control"
              id="Assistant"
              name="Assistant"
              value={contactData.Assistant}
              onChange={handleChange}
              placeholder="Enter Assistant "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Currency1">Currency 1</label>
            <input
              type="text"
              className="form-control"
              id="Currency1"
              name="Currency1"
              value={contactData.Currency1}
              onChange={handleChange}
              placeholder="Enter Currency1 "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Fax"> Fax</label>
            <input
              type="text"
              className="form-control"
              id="Fax"
              name="Fax"
              value={contactData.Fax}
              onChange={handleChange}
              placeholder="Enter Fax "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="DateOfBirth"> Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              id="DateOfBirth"
              name="DateOfBirth"
              value={contactData.DateOfBirth}
              onChange={handleChange}
              placeholder="Enter DateOfBirth "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="AsstPhone"> Asst Phone</label>
            <input
              type="text"
              className="form-control"
              id="AsstPhone"
              name="AsstPhone"
              value={contactData.AsstPhone}
              onChange={handleChange}
              placeholder="Enter AsstPhone "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="SkypeId"> Skype ID</label>
            <input
              type="text"
              className="form-control"
              id="SkypeId"
              name="SkypeId"
              value={contactData.SkypeId}
              onChange={handleChange}
              placeholder="Enter SkypeId "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="SecondaryEmail"> Secondary Email</label>
            <input
              type="text"
              className="form-control"
              id="SecondaryEmail"
              name="SecondaryEmail"
              value={contactData.SecondaryEmail}
              onChange={handleChange}
              placeholder="Enter SecondaryEmail "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Twitter"> Twitter</label>
            <input
              type="text"
              className="form-control"
              id="Twitter"
              name="Twitter"
              value={contactData.Twitter}
              onChange={handleChange}
              placeholder="Enter Twitter "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="createdBy"> Created By</label>
            <input
              type="text"
              className="form-control"
              id="createdBy"
              name="createdBy"
              value={contactData.createdBy}
              onChange={handleChange}
              placeholder="Enter Created By "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="ReportingTo"> Reporting To</label>
            <input
              type="text"
              className="form-control"
              id="ReportingTo"
              name="ReportingTo"
              value={contactData.ReportingTo}
              onChange={handleChange}
              placeholder="Enter Reporting To "
            />
          </div>
        </div>

        <h1 className="info" style={{ textAlign: "center" }}>
          Address Information
        </h1>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="MailingStreet">Mailing Street</label>
            <input
              type="text"
              className="form-control"
              id="MailingStreet"
              name="MailingStreet"
              value={contactData.MailingStreet}
              onChange={handleChange}
              placeholder="Enter  mailing street"
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="MailingCity"> Mailing City</label>
            <input
              type="text"
              className="form-control"
              id="MailingCity"
              name="MailingCity"
              value={contactData.MailingCity}
              onChange={handleChange}
              placeholder="Enter Mailing City "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="MailingState"> Mailing State</label>
            <input
              type="text"
              className="form-control"
              id="MailingState"
              name="MailingState"
              value={contactData.MailingState}
              onChange={handleChange}
              placeholder="Enter Mailing state "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="MailingZip"> Mailing Zip</label>
            <input
              type="text"
              className="form-control"
              id="MailingZip"
              name="MailingZip"
              value={contactData.MailingZip}
              onChange={handleChange}
              placeholder="Enter Mailing zip "
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="MailingCountry"> Mailing Country</label>
            <input
              type="text"
              className="form-control"
              id="MailingCountry"
              name="MailingCountry"
              value={contactData.MailingCountry}
              onChange={handleChange}
              placeholder="Enter Mailing country "
            />
          </div>
        </div>

        <div className="submit">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form2;