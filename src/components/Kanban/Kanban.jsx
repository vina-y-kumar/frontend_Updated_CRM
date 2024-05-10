import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./style.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { sendEmail } from './email.jsx'; // Import the sendEmail function



function Kanban() {

  const [columns, setColumns] = useState({
    new: {
      title: "New",
      cards: [],
      bg: "#15ABFFFF"
    },
    proposals: {
      title: "Proposals",
      cards: [],

    },
    negotiations: {
      title: "Negotiations",
      cards: [],

    },
    contractsSent: {
      title: "Contracts Sent",
      cards: [],
      bg: "#FFD317FF"
    },
  });

  const [leads, setLeads] = useState([]);
  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await axios.get('https://backendcrmnurenai.azurewebsites.net/leads');
        setLeads(response.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    }
    fetchLeads();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backendcrmnurenai.azurewebsites.net/leads/"
        );
        const leads = response.data;

        const newCards = leads.map((lead) => ({
          id: lead.id.toString(),
          name: lead.first_name + " " + lead.last_name,
          email: lead.email,
          address: lead.address,
          website: lead.website,
          status: "New",
        }));
        setColumns({
          new: { title: "New", cards: newCards },
          proposals: { title: "Proposals", bg: "#15ABFFFF", cards: [] },
          negotiations: { title: "Negotiations", bg: "#FF56A5FF", cards: [] },
          contractsSent: { title: "Contracts Sent", bg: "#FFD317FF", cards: [] },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
  
    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];
  
    if (startColumn === endColumn) {
      const newCards = Array.from(startColumn.cards);
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, startColumn.cards[source.index]);
      const newColumn = {
        ...startColumn,
        cards: newCards,
      };
      setColumns({ ...columns, [source.droppableId]: newColumn });
    } else {
      const startCards = Array.from(startColumn.cards);
      const endCards = Array.from(endColumn.cards);
      const [movedCard] = startCards.splice(source.index, 1);
      endCards.splice(destination.index, 0, {
        ...movedCard,
        status: endColumn.title,
      });
  
      // Call the sendEmail function when the card moves to a different column
      try {
        await sendEmail(movedCard.email, endColumn.title, localStorage.getItem("token"));
      } catch (error) {
        console.error('Error sending email:', error);
      }
  
      const newColumns = {
        ...columns,
        [source.droppableId]: { ...startColumn, cards: startCards },
        [destination.droppableId]: { ...endColumn, cards: endCards },
      };
      setColumns(newColumns);
    }
  };
  
  const handleSendEmail = async () => {
    try {
      // Retrieve access token from local storage or wherever it's stored
      const accessToken = localStorage.getItem('accessToken');
  
      // Check if access token is available
      if (!accessToken) {
        console.error('Error: Access token not found');
        return;
      }
  
      // Provide a valid email address to test sending email
      const email = 'pandeyrashi110@gmail.com';
  
      // Call the sendEmail function with the email address and access token
      await sendEmail(email, 'Column Title', accessToken);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  return (
    <>
      {/* <h3>Total Leads:25</h3>

      <NavLink to="/lead" id="btn">
        + New
      </NavLink> */}

      <br />
      <div className="Kanban">
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
                    {column.title}
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

                                {/* {card.content} */}
                                <div className="license">
                                  {card.amount}licenses
                                  <div className="status">{card.status}</div>
                                </div>
                                {/* <div className="content_"></div> */}
                                <div className="content_">
                                  {columnId === 'new' && (
                                    <NavLink to={`/showlead/${card.id}`}>
                                      <div className="c1">{card.name}</div>
                                    </NavLink>
                                  )}
                                {columnId !== '0' ? (
                                <NavLink to={`/showlead/${card.id}`}>
                                  <div className="c1">{card.name}</div>
                                </NavLink>
                              ) : (
                                <NavLink to={`/lead/${card.id}`}>
                                  <div className="c1">{card.name}</div>
                                </NavLink>
                              )}


                                  <div className="c2">
                                    {card.address}
                                    <div className="r1">$1,000</div>
                                  </div>

                                  <div className="c2">
                                    {card.email}
                                    <div className="r1">-</div>
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