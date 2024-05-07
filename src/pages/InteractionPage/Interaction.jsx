import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Card, ListGroup } from "react-bootstrap";  
import './InteractionPage.css';
import InteractionDetailsPage from "./InteractionDetailsPage";  


export const InteractionTable = () => {
  const [interactions, setInteractions] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [filteredInteractions, setFilteredInteractions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInteraction, setSelectedInteraction] = useState(null);

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const response = await fetch(
        "https://backendcrmnurenai.azurewebsites.net/interaction/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch interactions");
      }
      const data = await response.json();
      setInteractions(data);
      setFilteredInteractions(data);
    } catch (error) {
      console.error("Error fetching interactions:", error);
    }
  };

  const handleInteractionClick = (interaction) => {
    console.log(interaction);
    setSelectedInteraction(interaction);
  };

  return (
    <div className="interaction-table">
      <div className="home_left_box1">
        <Sidebar />
      </div>
      <div className="contain1">
        <NavLink to="/addinteraction" className="add-interaction-button">Add Interaction</NavLink>           
        {viewMode === "table" && (
          <div className="table1">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Entity ID</th>
                  <th>Entity Type</th>
                  <th>Interaction Type</th>
                  <th>Interaction Datetime</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredInteractions.map((interaction) => (
                  <tr key={interaction.id}>
                    <td><Link to={`/interaction/${interaction.id}`} onClick={() => handleInteractionClick(interaction)}>{interaction.id}</Link></td>
                    <td>{interaction.entity_id}</td>
                    <td>{interaction.entity_type}</td>
                    <td>{interaction.interaction_type}</td>
                    <td>{interaction.interaction_datetime}</td>
                    <td>{interaction.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedInteraction && <InteractionDetailsPage />}
    </div>
  );
};
