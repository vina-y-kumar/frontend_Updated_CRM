import React, { useState, useEffect } from "react";
import "./callpage.css";
import { Sidebar } from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import * as XLSX from "xlsx"; // Importing xlsx library


export const CallPage = () => {

  
  const [modalOpen, setModalOpen] = useState(false);
  const [calls, setCalls] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [meet, setMeet] = useState([]);

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false); 
  const [reminders, setReminders] = useState([]);
  const [reminderMessage, setReminderMessage] = useState("");

  const [callData, setCallData] = useState({
  location: "",
  call_type: "",
  start_time: "",
  to_time: "",
  related_to: "",
  createdBy: "",
  outgoing_status: "",
});
const showReminder = (message) => {
  setReminderMessage(`Reminder: Scheduled call '${scheduleData.subject}' starting soon!`);
;
};



  const [scheduleData, setScheduleData] = useState({
    subject: "",
    trigger_type: "time",
    event_date_time: "",
    time_trigger: "",
    is_triggered: false,
    createdBy:"",
  });
  const Reminder = ({ message, onClose }) => {
    return (
      <div className="reminder-modal">
        <div className="reminder">
          <p>{message}</p>
          <button onClick={onClose}>Dismiss</button>
        </div>
      </div>
    );
  };
  

  
  const handleDropDownChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "log") {
      setModalOpen(true);
    } else if (selectedOption === "schedule") {
      setScheduleModalOpen(true);
    } else {
      
    }
  };
  const closeModal = () => {
    setModalOpen(false);
    setScheduleModalOpen(false);

  };
 const scheduleReminder = (reminder) => {
  const now = new Date().getTime(); 
  if (reminder.triggerTime > now) {
    setReminders([...reminders, reminder]);
  }
};

  const dismissReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach((reminder) => {
        if (reminder.triggerTime <= now) {
          console.log("Reminder:", reminder.message);
          dismissReminder(reminder.id);
        }
      });
    }, 60000); 
    return () => clearInterval(interval);
  }, [reminders]);
 
    const fetchCalls = async () => {
    try {
      const response = await axios.get("https://backendcrmnurenai.azurewebsites.net/calls/", {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      setCalls(response.data);
    } catch (error) {
      console.error("Error fetching calls:", error);
    }
  };
    useEffect(() => {
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
      setCalls(response.data);
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
  console.log("Form submit event:", e);

  const apptValue = e.target.appt?.value || "";
  const timeValue = e.target.time?.value || "";

  if (!apptValue || !timeValue) {
    console.error("Missing appt or time value");
    return;
  }

  const startTime = new Date(apptValue).toISOString();
  const toTime = new Date(new Date().setHours(...timeValue.split(":"))).toISOString();

  const formData = {
    location: e.target.location?.value || "",
    call_type: e.target.related_to?.value || "",
    start_time: startTime,
    to_time: toTime,
    related_to: e.target.related_to ? e.target.related_to.value : "",
    createdBy: e.target.createdBy ? e.target.createdBy.value : "",
    outgoing_status: e.target.repeat ? e.target.repeat.value : "",
  };

  try {
    const response = await axios.post(
      "https://backendcrmnurenai.azurewebsites.net/calls/",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log("Call logged successfully:", response.data);
    closeModal();
    fetchCalls();
  } catch (error) {
    console.error("Error logging call:", error);
  }
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
      setCalls(response.data); 
    })
    .catch((error) => {
      console.error('Error fetching meet data:', error);
    });
}, []);
const handleScheduleMeeting = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "https://backendcrmnurenai.azurewebsites.net/reminders/",
      scheduleData,
      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log("Meeting scheduled successfully:", response.data);
  
    closeModal();
    fetchCalls(); 
const timeTrigger = new Date(scheduleData.time_trigger).getTime();

   
    const now = new Date().getTime();

    
    const timeDifference = timeTrigger - now;
  if (timeDifference > 0) {
      setTimeout(() => {
        const reminderMessage = `Reminder: Scheduled call '${scheduleData.subject}' starting soon!`;
        setReminderMessage(reminderMessage);

        const reminder = {
          id: response.data.id,
          message: reminderMessage,
        };
        setReminders([...reminders, reminder]);
      }, timeDifference);
    }
  } 
  catch (error) {
    console.error("Error scheduling meeting:", error);
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

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(calls);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "calls");
    XLSX.writeFile(wb, "calls.xlsx");
  };


  return (
    <div className="calls">
      <div className="home_left_box">
        <Sidebar />
      </div>
      <div className="contain">
        <div className="meet">
        <button onClick={handleDownloadExcel} className="excel-download-btn2">
            Excel
          </button>
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
            < div className="create">
            <select onChange={handleDropDownChange}>
              <option value="">Select Action</option>
              <option value="schedule">Schedule a Call</option>
              <option value="log">Log a Call</option>
            </select>
          
           
            <dialog id="modal1" open={modalOpen}>
  <div className="meeting-form-container">
    <form onSubmit={handleCreateMeeting} id="meeting-form">
      <fieldset className="form-fieldset">
        <legend className="form-legend">Log a Call</legend>
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
          type="datetime-local"
          name="appt"
          id="appt"
          className="form-input"
          required
        />
        <label htmlFor="time">Duration:</label>
        <input
          type="time"
          name="time"
          id="time"
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
        <button type="submit" className="form-button save-button1">
          Save
        </button>
      </div>
    </form>
  </div>
</dialog>
              <dialog id="scheduleModal" open={scheduleModalOpen}>
        <div className="meeting-form-container">
          <form onSubmit={handleScheduleMeeting} id="schedule-form">
            <fieldset className="form-fieldset">
              <legend className="form-legend">Schedule Call</legend>
              <label className="form-label" htmlFor="subject">
               Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                className="form-input"
                value={scheduleData.subject}
                onChange={(e) =>
                  setScheduleData({ ...scheduleData, subject : e.target.value })
                }
                required
              />
              <label className="form-label" htmlFor="eventDateTime">
              Event Date Time:
              </label>
              <input
                type="datetime-local"
                name="eventDateTime"
                id="eventDateTime"
                className="form-input"
                 value={scheduleData.event_date_time}
                 onChange={(e) => setScheduleData({ ...scheduleData, event_date_time: e.target.value })}
                 required
                
              />
                          
                          <label className="form-label" htmlFor="timeTrigger">Time Trigger:</label>
              <input
                type="datetime-local"
                name="timeTrigger"
                id="timeTrigger"
                className="form-input"
                value={scheduleData.time_trigger}
                onChange={(e) => setScheduleData({ ...scheduleData, time_trigger: e.target.value })}
                required
              />
                       <label className="form-label" htmlFor="createdBy">Created By</label>
              <input
                type="createdBy"
                name="createdBy"
                id="createdBy"
                className="form-input"
                value={scheduleData.createdBy}
                onChange={(e) => setScheduleData({ ...scheduleData, createdBy: e.target.value })}
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
              <button type="submit" className="form-button save-button1">
                Schedule
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
         {reminders.map((reminder) => (
          <Reminder
            key={reminder.id}
            message={reminder.message}
            onClose={() => dismissReminder(reminder.id)}
          />
        ))}
         {reminderMessage && (
        <Reminder message={reminderMessage} onClose={() => setReminderMessage("")} />
      )}
      </div>
    </div>
  );
};

export default CallPage;