import React, { useState } from "react";
import "./AddInteractionForm.css"; 
import axiosInstance from "../../api";

const AddInteractionForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    entity_id: "",
    interaction_type: "",
    interaction_datetime: "",
    notes: "",
    entity_type: ""
  });

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the backend API with the form data
      const response = await axiosInstance.post("/interaction/", formData);
  
      if (response.status === 200 || response.status === 201) {
        // Navigate to the interaction page after successful form submission
        window.location.href = "/interaction"; // Replace "/interaction" with the actual URL of the interaction page
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add Interaction Form</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-field">
          <label htmlFor="id" className="labelforinteraction">Entity Id:</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} className="input-field" />
        </div>
        <div className="form-field">
          <label htmlFor="entity_id" className="labelforinteraction">Entity Type:</label>
          <input type="text" id="entity_id" name="entity_id" value={formData.entity_id} onChange={handleChange} className="input-field" />
        </div>
        <div className="form-field">
          <label htmlFor="interaction_type" className="labelforinteraction">
            Interaction Type:
          </label>
          <select
            id="interaction_type"
            name="interaction_type"
            value={formData.interaction_type}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select Interaction Type</option>
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
            <option value="Note">Note</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="interaction_datetime" className="labelforinteraction">Interaction Datetime:</label>
          <input type="datetime-local" id="interaction_datetime" name="interaction_datetime" value={formData.interaction_datetime} onChange={handleChange} className="input-field" />
        </div>
        <div className="form-field">
          <label htmlFor="notes" className="labelforinteraction">Notes:</label>
          <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="textarea-field" />
        </div>
        <div className="form-field">
          <label htmlFor="entity_type" className="labelforinteraction">Entity Type:</label>
          <input type="text" id="entity_type" name="entity_type" value={formData.entity_type} onChange={handleChange} className="input-field" />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddInteractionForm;
