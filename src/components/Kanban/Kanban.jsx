import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./style.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../api.jsx";

const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

function Kanban({ leadCountsData }) {
  const tenantId = getTenantIdFromUrl();
  const [columns, setColumns] = useState({});
  const [leadStages, setLeadStages] = useState({
    'assigned': { label: 'Assigned', color: '#FF0000' },
    'in process': { label: 'In Process', color: '#00FF00' },
    'converted': { label: 'Converted', color: '#0000FF' },
    'recycled': { label: 'Recycled', color: '#43A5BE' },
    'dead': { label: 'Dead', color: '#5c62d6' }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch leads data
        const response = await axiosInstance.get(`/leads/`);
        const leads = response.data;

        // Calculate the sum of leads for each stage
        const leadCountsResponse = await axiosInstance.get('/leads_sum/');
        const leadCountsData = leadCountsResponse.data;

        const categorizedLeads = {};
        for (const stage in leadStages) {
          categorizedLeads[stage] = [];
        }

        leads.forEach(lead => {
          const stage = lead.status;
          categorizedLeads[stage].push(lead);
        });

        // Map leads to cards for each column
        const columnsData = {};
        for (const stage in leadStages) {
          const label = leadStages[stage].label;
          const count = leadCountsData[stage] || 0;
          const cards = mapLeadsToCards(categorizedLeads[stage]);
          columnsData[stage] = { title: `${label}`, count, cards, bg: leadStages[stage].color };
        }

        // Set the columns state with the mapped cards and lead count
        setColumns(columnsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [leadStages]);

  const mapLeadsToCards = (leads) => {
    return leads.map((lead) => ({
      id: lead.id.toString(),
      name: lead.first_name + " " + lead.last_name,
      email: lead.email,
      address: lead.address,
      website: lead.website,
      status: lead.status,
      first_name: lead.first_name,
      last_name: lead.last_name,
      assigned_to: lead.assigned_to,
      createdBy: lead.createdBy,
      enquery_type: lead.enquery_type
    }));
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    if (startColumn === endColumn) {
      // Logic for moving within the same column
      const newCards = Array.from(startColumn.cards);
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, startColumn.cards[source.index]);
      const newColumn = {
        ...startColumn,
        cards: newCards,
      };
      setColumns({ ...columns, [source.droppableId]: newColumn });
    } else {
      // Logic for moving to a different column
      const startCards = Array.from(startColumn.cards);
      const endCards = Array.from(endColumn.cards);
      const [movedCard] = startCards.splice(source.index, 1);
      endCards.splice(destination.index, 0, {
        ...movedCard,
        status: endColumn.title,
      });

      try {
        const leadData = {
          ...movedCard, // Include existing lead data
          status: mapStatusToBackend(endColumn.title), // Update the status
          first_name: movedCard.first_name,
          last_name: movedCard.last_name,
          email: movedCard.email,
          assigned_to: movedCard.assigned_to,
          createdBy: movedCard.createdBy,
          tenant: tenantId,
        };
        // Make a PUT request to update the lead status in the backend
        await axiosInstance.put(`leads/${movedCard.id}/`, leadData);
      } catch (error) {
        console.error('Error updating lead status:', error);
      }

      const newColumns = {
        ...columns,
        [source.droppableId]: { ...startColumn, cards: startCards },
        [destination.droppableId]: { ...endColumn, cards: endCards },
      };
      setColumns(newColumns);
    }
  };

  const mapStatusToBackend = (frontendStatus) => {
    return Object.keys(leadStages).find(key => leadStages[key].label === frontendStatus) || 'assigned';
  };

  const handleAddStage = () => {
    const newStageKey = prompt("Enter the key for the new stage:");
    const newStageLabel = prompt("Enter the label for the new stage:");
    const newStageColor = prompt("Enter the color for the new stage:");

    if (newStageKey && newStageLabel && newStageColor) {
      setLeadStages(prevStages => ({
        ...prevStages,
        [newStageKey]: { label: newStageLabel, color: newStageColor }
      }));
    }
  };

  const handleRemoveStage = (stageKey) => {
    const updatedStages = { ...leadStages };
    delete updatedStages[stageKey];
    setLeadStages(updatedStages);
  };

  return (
    <>
      <br />
      <div className="Kanban">
        <button onClick={handleAddStage}>Add Stage</button>
        {Object.keys(leadStages).map((stageKey) => (
          <div key={stageKey}>
            {leadStages[stageKey].label} <button onClick={() => handleRemoveStage(stageKey)}>Remove</button>
          </div>
        ))}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban-board">
            {Object.keys(columns).map((columnId) => {
              const column = columns[columnId];
              return (
                <div className="column" key={columnId}>
                  <div
                    className="title htext1"
                    style={{ backgroundColor: column.bg }}
                  >
                    {column.title} ({column.count})
                  </div>
                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="card-list"
                      >
                        {column.cards.map((card, index) => (
                          <Draggable
                            key={card.id}
                            draggableId={card.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="card_"
                              >
                                <div className="license">
                                  {card.amount} licenses
                                  <div className="status">{card.status}</div>
                                </div>
                                <div className="content_">
                                  {columnId === 'new' && (
                                    <NavLink to={`/${tenantId}/ShowLead/${card.id}`}>
                                      <div className="c1">{card.name}</div>
                                    </NavLink>
                                  )}
                                  {columnId !== '0' ? (
                                    <NavLink to={`/${tenantId}/ShowLead/${card.id}`}>
                                      <div className="c1">{card.name}</div>
                                    </NavLink>
                                  ) : (
                                    <NavLink to={`/${tenantId}/lead/${card.id}`}>
                                      <div className="c1">{card.name}</div>
                                    </NavLink>
                                  )}
                                  <div className="c2">
                                    {card.address}
                                  </div>
                                  <div className="c2">
                                    {card.email}
                                  </div>
                                  <div className="c2">{card.website}</div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default Kanban;
