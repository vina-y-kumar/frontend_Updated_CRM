
import { Route, Routes } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { LeadPage } from "../pages/Lead";
import { NotFound } from "../pages/NotFound";
import { AccountsTable } from "../pages/AccountsSection";
import { ContactsTable } from "../pages/ContactsTable";
import { Opportunities } from "../pages/opportunities";
import Dashboard from "../pages/dashboard";
import KanbanBoard from "../components/Kanban/Kanban11";
import Lead from "../pages/Lead/AddLead/Lead";
// import Kanban1 from "../components/Kanban/Kanban1";
import Met from "../pages/Meetings/met";
import CallPage from "../pages/CallPage/callpage";
import Form2 from "../pages/ContactsTable/Form2";
import ContactInfo from "../pages/ContactsTable/ContactInfo";
import EmailComponent from "../pages/MassEmail/Compose";
import AccountsPage from "../pages/AccountsPage/AccountPage";
import CreateLead from "../pages/Lead/CreateLead";
import AccountForm from "../pages/AccountsSection/AccountForm";
import TaskTable from "../pages/TasksSection/TaskTable";
import ConvertLead from "../pages/Lead/ConvertLead";
import BulkImport from "../pages/BulkImport/BulkImport";
import axios from "axios";
import { useAuth } from "../authContext";
import { useState,useEffect } from "react";
import Form3 from "../pages/opportunities/Form3";
import AddTaskForm from "../pages/TasksSection/AddTask";
import FlowGraph from "../pages/ReactFlow/Flowgraph";
import Taskinfo from "../pages/TasksSection/Taskinfo";
import SendEmail from "../pages/SendEmail/SendEmail";
import WhatsApp from "../pages/WhatsApp/WhatsApp";
import FaceB from "../pages/facebook/facebook";
import  Interaction from "../pages/InteractionPage/InteractionPage";
import AddInteractionForm from "../pages/InteractionPage/AddInteractionForm";
import InteractionDetailsPage from "../pages/InteractionPage/InteractionDetailsPage";
import FlowGraph2 from "../pages/ReactFlow2/Flowgraph";

export const RouteWrapper = () => {
  const gettingToken = localStorage.getItem("token");
  const [reminders, setReminders] = useState([]);
  const [reminderMessage, setReminderMessage] = useState("");
  const { authenticated } = useAuth();
  
  const showReminder = (message) => {
    setReminderMessage(`Reminder: Scheduled call '${scheduleData.subject}' starting soon!`);
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
  const scheduleReminder = (reminder) => {
    const now = new Date().getTime(); 
    if (reminder.triggerTime > now) {
      setReminders([...reminders, reminder]);
    }
  };
  
    const dismissReminder = (id) => {
      setReminders(reminders.filter((reminder) => reminder.id !== id));
    };
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
  console.log(authenticated)
  return (
    <>
    {reminders.map((reminder) => (
      <Reminder
        key={reminder.id}
        message={reminder.message}
        onClose={() => dismissReminder(reminder.id)}
      />
    ))}
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
  
      {authenticated && (
        <>
          <Route path="/home" element={<Home />} /> 
          <Route path="/accounts" element={<AccountsTable/>}/> 
          <Route path="/contacts" element={<ContactsTable/>}/> 
          <Route path="/lead" element={<LeadPage />} />
          <Route path="/opportunities" element={<Opportunities />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/addlead" element={<Lead/>} />
          {/*<Route path="/addform" element={<Form1/>} />*/}
          <Route path="/contactinfo/:id" element={<ContactInfo/>}/>
          <Route path="/createlead/:id" element={<CreateLead/>}/>
          <Route path="/convert/:id" element={<ConvertLead/>}/>
          <Route path="/addaccount" element={<AccountForm/>} />
          <Route path="/addcontact" element={<Form2/>}/>
          <Route path="/meetings" element={<Met/>}  />
          <Route path="/opportunity" element={<Form3/>} />
          <Route path="/callpage" element={<CallPage handleScheduleMeeting={handleScheduleMeeting} scheduleData={scheduleData} setScheduleData={setScheduleData} />} />
          <Route path="tasks/:id" element={<Taskinfo/>}/>
          <Route path="/accounts/:id" element={<AccountsPage />} />
          <Route path="/send-email/:id" element={<SendEmail/>}/>
          <Route path="/send-msg/:id" element={<WhatsApp/>}/>
          <Route path="/email" element={<EmailComponent/>} />
          <Route path="/tasks" element={<TaskTable/>} />
          <Route path="/interaction" element={<Interaction/>}/>
          <Route path="/addtask" element={<AddTaskForm/>}/>
          <Route path="/compose" element={<EmailComponent/>}/>
          <Route path="/bulk-import" element={<BulkImport/>}/>
          <Route path="/flow" element={<FlowGraph/>}/>
          <Route path="/FB" element={<FaceB/>}/>
          <Route path="/addinteraction" element={<AddInteractionForm/>} />
          <Route path="/interaction/:id" element={<InteractionDetailsPage/>} />
          <Route path="/flow2" element={<FlowGraph2/>}/>
        </>
      )}


<Route path="*" element={<Login/>} />
      {/* <Route path="*" element={<NotFound />} />*/}
    

      
    </Routes>
    </>
  );
};