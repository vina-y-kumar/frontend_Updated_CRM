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

// import KanbanBoard from "../../components/Kanban/Kanban";



export const LeadPage = () =>
 {
  const modelName = "leads";

  const [leadData, setLeadData] = useState([]);
  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await fetch("https://backendcrmnurenai.azurewebsites.net/leads/");
        if (!response.ok) {
          throw new Error("Failed to fetch lead data");
        }
        const data = await response.json();
        setLeadData(data);
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
<NavLink to="/addlead" id="btn">+ New</NavLink>
            <br/>
           
</div>
<Link to={`/bulk-import?model=${modelName}`} className="import-excel-btn5">
        Import Excel
      </Link>
<button onClick={exportToExcel} className="excel-download-btn3">
             Excel
          </button>
                      
        
            {/* <NavLink to="/createLead" id="btn">Create Lead</NavLink> */}
              {/* <AddPayment/> */}
              {/* <KanbanBoard/> */}
              <br/>
              <Kanban/>
              {/* <PaymentsList/> */}
            
          

      
         
    </div>
    </div>
    

    
  

  );
};
