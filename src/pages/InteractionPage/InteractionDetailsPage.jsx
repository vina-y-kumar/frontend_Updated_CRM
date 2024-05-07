import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InteractionDetailsPage = () => {
  const { id } = useParams();
  console.log("ID from Params:", id);
  const [interaction, setInteraction] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInteraction = async () => {
    try {
      const response = await fetch("https://backendcrmnurenai.azurewebsites.net/interaction");
      if (!response.ok) {
        console.error("Failed to fetch data");
        return;
      }
      const data = await response.json();
      console.log("Fetched Data:", data);
  
      console.log("ID from Params:", id);
  
      // Find the interaction with the selected ID using reduce
      const selectedInteraction = data.filter(currentInteraction => {
        console.log(currentInteraction);
        return currentInteraction.id === id;
    });
    

      console.log("Selected Interaction:", selectedInteraction);
  
      if (!selectedInteraction) {
        console.error(`Interaction with ID ${id} not found`);
        return;
      }
  
      // Set the selected interaction as the component state
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching interaction:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };
  
  

  fetchInteraction();
  


  return (
    <div>
      <h2>Interaction Details</h2>
      {interaction ? (
        <ul>
          <li>ID: {interaction.id}</li>
          <li>Entity ID: {interaction.entity_id}</li>
          <li>Entity Type: {interaction.entity_type}</li>
          <li>Interaction Type: {interaction.interaction_type}</li>
          <li>Interaction Datetime: {interaction.interaction_datetime}</li>
          <li>Notes: {interaction.notes}</li>
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
  
  
};

export default InteractionDetailsPage;
