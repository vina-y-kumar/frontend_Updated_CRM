import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "../../components/Sidebar";
import "./meetings.css";
import { Card, ListGroup } from "react-bootstrap";
import { NavLink,Link } from 'react-router-dom';
import io from 'socket.io-client';
const ReminderPopup = ({ subject }) => {
  return (
      <div className="reminder-popup">
          <p>{subject}</p>
      </div>
  );
};
const Met = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    from_time: "",
    to_time: "",
    related_to: "",
    createdBy: "",
    // host: '',
    // contactName: '',
  });
 
  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/reminders/');
  socket.onopen = function(event) {
    console.log('WebSocket connection established.');
};

socket.onmessage = function(event) {
    const reminderData = JSON.parse(event.data);
    console.log('Received reminder:', reminderData);
    // Handle the reminder data as needed
};

socket.onclose = function(event) {
    console.log('WebSocket connection closed.');
};

socket.onerror = function(event) {
    console.error('WebSocket error:', event);
};

    return () => {
        socket.close();
    };
}, []);
  useEffect(() => {
    axios
      .get("https://backendcrmnurenai.azurewebsites.net/meetings/", {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
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
  useEffect(() => {
    const modal = document.querySelector("#modal");
    const openModal = document.querySelector("#openModal");
    const closeModal = document.querySelector("#closeModal");

    if (modal && openModal && closeModal) {
      openModal.addEventListener("click", () => setModalOpen(true));
      closeModal.addEventListener("click", () => setModalOpen(false));
    }

    return () => {
      if (modal && openModal && closeModal) {
        openModal.removeEventListener("click", () => setModalOpen(true));
        closeModal.removeEventListener("click", () => setModalOpen(false));
      }
    };
  }, []);

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
            token: localStorage.getItem("token"),
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
        // host: '',
        // contactName: '',
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const handlePlusClick = () => {
    console.log("Plus clicked");
  };

  const handleRecords = () => {
    console.log("Contain records");
  };

  const handleAction = () => {
    console.log("Action happened");
  };

  return (
    <div className="calls">
      <div className="home_left_box">
        <Sidebar />
      </div>
      <div className="contain">
        <div className="meet">
          <select onChange={handlePlusClick}>
            <option value="">!!!</option>
            <option value="1">Log in</option>
            <option value="2">Log out</option>
          </select>

          <div className="create">
            <button id="openModal">Client Meetings</button>
            <dialog id="modal" open={modalOpen}>
              <div className="meeting-form-container">
                <form onSubmit={handleSubmit}>
                  <fieldset className="form-fieldset">
                    <legend className="form-legend">Meeting Information</legend>
                    <label className="form-label" htmlFor="title">
                      Title:
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="form-input"
                      required
                      value={formData.title}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="location">
                      Location:
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      className="form-input"
                      required
                      value={formData.location}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="from_time">
                      From:
                    </label>
                    <input
                      type="datetime-local"
                      name="from_time"
                      id="from_time"
                      className="form-input"
                      required
                      value={formData.from_time}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="to_time">
                      To:
                    </label>
                    <input
                      type="datetime-local"
                      name="to_time"
                      id="to_time"
                      className="form-input"
                      required
                      value={formData.to_time}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="related_to">
                      Related To:
                    </label>
                    <input
                      type="text"
                      name="related_to"
                      id="related_to"
                      className="form-input"
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
                  <div className="form-button-container">
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
            </dialog>
          </div>
          <select onChange={handleAction}>
            <option value="">Action</option>
            <option value="1">first</option>
            <option value="2">last</option>
          </select>
        </div>
        <div className="records">
          <select className="page" onChange={handleRecords}>
            <option value="">10 Records per page</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
          <select
  value={viewMode}
  onChange={(e) => handleViewModeChange(e.target.value)}
  className="view-mode-select"
>
  <option value="">View!</option>
  <option value="table">Table View</option>
  <option value="tile">Tile View</option>
  <option value="list">List View</option>
</select>
        </div>
        {viewMode==='table' &&(
        <div className="table1">
          <table>
            <thead>
              <tr className="host">
                <th>Title</th>
                <th>From</th>
                <th>To</th>
                <th>Related To</th>
                <th>Contact Name</th>
                <th>Host</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <tr key={meeting.id}>
                  <td>{meeting.title}</td>
                  <td>{meeting.from_time}</td>
                  <td>{meeting.to_time}</td>
                  <td>{meeting.related_to}</td>
                  <td>{meeting.contactName}</td>
                  <td>{meeting.host}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        {viewMode==='tile' &&(
          <div>
          <h2>Tiles View</h2>
          {/* Implement your Kanban view here */}
          <div className="accounts-tiles-container">
            {meetings.map((meeting, index) => (
              <Card key={meeting.id} className="account-tile">
                <Card.Body>
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
          <div className="accounts-list-container">
            <ListGroup>
              {meetings.map((meeting, index) => (
                <ListGroup.Item key={meeting.id} className="accounts-list-item">
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
