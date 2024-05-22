import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "../../components/Sidebar";
import "./meetings.css";
import { Dropdown, Card, ListGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import * as XLSX from "xlsx"; 
import io from 'socket.io-client';

const Met = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [viewMode, setViewMode] = useState('table');

  const modelName = "Meetings";

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    from_time: "",
    to_time: "",
    related_to: "",
    createdBy: "",
  });

  useEffect(() => {
    axios.get("https://backendcrmnurenai.azurewebsites.net/meetings/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
      },
    })
    .then((response) => {
      setMeetings(response.data);
    })
    .catch((error) => {
      console.error("Error fetching meetings data:", error);
    });
  }, []);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backendcrmnurenai.azurewebsites.net/meetings/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        }
      );
      console.log("Meeting created successfully:", response.data);
      setMeetings([...meetings, response.data]);
      setModalOpen(false);
      setFormData({
        title: "",
        location: "",
        from_time: "",
        to_time: "",
        related_to: "",
        createdBy: "",
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(meetings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "meetings");
    XLSX.writeFile(wb, "meetings.xlsx");
  };

  return (
    <div className="calls">
      <div className="home_left_box">
        <Sidebar />
      </div>
<div className="meetings-header">
   <h1 className='meeting_head'>Meetings</h1>
   <div className="meeting-header-buttons">
    <div>
    <Dropdown>
              <Dropdown.Toggle variant="primary" id="payments-dropdown6" className="excel-dropdown-menu6">
                Excel File
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to={`/bulk-import?model=${modelName}`} className="import-excel-btn5">
                    Import Excel
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button onClick={handleDownloadExcel} className="excel-download-btn1">
                    Excel
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
    </div>
           
            <div className='meet_client_meet'>
            <button id="openModal" onClick={() => setModalOpen(true)}>+Client Meetings</button>

            </div>

          </div>
</div>
     
      <div className="contain">
        <div className="meet">
          
          <div className="create">
            {modalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="meeting-form-container">
                    <form onSubmit={handleSubmit}>
                      <fieldset className="form-fieldset">
                        <legend className="form-legend">Create A meeting</legend>
                        <label className="form-label-title" htmlFor="title">
                          Title:
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="form-input-title"
                          required
                          value={formData.title}
                          onChange={handleChange}
                        />
                        <label className="form-label-location" htmlFor="location">
                          Location:
                        </label>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          className="form-input-location"
                          required
                          value={formData.location}
                          onChange={handleChange}
                        />
                        <label className="form-label-time" htmlFor="from_time">
                          From:
                        </label>
                        <input
                          type="datetime-local"
                          name="from_time"
                          id="from_time"
                          className="form-input-fromtime"
                          required
                          value={formData.from_time}
                          onChange={handleChange}
                        />
                        <label className="form-label-to_time" htmlFor="to_time">
                          To:
                        </label>
                        <input
                          type="datetime-local"
                          name="to_time"
                          id="to_time"
                          className="form-input-totime"
                          required
                          value={formData.to_time}
                          onChange={handleChange}
                        />
                        <label className="form-label-related_to" htmlFor="related_to">
                          Related To:
                        </label>
                        <input
                          type="text"
                          name="related_to"
                          id="related_to"
                          className="form-input-related"
                          required
                          value={formData.related_to}
                          onChange={handleChange}
                        />
                        {/* <label className="form-label" htmlFor="contactName">Contact Name:</label>
                        <input type="text" name="contactName" id="contactName" className="form-input" required value={formData.contactName} onChange={handleChange} />
                         */}
                        {/* <label className="form-label" htmlFor="host">Host</label> 
                        <input type="text" name="host" id="host" className="form-input" required value={formData.host} onChange={handleChange} /> 
                      */}
                      </fieldset>
                      <div className="form-button-container1">
                        <button
                          type="button"
                          className="form-button cancel-button"
                          id="closeModal"
                          onClick={() => setModalOpen(false)}
                        >
                          Close
                        </button>
                        <button type="submit" className="form-button save-button">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="record5">
          <select className="page">
            <option value="">10 Records per page</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
          <select
            value={viewMode}
            onChange={(e) => handleViewModeChange(e.target.value)}
            className="view-mode-select-meet"
          >
            <option value="">View!</option>
            <option value="table">Table View</option>
            <option value="tile">Tile View</option>
            <option value="list">List View</option>
          </select>
        </div>
        {viewMode === 'table' && (
  <div className="table10">
    <table>
      <thead>
        <tr className="host">
          <th className="title-meet">Title</th>
          <th className="from_meet">From</th>
          <th className="To_meet">To</th>
          <th className="related_meet">Related To</th>
          <th className="name_meet">Contact Name</th>
          <th className="host_meet">Host</th>
          <th className="action_meet">Action</th>
        </tr>
      </thead>
      <tbody>
        {meetings.map((meeting) => (
          <tr key={meeting.id}>
            <td className='title_row_data'>{meeting.title}</td>
            <td className="from_row_data">{meeting.from_time}</td>
            <td className="to_row_data">{meeting.to_time}</td>
            <td className="related_row_data">{meeting.related_to}</td>
            <td className="contact_row_data">{meeting.contact_name}</td> 
            <td className="host_meet_data">{meeting.host}</td> 
            <td className='action_data'></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

         {viewMode==='tile' &&(
          <div>
          <div className="meetings-tiles-container">
            {meetings.map((meeting, index) => (
              <Card key={meeting.id} className="meeting-tile">
                <Card.Body >
                  <Card.Title>
                    <Link to={`/meetings/${meeting.id}`}>
                      {meeting.title}
                    </Link>
                  </Card.Title>
                  <Card.Text>From: {meeting.from_time}</Card.Text>
                  <Card.Text>To: {meeting.to_time}</Card.Text>
                  <Card.Text>Related To: {meeting.related_to}</Card.Text>
                  <Card.Text>Host Name: {meeting.host}</Card.Text>
                  <Card.Text>Contact Name: {meeting.contact_name}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
        )}
{viewMode==='list' &&(
          <div>
          <h2>List View</h2>
          <div className="meeting-list-container">
            <ListGroup>
              {meetings.map((meeting, index) => (
                <ListGroup.Item key={meeting.id} className="meetings-list-item">
                  <Link to={`/meetings/${meeting.id}`}>{meeting.title}</Link>
                  <p>From: {meeting.from_time}</p>
                  <p>To: {meeting.to_time}</p>
                  <p>Related To: {meeting.related_to}</p>
                  <p>Host Name: {meeting.host}</p>
                  <p>Contact Name: {meeting.contact_name}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
        )}
        
      </div>
    </div>
  );
};

export default Met;
