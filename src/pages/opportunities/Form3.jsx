import axios from "axios";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Header } from "../../components/Header";
import CreateNewAccountForm from "../ContactsTable/CreateNewAccountForm.jsx";
import Select from "react-select"; 
import "./opportunities.css";
import "./index.jsx";

const Form3=() =>{
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
   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [oppourtunityData, setOppourtunityData] = useState({
    
    
    name: "",
    account: "",
    amount:"",
    createdBy: "",
    contacts: [''],
    createdOn:"",
    ClosedBy: "",
    closedOn:"",
    stage:"",
    lead_source:"",
    probability :"",
    description :"",
    isActive:"",

  });
  
  const leadSourceOptions = [
    { id: 1, value: "NONE", label: "NONE" },
    { id: 2, value: "CALL", label: "CALL" },
    { id: 3, value: "EMAIL", label: "EMAIL" },
    { id: 4, value: "EXISTING CUSTOMER", label: "EXISTING CUSTOMER" },
    { id: 5, value: "PARTNER", label: "PARTNER" },
    { id: 6, value: "PUBLIC RELATIONS", label: "PUBLIC RELATIONS" },
    { id: 7, value: "CAMPAIGN", label: "CAMPAIGN" },
    { id: 8, value: "WEBSITE", label: "WEBSITE" },
    { id: 9, value: "OTHER", label: "OTHER" },
  ];
  const [accountOptions, setAccountOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(accountOptions);

  const handleAccountSearch = (event) => {
    const searchQuery = event.target.value.toUpperCase();
    const filteredOptions = accountOptions.filter((option) =>
      option.Name.toUpperCase().startsWith(searchQuery)
    );
    setFilteredOptions(filteredOptions);

  };

  useEffect(() => {
    fetchAccountOptions();
  }, []);

  const [showCreateNewAccountForm, setShowCreateNewAccountForm] =
    useState(false);

    const fetchAccountOptions = async () => {
        try {
          const response = await axios.get(
            "https://backendcrmnurenai.azurewebsites.net/accounts/"
          );
          console.log("Account options response:", response.data);
    
          setAccountOptions(response.data);
          setFilteredOptions(response.data);
        } catch (error) {
          console.error("Error fetching account options:", error);
        }
      };
    
      const handleChange = (selectedOption) => {
        if (selectedOption && selectedOption.value === "create-new-account") {
          handleOpen();
        } else {
          setTaskData({ ...taskdata, account: selectedOption });
        }
      };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(
            "https://backendcrmnurenai.azurewebsites.net/opportunities/",
            oppourtunityData
          );
          console.log("Form submitted successfully:", response.data);
          setOppourtunityData({
            name: "",
            account: "",
            amount:"",
            createdBy: "",
            createdOn:"",
            contacts: [''],
            ClosedBy: "",
            closedOn:"",
            stage:"",
            lead_source:"",
            probability :"",
            description :"",
            isActive:"",
          });
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      };
      return (
        <div>
          {showCreateNewAccountForm && <CreateNewAccountForm />}
    
          <Header name="Oppotunity Information" />
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name">Contact Owner</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={oppourtunityData.name}
                  onChange={handleChange}
                  placeholder="Enter contact Owner"
                />
              </div>
             
             
              <div className="form-group col-md-6">
                <label htmlFor="contacts">Contacts</label>
                <input
                  type="text"
                  className="form-control"
                  id="contacts"
                  name="contacts"
                  value={oppourtunityData.contacts}
                  onChange={handleChange}
                  placeholder="Enter contacts"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="contacts">Lead Source</label>
                <select
              id="lead_source"
              name="lead_source"
              value={oppourtunityData.lead_source}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Lead Source</option>
              {leadSourceOptions.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="isActive">Is Active</label>
                <input
                  type="text"
                  className="form-control"
                  id="isActive"
                  name="isActive"
                  value={oppourtunityData.isActive}
                  onChange={handleChange}
                  placeholder="Enter isActive"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="createdOn"> createdOn</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="createdOn"
                  name="createdOn"
                  value={oppourtunityData.createdOn}
                  onChange={handleChange}
                  placeholder="Enter created On"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={oppourtunityData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="probability">Probability</label>
                <input
                  type="text"
                  className="form-control"
                  id="probability"
                  name="probability"
                  value={oppourtunityData.probability}
                  onChange={handleChange}
                  placeholder="Enter probability"
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
                <label htmlFor="closedOn">closed On</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="closedOn"
                  name="closedOn"
                  value={oppourtunityData.closedOn}
                  onChange={handleChange}
                  placeholder="Enter time"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="createdBy">created By </label>
                <input
                  type="text"
                  className="form-control"
                  id="createdBy"
                  name="createdBy"
                  value={oppourtunityData.createdBy}
                  onChange={handleChange}
                  placeholder="Enter createdBy"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="ClosedBy">closed By</label>
                <input
                  type="text"
                  className="form-control"
                  id="ClosedBy"
                  name="ClosedBy"
                  value={oppourtunityData.ClosedBy}
                  onChange={handleChange}
                  placeholder="Enter time"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="stage">Stage</label>
                <input
                  type="text"
                  className="form-control"
                  id="stage"
                  name="stage"
                  value={oppourtunityData.stage}
                  onChange={handleChange}
                  placeholder="Enter stage "
                />
              </div>
             
              <div className="form-group col-md-6">
                <label htmlFor="description">description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={oppourtunityData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
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

export default Form3;