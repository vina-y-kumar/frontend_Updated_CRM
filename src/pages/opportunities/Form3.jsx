import axios from "axios";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Header } from "../../components/Header";
import CreateNewAccountForm from "../ContactsTable/CreateNewAccountForm.jsx";
import Select from "react-select";
import "./opportunities.css";
import "./index.jsx";
import axiosInstance from "../../api.jsx";
import { useAuth } from "../../authContext.jsx";
const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

const Form3 = () => {
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
    const {userId}=useAuth();
    const tenantId = getTenantIdFromUrl(); // Get tenantId from route params

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [oppourtunityData, setOppourtunityData] = useState({
        name: "",
        account: "",
        amount: "",
        createdBy: "",
        contacts: [''],
        createdOn: "",
        closedBy: "",
        closedOn: "",
        stage: "",
        lead_source: "",
        probability: "",
        description: "",
        isActive: "",
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
    const [filteredOptions, setFilteredOptions] = useState([]);

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

    const handleAccountSearch = (event) => {
        const searchQuery = event.target.value.toUpperCase();
        const filteredOptions = accountOptions.filter((option) =>
            option.Name.toUpperCase().startsWith(searchQuery)
        );
        setFilteredOptions(filteredOptions);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOppourtunityData({ ...oppourtunityData, [name]: value });
    };

    const handleSelectChange = (selectedOption) => {
        if (selectedOption && selectedOption.value === "create-new-account") {
            handleOpen();
        } else {
          setOppourtunityData((prevData) => ({
            ...prevData,
            account: selectedOption.id,  // Store only the account ID
          }));
        }
    };

    const handleOpportunitySubmit = async (event) => {
        event.preventDefault();
        try {
          const dataToSend = {
            ...oppourtunityData,
            createdBy: userId, // Pass userId as createdBy
            tenant: tenantId,
          };
          const response = await axiosInstance.post('/opportunities/',dataToSend);
           
            console.log("Form submitted successfully:", response.data);
            setOppourtunityData({
                name: "",
                account: "",
                amount: "",
                createdBy: "",
                contacts: [''],
                closedBy: "",
                closedOn: "",
                stage: "",
                lead_source: "",
                probability: "",
                description: "",
                isActive: "",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div>
            <Header name="Opportunity Information" />
            <form onSubmit={handleOpportunitySubmit}>
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
                        <label htmlFor="lead_source">Lead Source</label>
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
                        <label htmlFor="createdOn">Created On</label>
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
                        <label htmlFor="closedOn">Closed On</label>
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
                        <label htmlFor="createdBy">Created By</label>
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
                        <label htmlFor="closedBy">Closed By</label>
                        <input
                            type="text"
                            className="form-control"
                            id="closedBy"
                            name="closedBy"
                            value={oppourtunityData.closedBy}
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
                            placeholder="Enter stage"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="description">Description</label>
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

                <div className="form-group col-md-6">
                  <label htmlFor="account">Account</label>
                  <Select
                    options={[
                      ...filteredOptions.map((option) => ({
                        value: option.id,
                        label: option.Name,
                      })),
                      { value: "create-new-account", label: "Create New Account" },
                    ]}
                    onChange={handleSelectChange}
                    value={
                      oppourtunityData.account &&
                      oppourtunityData.account.value &&
                      oppourtunityData.account.label
                        ? {
                            value: oppourtunityData.account.id,
                            label: oppourtunityData.account.label,
                          }
                        : null
                    }
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor:
                          state.data &&
                          state.data.value === "create-new-account"
                            ? "lightblue"
                            : "white",
                        color:
                          state.data &&
                          state.data.value === "create-new-account"
                            ? "black"
                            : "black",
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

              <div className="submit">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        );
      };

export default Form3;

