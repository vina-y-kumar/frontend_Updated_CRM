import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import "./TaskTable.jsx";
import axiosInstance from "../../api.jsx";
const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; 
  }
  return null;
};
export const Taskinfo=()=>{
  const tenantId = getTenantIdFromUrl();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [addtasktable, setAddTaskTable] = useState({
    subject: "",
    due_date: "",
    status: "",
    priority: "",
    description: "",
    contact: null,
    account: "",
    createdBy: "",
    related_to: "",
    Reminder: "",
    repeat: "",
    closedTime: "",
    Notes: "",
    modifiedBy: "",
  });

  const { id } = useParams();

  

            const [meetings, setMeetings] = useState([]);
            useEffect(() => {
                const fetchTaskData = async () => {
                  try {
                    const response = await axiosInstance.get(`/tasks/${id}`);
                  
                    setAddTaskTable(response.data);
                  } catch (error) {
                    console.error("Error fetching account data:", error);
                  }
                };
            
                fetchTaskData();
              }, [id]);
             
              const handleChange = (event) => {
                setAddTaskTable({
                  ...addtasktable,
                  [event.target.name]: event.target.value,
                });
              };
              const handleAddNote = (event) => {
                event.preventDefault();
                const newNote = {
                  id: new Date().getTime(),
                  text: addtasktable.Notes,
                };
                setAddTaskTable({
                    ...addtasktable,
                    RecentNotes: [newNote, ...addtasktable.RecentNotes],
                    Notes: "",
                  });
                };
            
                  const handleAttach = () => {
                    console.log("Attach happened");
                  };
                  const handleNew = () => {
                    console.log("Add New happened");
                  };
                
                  const toggleAdditionalDetails = () => {
                    setAddTaskTable(!addtasktable);
                  };
                  const handleAddMeeting = (event) => {
                    event.preventDefault();
                    const newMeeting = {
                      CadenceName: addtasktable.CadenceName,
                      Modules: addtasktable.Modules,
                      CreatedDate: addtasktable.CreatedDate,
                      CreatedBy: addtasktable.createdBy,
                    };
                    setMeetings([...meetings, newMeeting]);
                    setAddTaskTable({
                      ...addtasktable,
                      CadenceName: "",
                      Modules: "",
                      CreatedDate: "",
                      createdBy: "",
                    });
                    setIsModalOpen(false);
                  };
                  const handleCloseTask = () => {
                    setIsModalOpen(true);
                  };
                  const handleCancelCloseTask = () => {
                    setIsModalOpen(false);
                  };
                 
                  const handleConfirmCloseTask = () => {
                    setIsCompleted(true); // Mark the task as completed
                    setIsModalOpen(false);
                  };

  return (
    <div>
      <div className="alltogether">
        <div className="subjectlist">
        
          <Link to={`../${tenantId}/tasks`}  id='back-inter-task' >
            Back
          </Link>
        
        </div>

        <div className="addtasks">
          <div className="task-head">
            <h1>Tasks Info</h1>
          </div>
          <div className="combine">
          
            
              <div className="para1">
                <ul >

                  <l1 className='task-info-data'>Priority -
             <span  className='task-prior'>  {addtasktable.priority}</span>     </l1>
                  <li className='task-info-data'>Due Date -
                  <span  className='task-prior'>  {addtasktable.due_date}</span>  </li>
                  <li className='task-info-data'>Status - 
                  <span  className='task-prior'>  {addtasktable.status}</span> </li>
                  <li className='task-info-data'>Related To-
                  <span  className='task-prior'>  {addtasktable.related_to}</span> </li>
                  <li className='task-info-data'>Task Owner -
                  <span  className='task-prior'>  {addtasktable.account}</span> </li>
                </ul>

              
              </div>
              <div className="closetask">
                <button
                  className="close-task-button"
                  onClick={isCompleted ? undefined : handleCloseTask}
                >
                  {isCompleted ? "Completed" : "Close Task"}
                </button>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={handleCancelCloseTask}
                >
                  <div className="modal-content">
                    <h2>
                      Are you sure you want to mark this task as completed?
                    </h2>
                    <div className="modal-buttons">
                      <button onClick={handleConfirmCloseTask}>
                        Mark as completed
                      </button>
                      <button onClick={handleCancelCloseTask}>Cancel</button>
                    </div>
                  </div>
                </Modal>
             
            </div>
          </div>

          <div className="info-task-show">
            <div className="hidedetail">
              <button onClick={toggleAdditionalDetails}>
                {addtasktable ? "Hide Details" : "Show Details"}
              </button>
            </div>
            <hr />

            <div className="showdetails"></div>
            {addtasktable && (
              <div className="detail">
                <h1 className='task-info-head'>Task Information :</h1>
                <div className="para1">
                  <div >
                  <ul className="hide-task-info" >

<l1 className='task-info-data1'>Task Owner -
<span  className='task-prior'>  {addtasktable.contact}</span>     </l1>
<li className='task-info-data1'>Subject -
<span  className='task-prior'>  {addtasktable.subject}</span>  </li>
<li className='task-info-data1'>Due Date - 
<span  className='task-prior'>  {addtasktable.due_date}</span> </li>
<li className='task-info-data1'>Related To-
<span  className='task-prior'>  {addtasktable.related_to}</span> </li>
<li className='task-info-data1'>Status -
<span  className='task-prior'>  {addtasktable.status}</span> </li>
<li className='task-info-data1'>Priority -
<span  className='task-prior'>  {addtasktable.priority}</span> </li>
<li className='task-info-data1'>Created By -
<span  className='task-prior'>  {addtasktable.createdBy}</span> </li>
{/* <li className='task-info-data'>Modified By -
<span  className='task-prior'>  {addtasktable.modifiedBy}</span> </li>
<li className='task-info-data'>Reminder -
<span  className='task-prior'>  {addtasktable.Reminder}</span> </li>
<li className='task-info-data'>Closed Time -
<span  className='task-prior'>  {addtasktable.closedTime}</span> </li> */}

</ul>
                  
                    {/* <h2> Description Information </h2> */}
                    {/* <p className="add1">
                      {" "}
                      Description - {addtasktable.description}
                    </p> */}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="info-noteee">
            <div className="notes-container">
              <div className="recent">
                <div className="notes">
                  <h1>Notes</h1>
                </div>

                <div>
                  <button className="recent-notes-button">Recent Notes</button>

                  <ul className="recent-notes-list">
                    {/* {contactinfo.RecentNotes.map(note => (
                      <li key={note.id}>{note.text}</li>
                    ))} */}
                  </ul>
                </div>
              </div>

              <form  className='form_taskk'  onSubmit={handleAddNote}>
                <textarea
                  name="Notes"
                  value={addtasktable.Notes}
                  onChange={handleChange}
                  className="notes-textarea"
                  placeholder="add a note........"
                ></textarea>
              
              </form>
            </div>
          </div>
          <div className="info-attach">
            <div >
              <div className="heads">
                <h2>Attachments</h2>
              </div>
              <div className="attachment-upload2">
  <label htmlFor="attachment-input1" className="clicktoupload2">Upload</label>
  <input type="file" id="attachment-input1" style={{ display: 'none' }} />
</div>

            </div>
          </div>
          
          <div className="info-link">
            <div className="info1">
              <div className="heads">
                <h2>Links</h2>

              </div>
              <div className="linksbtn">
              <button>+Add Manage</button>
            </div>
              
            </div>
          </div>
          <div className="info-action">
            <div className="heads">
              <h2>Upcoming Actions</h2>

            </div>
            <div className="linksbtn">
              <button>+Add Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskinfo;
