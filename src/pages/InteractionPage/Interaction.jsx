import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Card, ListGroup } from "react-bootstrap";  
import './InteractionPage.css';
import InteractionDetailsPage from "./InteractionDetailsPage";  
import axiosInstance from "../../api";
const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};
export const InteractionTable = () => {
  const tenantId=getTenantIdFromUrl();
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
      const response = await axiosInstance.get('/interaction/');
      setInteractions(response.data);
      setFilteredInteractions(response.data);
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
        <NavLink to={`/${tenantId}/addinteraction`} className="add-interaction-button">Add Interaction</NavLink>           
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
                    <td><Link to={`/${tenantId}/interaction/${interaction.id}`} onClick={() => handleInteractionClick(interaction)}>{interaction.id}</Link></td>
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
