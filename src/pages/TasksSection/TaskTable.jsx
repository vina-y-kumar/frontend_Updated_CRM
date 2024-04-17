// import "./accountsSection.css";
import { Sidebar } from "../../components/Sidebar/index.jsx";
import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from "react-bootstrap";
import { NavLink,Link } from 'react-router-dom';
import axios from "axios";
import "./task.css";


export const TaskTable = () => {
  const handleAllCalls1 = (event) => {
    console.log("Filter by: ", event.target.value);
  };

  const handleAction = () => {
    console.log("Action required");
  };

  const handlePlusClick1 = () => {
    console.log("Plus clicked");
  };

  const handleRecords1 = (event) => {
    console.log("Records per page: ", event.target.value);
  };
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // Default view mode is table

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "https://backendcrmnurenai.azurewebsites.net/tasks/"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="all_students">
      <div className='calls1'>
        <div className="home_left_box1">
          <Sidebar />
        </div>
        <div className="contain1" style={{width:"100%"}}>
          <div className="meet1" >
            <div className="Addcalls1">
              <select className="view-mode-select" onChange={handleAllCalls1}>
                <option value="">All Accounts</option>
                <option value="1">Log in</option>
                <option value="2">Log out</option>
              </select>  
            </div>
            <div className="handle1 ">
              <select onChange={handlePlusClick1} className="view-mode-select">
                <option value="">!!!</option>
                <option value="1">Log in</option>
                <option value="2">Log out</option>
              </select>
              
              <select className="view-mode-select" onChange={handleAction}>
                <option value="">Action</option>
                <option value="1">Log in</option>
                <option value="2">Log out</option>
              </select> 
              <div className="create1">
                <NavLink to="/addtask" id="btn1"> Create Task</NavLink>
              </div>
            </div>
          </div>
          
          <div>
      <div className="records2" style={{ width: "100%" }}>
        <select className="view-mode-select" style={{ float: "left" }}>
          <option value="">50 Records per page</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </select>
        <select
          value={viewMode}
          onChange={handleViewModeChange}
          className="view-mode-select"
        >
          <option value="">View!</option>
          <option onClick={() => handleViewModeChange("table")} value="">
            Table View
          </option>
          <option onClick={() => handleViewModeChange("tile")}>
            Tile View
          </option>
          <option onClick={() => handleViewModeChange("list")}>
            List View
          </option>
        </select>
      </div>

      <br />
      
      {/* table view */}
      {viewMode === "table" && (
        <div>
          <h2>Tasks Table</h2>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Description</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  
                  <td>
                    <Link to={`/tasks/${task.id}`}>
                      {task.subject}
                    </Link>
                  </td>
                  <td>{task.status}</td>
                  <td>{task.due_date}</td>
                  <td>{task.priority}</td>
                  <td>{task.description}</td>
                  <td>{task.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Tile View */}
      {viewMode === "tile" && (
        <div>
          <h2>Tiles View</h2>
          {/* Implement your Kanban view here */}
          <div className="accounts-tiles-container">
            {tasks.map((task, index) => (
              <Card key={task.id} className="account-tile">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/tasks/${task.id}`}>
                      {task.subject}
                    </Link>
                  </Card.Title>
                  <Card.Text>Status: {task.status}</Card.Text>
                  <Card.Text>Due Date: {task.due_date}</Card.Text>
                  <Card.Text>Description: {task.description}</Card.Text>
                  <Card.Text>Priority: {task.priority}</Card.Text>
                  <Card.Text>Contact: {task.contact}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
      {viewMode === "list" && (
        <div>
          <h2>List View</h2>
          <div className="accounts-list-container">
            <ListGroup>
              {tasks.map((task, index) => (
                <ListGroup.Item key={task.id} className="accounts-list-item">
                  <Link to={`/tasks/${task.id}`}>{task.subject}</Link>
                  <p>Status: {task.status}</p>
                  <p>Due Date: {task.due_date}</p>
                  <p>Description: {task.description}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Contact: {task.contact}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      )}
    </div>
        </div>
      </div>
    </div>
  );
};
export default TaskTable;