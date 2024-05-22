import bell_icon from "../../assets/bell-icon.png";
import message_icon from "../../assets/message-icon.png";
import person_icon from "../../assets/person-icon.png";
import phone_icon from "../../assets/phone-icon.jpg";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import "./LeadPage.css";
import Kanban from "../../components/Kanban/Kanban";
import { NavLink ,Link} from "react-router-dom";
import { useState,useEffect } from "react";
import * as XLSX from "xlsx"; 
import LeadTable from "../../components/Kanban/LeadTable/LeadTable";
import { useAuth } from "../../authContext";
// import KanbanBoard from "../../components/Kanban/Kanban";
import axiosInstance from "../../api";
const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

export const LeadPage = () =>
 {
  const tenantId=getTenantIdFromUrl();
  const {userId}=useAuth();
  const modelName = "leads";

  const [leadData, setLeadData] = useState([]);
  const [viewMode, setViewMode] = useState("kanban"); // Add a state for the view mode

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await axiosInstance.get('/leads/');
        setLeadData(response.data);
      } catch (error) {
        console.error("Error fetching lead data:", error);
      }
    };

    fetchLeadData();
  }, []);

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(leadData);
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "leads.xlsx");
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "kanban" ? "table" : "kanban");
  };

  return (
  <div className="head-section">
    <div className="pay_left_box">
            <Sidebar />
          </div>

    <div className="head">
    
      <div className="icon">
      <div className="upper" ><img className="phone-icon"src={phone_icon}/></div>
      <div className="upper" ><img className="message-icon" src={message_icon}/></div>
      <div className="upper" ><img className="bell-icon" src={bell_icon}/></div>
      <div className="upper" ><img className="person-icon" src={person_icon}/></div>
      </div>
    
      

          
            <Header name="Leads" />
            
          
              <h3 >Total Leads: 25</h3>
            

<div className="navlinks">
<NavLink to={`/${tenantId}/addlead`} id="btn">+ New</NavLink>
            <br/>

            <button onClick={toggleViewMode} className="view-mode-btn">
            {viewMode === "kanban" ? "Table View" : "Kanban View"}
          </button>
           
</div>
<Link to={`/${tenantId}/bulk-import?model=${modelName}`} className="import-excel-btn5">
        Import Excel
      </Link>
      
<button onClick={exportToExcel} className="excel-download-btn3">
             Excel
          </button>
                      
        
            {/* <NavLink to="/ShowLead" id="btn">Create Lead</NavLink> */}
              {/* <AddPayment/> */}
              {/* <KanbanBoard/> */}
              <br/>
              {viewMode === "kanban" ? <Kanban /> : <LeadTable />}
              {/* <PaymentsList/> */}
            
          

      
         
    </div>
    </div>
    

    
  

  );
};
