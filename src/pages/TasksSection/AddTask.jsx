import axios from "axios";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Header } from "../../components/Header";
import CreateNewAccountForm from "../ContactsTable/CreateNewAccountForm.jsx";
import Select from "react-select";
import "./task.css";
import axiosInstance from "../../api.jsx";
import "./TaskTable.jsx";
import { useAuth } from "../../authContext.jsx";
const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};
const AddTaskForm = () => {
  const tenantId=getTenantIdFromUrl();
  const {userId}=useAuth();
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

  const [taskData, setTaskData] = useState({
    subject: "",
    due_date: "",
    status: "",
    priority: "",
    description: "",
    contact: "",
    account: "",
    createdBy: "",
  });

  const [accountOptions, setAccountOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const STATUS_CHOICES = [
    { value: 'not_started', label: 'Not Started' },
    { value: 'deferred', label: 'Deferred' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'waiting_for_input', label: 'Waiting for Input' },
  ];
  const PRIORITY_CHOICES = [
    { value: 'high', label: 'High' },
    { value: 'normal', label: 'Normal' },
    { value: 'low', label: 'Low' },
  ];

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption.value === "create-new-account") {
      handleOpen();
    } else {
      setTaskData({
        ...taskData,
        account: selectedOption.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const dataToSend = {
        ...taskData,
        createdBy: userId, // Pass userId as createdBy
        tenant: tenantId,
      };

      const response = await axiosInstance.post('/tasks/', dataToSend);
      console.log("Form submitted successfully:", response.data);
      setTaskData({
        subject: "",
        due_date: "",
        status: "",
        priority: "",
        description: "",
        contact: "",
        account: "",
        createdBy: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Header name="Task Information" />
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              value={taskData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="due_date">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="due_date"
              name="due_date"
              value={taskData.due_date}
              onChange={handleChange}
              placeholder="Enter due date"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="status">Status</label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >
              {STATUS_CHOICES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="priority">Priority</label>
            <select
              className="form-control"
              id="priority"
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
            >
              {PRIORITY_CHOICES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              className="form-control"
              id="contact"
              name="contact"
              value={taskData.contact}
              onChange={handleChange}
              placeholder="Enter contact"
            />
          </div>
          {/*<div className="form-group col-md-6">
            <label htmlFor="createdBy">Created By</label>
            <input
              type="text"
              className="form-control"
              id="createdBy"
              name="createdBy"
              value={taskData.createdBy}
              onChange={handleChange}
              placeholder="Enter created by"
            />
            </div>*/}
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
                taskData.account
                  ? {
                      value: taskData.account,
                      label: filteredOptions.find((option) => option.id === taskData.account)?.Name || '',
                    }
                  : null
              }
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

export default AddTaskForm;
