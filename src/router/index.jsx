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


import { useAuth } from "../authContext";
import { useState } from "react";
import Form3 from "../pages/opportunities/Form3";
import AddTaskForm from "../pages/TasksSection/AddTask";
import FlowGraph from "../pages/ReactFlow/Flowgraph";
import Taskinfo from "../pages/TasksSection/Taskinfo";


export const RouteWrapper = () => {
  const gettingToken = localStorage.getItem("token");
  const { authenticated } = useAuth();
  console.log(authenticated)
  return (
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
          <Route path="/callpage" element={<CallPage/>}/>
          <Route path="tasks/:id" element={<Taskinfo/>}/>
          <Route path="/accounts/:id" element={<AccountsPage />} />
          <Route path="/email" element={<EmailComponent/>} />
          <Route path="/tasks" element={<TaskTable/>} />
          <Route path="/addtask" element={<AddTaskForm/>}/>
          <Route path="/compose" element={<EmailComponent/>}/>
          <Route path="/bulk-import" element={<BulkImport/>}/>
          <Route path="/flow" element={<FlowGraph/>}/>
        </>
      )}


     
      <Route path="*" element={<NotFound />} />
    

      
    </Routes>
  );
};