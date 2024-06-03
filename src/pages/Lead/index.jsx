import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { Dropdown,Card, ListGroup } from "react-bootstrap";

import "./LeadPage.css";
import Kanban from "../../components/Kanban/Kanban";
import { NavLink ,Link} from "react-router-dom";
import { useState,useEffect } from "react";
import * as XLSX from "xlsx"; 
import LeadTable from "../../components/Kanban/LeadTable/LeadTable";
import { useAuth } from "../../authContext";
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

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(leadData);
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "leads.xlsx");
  };

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
  { /*   <div className="icon">
        <div className="upper"><img className="phone-icon" alt="phone icon" /></div>
        <div className="upper"><img className="message-icon" alt="message icon" /></div>
        <div className="upper"><img className="bell-icon"  alt="bell icon" /></div>
        <div className="upper"><img className="person-icon"  alt="person icon" /></div>
      </div> */}
      <Header name="Leads" />
     
      <div className="lead_add_btn">
        <div className="navlinks">
        <NavLink to={`/${tenantId}/addlead`} id="btn" style={{ backgroundColor: '#62CD14FF' }}>+ New</NavLink>

          <button onClick={toggleViewMode} className="view-mode-btn">
            {viewMode === "kanban" ? "Table View" : "Kanban View"}
          </button>
        </div>
        <div className="btn-container">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="payments-dropdown" className="excel-dropdown-menu_lead">
              Excel File
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={`/bulk-import?model=${modelName}`} className="import-excel-btn5">
                  Import Excel
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={handleDownloadExcel} className="excel-download-btn3">Excel</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {viewMode === "kanban" ? <Kanban /> : <LeadTable />}
    </div>
  </div>
  
    

    
  

  );
};
