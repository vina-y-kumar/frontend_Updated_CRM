import React, { useState, useEffect } from "react";
import "./callpage.css";
import { Sidebar } from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";

const CallPage = () => {

  
  const [modalOpen, setModalOpen] = useState(false);
  const [calls, setCalls] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await axios.get(
          "https://backendcrmnurenai.azurewebsites.net/calls/"
        );
        setCalls(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchCalls();
  }, []);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

useEffect(() => {
  axios
    .get("https://backendcrmnurenai.azurewebsites.net/calls/", {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      setMeet(response.data);
    })
    .catch((error) => {
      console.error('Error fetching meet data:', error);
    });
}, []);



useEffect(() => {
  const modal1 = document.querySelector("#modal1");
  const openModal = document.querySelector("#openModal");
  const closeModal = document.querySelector("#closeModal");

  if (modal1 && openModal && closeModal) {
    openModal.addEventListener("click", () => setModalOpen(true));
    closeModal.addEventListener("click", () => setModalOpen(false));
  }

  return () => {
    if (modal1 && openModal && closeModal) {
      openModal.removeEventListener("click", () => setModalOpen(true));
      closeModal.removeEventListener("click", () => setModalOpen(false));
    }
  };
}, []);



const handleCreateMeeting = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('https://backendcrmnurenai.azurewebsites.net/calls/', callData, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    console.log('Meeting created successfully:', response.data);
    setMeet([...meet, response.data]);
    setModalOpen(false);
    setCallData({
      id: 1,
      location: "",
      call_type: "",
      start_time: "",
      to_time: "",
      related_to: "",
      createdBy: "",
      outgoing_status: "",      
    
    });
  } catch (error) {
    console.error('Error creating meeting:', error);
  }
};



 const handleAllCalls = (event) => {
    console.log("Filter by: ", event.target.value);
  };

 
  
  const handlePlusClick = () => {
    console.log("Plus clicked");
  };

  const handleRecords = (event) => {
    console.log("Records per page: ", event.target.value);
  };

  return (
    <div className="calls">
      <div className="home_left_box">
        <Sidebar />
      </div>
      <div className="contain">
        <div className="meet">
          <div className="Addcalls">
            <select onChange={handleAllCalls}>
              <option value="">All Calls</option>
              <option value="1">Log in</option>
              <option value="2">Log out</option>
            </select>
          </div>
          <div className="handle">
            <select onChange={handlePlusClick}>
              <option value="">!!!</option>
              <option value="1">Log in</option>
              <option value="2">Log out</option>
            </select>
            <div className="create">
              <button onClick={() => setModalOpen(true)}>Create Call</button>
              <dialog id="modal1" open={modalOpen}>
                <div className="meeting-form-container">
                  <form onSubmit={handleCreateMeeting} id="meeting-form">
                    <fieldset className="form-fieldset">
                      <legend className="form-legend">Log a call</legend>
                      <label className="form-label" htmlFor="location">
                        Call To:
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        className="form-input"
                        required
                      />
                      <label className="form-label" htmlFor="participants">
                        Related To:
                      </label>
                      <input
                        type="text"
                        name="participants"
                        id="participants"
                        className="form-input"
                        required
                      />
                      <label className="form-label" htmlFor="related-to">
                        Call Type:
                      </label>
                      <input
                        type="text"
                        name="related-to"
                        id="related-to"
                        className="form-input"
                        required
                      />
                      <label className="form-label" htmlFor="repeat">
                        Outgoing Call Status:
                      </label>
                      <input
                        type="text"
                        name="repeat"
                        id="repeat"
                        className="form-input"
                        required
                      />
                      <label htmlFor="appt">Select a time:</label>
                      <input
                        type="time"
                        id="appt"
                        className="form-input"
                        required
                      />
                      <label className="form-label" htmlFor="description">
                        Voice Recording
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        className="form-input"
                        required
                      />
                    </fieldset>
                    <div className="form-button-container">
                      <button
                        type="button"
                        className="form-button cancel-button1"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="form-button save-button1"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
            <select onChange={handleCreateMeeting}>
              <option value="">Action</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
        </div>
        <div className="records" style={{ width: "100%" }}>
          <select className="view-mode-select" onChange={handleRecords}>
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

        {/* table view */}
        {viewMode === "table" && (
          <div className="table1">
            <table>
              <thead>
                <tr>
                  <th>Contact Name</th>
                  <th>Call Type</th>
                  <th>Call Start Time</th>
                  <th>Call Duration</th>
                  <th>Related To</th>
                  <th>Location</th>
                  <th>Recording</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((meeting) => (
                  <tr key={meeting.id}>
                    <td>{meeting.call_to}</td>
                    <td>{meeting.call_type}</td>
                    <td>{meeting.start_time}</td>
                    <td>{meeting.call_duration}</td>
                    <td>{meeting.related_to}</td>
                    <td>{meeting.location}</td>
                    <td>{meeting.voice_recording}</td>
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
              {calls.map((call, index) => (
                <Card key={call.id} className="account-tile">
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/calls/${call.id}`}>{call.call_to}</Link>
                    </Card.Title>
                    <Card.Text>Call Type: {call.call_type}</Card.Text>
                    <Card.Text>Start Time: {call.start_time}</Card.Text>
                    <Card.Text>Call Duration: {call.call_duration}</Card.Text>
                    <Card.Text>Related To: {call.related_to}</Card.Text>
                    <Card.Text>Location: {call.location}</Card.Text>
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
                {calls.map((call, index) => (
                  <ListGroup.Item key={call.id} className="accounts-list-item">
                    <Link to={`/calls/${call.id}`}>{call.Name}</Link>
                    <p>Call Type: {call.call_type}</p>
                    <p>Start Time: {call.start_time}</p>
                    <p>Call Duration: {call.call_duration}</p>
                    <p>Related To: {call.related_to}</p>
                    <p>Location: {call.location}</p>
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

export default CallPage;