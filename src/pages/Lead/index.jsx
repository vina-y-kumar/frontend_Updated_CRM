import { Sidebar } from "../../components/Sidebar";
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
    
    
      
          <div>
                    <div className="contactlist">
                      <h1>Leads</h1>
                    </div>
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
          </div>     
          <div>
              <br/>
              {viewMode === "kanban" ? <Kanban /> : <LeadTable />}

          </div>
      
         
     </div>
  </div>

  );
};
