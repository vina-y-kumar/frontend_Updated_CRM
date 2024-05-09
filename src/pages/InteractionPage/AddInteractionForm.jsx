import React, { useState } from "react";
import "./AddInteractionForm.css"; 


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
      const response = await fetch("https://backendcrmnurenai.azurewebsites.net/interaction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
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
          <label htmlFor="id" className="label">ID:</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} className="input-field" />
        </div>
        <div className="form-field">
          <label htmlFor="entity_id" className="label">Entity ID:</label>
          <input type="text" id="entity_id" name="entity_id" value={formData.entity_id} onChange={handleChange} className="input-field" />
        </div>
        <div className="form-field">
          <label htmlFor="interaction_type" className="label">Interaction Type:</label>
          <input type="text" id="interaction_type" name="interaction_type" value={formData.interaction_type} onChange={handleChange} className="input-field" />
        </div>
        <div className="form-field">
          <label htmlFor="interaction_datetime" className="label">Interaction Datetime:</label>
          <input type="datetime-local" id="interaction_datetime" name="interaction_datetime" value={formData.interaction_datetime} onChange={handleChange} className="input-field" />
        </div>
        <div className="form-field">
          <label htmlFor="notes" className="label">Notes:</label>
          <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="textarea-field" />
        </div>
        <div className="form-field">
          <label htmlFor="entity_type" className="label">Entity Type:</label>
          <input type="text" id="entity_type" name="entity_type" value={formData.entity_type} onChange={handleChange} className="input-field" />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddInteractionForm;
