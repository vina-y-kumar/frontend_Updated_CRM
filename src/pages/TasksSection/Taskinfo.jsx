import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./task.css";
import { NavLink,Link } from 'react-router-dom';
import Modal from "react-modal";
import "./TaskTable.jsx";
import axiosInstance from "../../api.jsx";
const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};
export const Taskinfo=()=>{
  const tenantId = getTenantIdFromUrl();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);


    const [addtasktable,setAddTaskTable]= useState({


        subject: "",
        due_date: "",
        status: "",
        priority: "",
        description: "",
        contact: null,
        account: "",
        createdBy: "",
        related_to:"",
        Reminder:"",
        repeat:"",
        closedTime:"",
        Notes:"",
        modifiedBy:"",
            })
           
          
          
          
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
                    setModalOpen1(false);
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
                  
                



                  return(
                    
                    <div>

                      <div className="alltogether">

                        
                      <div className="subjectlist">
                        <div className="info5">
                        <ul>
  {tasks.map((task, index) => (
    <li key={task.id}>
      <Link to={`/${tenantId}/tasks/${task.id}`} >
        {task.subject}
      </Link>
    </li>
  ))}
</ul>
                        </div>
                  

                      </div>
          

               <div className="addtasks">
                <div className="combine">
                <div className="info">
               <h1>head section</h1>
            <div className="para1">
             
              <p className="para">Priority  - {addtasktable.priority}  </p>
              <p className="para">Due Date  -{addtasktable.due_date}</p>
              <p className="para">Status -    {addtasktable.status}</p>
              <p className="para">Related To - {addtasktable.related_to}</p>
              <p className="para">Task Owner  - {addtasktable.account}</p>
              

            </div>
            <div className="closetask">

            <button
            className="close-task-button"
            onClick={isCompleted ? undefined : handleCloseTask}
          >
            {isCompleted ? "Completed" : "Close Task"}
          </button>
            <Modal isOpen={isModalOpen} onRequestClose={handleCancelCloseTask}>
        <div className="modal-content">
          <h2>Are you sure you want to mark this task as completed?</h2>
          <div className="modal-buttons">
            <button onClick={handleConfirmCloseTask}>Mark as completed</button>
            <button onClick={handleCancelCloseTask}>Cancel</button>
          </div>
        </div>
      </Modal>
            </div>
            

           
          </div>
                </div>
              
          <div className="info">
            <div className="hidedetail">
              <button onClick={toggleAdditionalDetails}>
                {addtasktable ? "Hide Details" : "Show Details"}
              </button>
            </div>
            <hr />

            <div className="showdetails"></div>
            {addtasktable && (
              <div className="detail">
                <h1>Task Information</h1>
                <div className="add">
                    
                  <div>
                    <p>Task  Owner  {addtasktable.contact}</p>
                    <p>Subject -  {addtasktable.subject}</p>
                    <p>Due Date -  {addtasktable.due_date}</p>
                    <p>Related To -  {addtasktable.related_to}</p>
                    <p>Status -  {addtasktable.status}</p>
                    <p>Priority -  {addtasktable.priority}</p>
                    <p>Created By -  {addtasktable.createdBy}</p>
                    <p>Modified By-  {addtasktable.modifiedBy} </p>
                    <p>Reminder -  {addtasktable.Reminder}</p>
                    <p>Repeat -  {addtasktable.repeat}</p>
                    <p>Closed Time -  {addtasktable.closedTime}</p>
                    <h2> Description Information </h2>
            <p className="add1"> Description -  {addtasktable.description}</p>

                  </div>
                 


                 
                </div>
              </div>
            )}
          </div>
          <div className="info">
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

              <form onSubmit={handleAddNote}>
                <textarea
                  name="Notes"
                  value={addtasktable.Notes}
                  onChange={handleChange}
                  className="notes-textarea"
                  placeholder="add a note........"
                ></textarea>
                <button type="submit" className="add-note-button">
                  Add Note
                </button>
              </form>
            </div>
          </div>
          <div className="info">
            <div className="info1">
              <div className="heads">
                <h2>Attachments</h2>
              </div>
              <div className="attach">
                <select onChange={handleAttach}>
                  <option value="">Attach</option>

                  <option value="1">Upload File</option>
                  <option value="2">Documents </option>
                  <option value="3">Zoho Workdrive</option>
                  <option value="4">Other Cloud Drives</option>
                  <option value="3">Link(URL)</option>



                                   </select>
              </div>
            </div>
          </div>
          <div className="info">
            <div className="info1">
              <div className="heads">
                <h2>Links</h2>
              </div>
              <div className="addmanage">
                <button>Add</button>
                <button>Manage</button>
              </div>
             
            </div>
          </div>
          <div className="info">
            <div className="info1">
                <h2>Upcoming Actions</h2>
            </div>

          </div>
               </div>

                      </div>
                    </div>

      
                        
                        
                
                  )


}

export default Taskinfo;