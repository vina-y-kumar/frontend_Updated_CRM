import axios from "axios";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Header } from "../../components/Header";
import CreateNewAccountForm from "../ContactsTable/CreateNewAccountForm.jsx";
import Select from "react-select";
import "./task.css";
import axiosInstance from "../../api.jsx";
import "./TaskTable.jsx";
import { useAuth } from "../../authContext.jsx";
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; // Adjust the import path

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

  const handleCancel = () => {
    
    const isConfirmed = window.confirm("Are you sure you want to cancel? Any unsaved data will be lost.");
    
  
    if (isConfirmed) {
      console.log("Cancel button clicked");
     
      window.location.href = `../${tenantId}/tasks`;
    }
  };
  
  
  const handleSaveAsDraft = () => {
    // Implement save as draft logic here
    console.log("Save as Draft button clicked");
  
  };
  const handleSubmitForm = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Call your submit logic here
    handleSubmit(event);
  };
  
  return (
    <div>
      <div className="Add-task-topnav">
        <TopNavbar/>
      </div>
      <div className="task_form">
      <div className="relatedTask_back">
        <Link className='task_back' to={`/${tenantId}/tasks`}>Back</Link>
      </div>
     
      <div>
     
      
        <div className="task_head_line">
          <div className="task_form_header">
            <h1>Create Task</h1>
          </div>
          <div className='btnsss_task'>
            <button type="button" onClick={handleCancel} className="btn-submit_cancel_task">Cancel</button>
            <button type="button"   onClick={handleSaveAsDraft}  className="btn-submit_save_task">Save as Draft</button>
            <button type="submit"  onClick={handleSubmitForm} className="btn-submit_submit_task">Submit</button>
          </div>
        </div>
        <div className="form_task_form">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="subject" className="form_row_head">Subject</label>
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
                <label htmlFor="due_date" className="form_row_head">Due Date</label>
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
                <label htmlFor="status" className="form_row_head">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="not_started">Not Started</option>
                  <option value="deferred">Deferred</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="waiting_for_input">Waiting for Input</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="priority" className="form_row_head">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={taskData.priority}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="createdBy" className="form_row_head">Created By</label>
                <input
                  type="text"
                  className="form-control"
                  id="createdBy"
                  name="createdBy"
                  value={taskData.createdBy}
                  onChange={handleChange}
                  placeholder="Enter created By"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="contact" className="form_row_head">Contact</label>
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
              <div className="form-group col-md-6">
                <label htmlFor="description" className="form_row_head">Description</label>
                <input
                  type="text"
                  className="form-task_description"
                  id="description"
                  name="description"
                  value={taskData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="account" className="form_row_head">Account</label>
                <Select
                  className="form-control_account"
                  options={[
                    ...filteredOptions.map((option) => ({
                      value: option.Name,
                      label: option.Name,
                    })),
                    { value: "create-new-account", label: "Create New Account" },
                  ]}
                  onChange={handleSelectChange}
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
              <button type="submit" className="btn btn-primary__">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddTaskForm;
