import React, { useState } from "react";
import axiosInstance from "../../api";
import "./AddInteractionForm.css";
const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};
const AddInteractionForm = () => {
  const tenantId=getTenantIdFromUrl();
  const [formData, setFormData] = useState({
    id: "",
    entity_id: "",
    interaction_type: "",
    interaction_datetime: "",
    notes: "",
    entity_type: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const entityTypes = [
    'Account',
    'calls',
    'Lead',
    'meetings',
    'Opportunity',
    'Contact',
    'Tasks',
    'Reminder',
    'Campaign'
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    const dataToSend = {
      ...formData,
      
      tenant_id: tenantId,
    };
    event.preventDefault();
    try {
      setLoading(true);
      // Send a POST request to the backend API with the form data
      const response = await axiosInstance.post("/interaction/", dataToSend);

      if (response.status === 200 || response.status === 201) {
        // Navigate to the interaction page after successful form submission
        window.location.href = `/${tenantId}/interaction`; // Replace "/interaction" with the actual URL of the interaction page
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add Interaction Form</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-field">
          <label htmlFor="entity_type" className="labelforinteraction">
            Entity Type:
          </label>
          <select
            id="entity_type"
            name="entity_type"
            value={formData.entity_type}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select Entity Type</option>
            {entityTypes.map((entityType) => (
              <option key={entityType} value={entityType}>
                {entityType}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="entity_id" className="labelforinteraction">
            Entity ID:
          </label>
          <input
            type="text"
            id="entity_id"
            name="entity_id"
            value={formData.entity_id}
            onChange={handleChange}
            className="input-field"
          />
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
          <label htmlFor="interaction_datetime" className="labelforinteraction">
            Interaction Datetime:
          </label>
          <input
            type="datetime-local"
            id="interaction_datetime"
            name="interaction_datetime"
            value={formData.interaction_datetime}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-field">
          <label htmlFor="notes" className="labelforinteraction">
            Notes:
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="textarea-field"
          />
        </div>
       
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <div className="error-message">Error: {error}</div>}
      </form>
    </div>
  );
};

export default AddInteractionForm;
