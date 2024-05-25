import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InteractionDetailsPage = () => {
  const { id } = useParams();
  console.log("ID from Params:", id);
  const [interaction, setInteraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInteraction = async () => {
      try {
        const response = await axiosInstance.get('/interaction/');
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);

        // Find the interaction with the selected ID
        const selectedInteraction = data.find(currentInteraction => currentInteraction.id === parseInt(id));

        console.log("Selected Interaction:", selectedInteraction);

        if (!selectedInteraction) {
          throw new Error(`Interaction with ID ${id} not found`);
        }

        // Set the selected interaction as the component state
        setInteraction(selectedInteraction);
      } catch (error) {
        console.error("Error fetching interaction:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInteraction();
  }, [id]);

  return (
    <div>
      <h2>Interaction Details</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          <li>ID: {interaction.id}</li>
          <li>Entity ID: {interaction.entity_id}</li>
          <li>Entity Type: {interaction.entity_type}</li>
          <li>Interaction Type: {interaction.interaction_type}</li>
          <li>Interaction Datetime: {interaction.interaction_datetime}</li>
          <li>Notes: {interaction.notes}</li>
        </ul>
      )}
    </div>
  );
};

export default InteractionDetailsPage;