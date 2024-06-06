import ReportList from "./reportlist.jsx";
import React, { useState, useEffect } from 'react';
import './report.css';
import axiosInstance from "../../api.jsx";
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; // Adjust the import path
import { NavLink,Link } from 'react-router-dom';
import { Dropdown  } from "react-bootstrap";





const getTenantIdFromUrl = () => {
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null; 
  };

const Report = () => {
    const tenantId=getTenantIdFromUrl();
    const modelName = "reports";
    const [reportData, setReportData] = useState([]);
    const [reportId, setReportId] = useState(""); // State to store the current report ID


    useEffect(() => {
      const fetchReportData = async () => {
          try {
              if (reportId) {
                  const response = await axiosInstance.get(`/r/${reportId}/`);
                  console.log('Response:', response); // Log the response for debugging
                  setReportData(response.data);
              }
          } catch (error) {
              console.error('Error fetching report data:', error);
              setReportData([]); // Reset reportData on error
          }
      };

      fetchReportData(); 
  }, [reportId]);
  
  


  const reportListItems = [
    'total_leads',
    'this_month_leads',
    'converted_leads',
    'lead_source',
    'total_calls',
    'total_opportunities',
    'total_meetings',
    'top_users',
    'Contact_mailing_list',
    'call_email',
    'total_campaign',
    'total_interaction',
    'today_lead',
    'leads_account_name',
    'campaign_status',
    'today_sales',
    'lead_by_source',
    'sales_this_month',
    'vendor_owner',
];
const renderTableHeadings = () => {
  switch (reportId) {
      case 'total_leads':
          return (
              <tr>
                  <th>Title</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
              </tr>
          );
      case 'this_month_leads':
          return (
              <tr>
                  <th>Attribute</th>
                  <th>Value</th>
              </tr>
          );
      case 'converted_leads':
          return (
              <tr>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th>Status</th>
              </tr>
          );
      // Add cases for other report types as needed
      default:
          return null;
  }
};

const renderReportRows = () => {
  if (!reportData || reportData.length === 0) {
      return (
          <tr>
              <td colSpan="4">No data available</td>
          </tr>
      );
  }

  switch (reportId) {
      case 'total_leads':
          return reportData.leads.map((lead, index) => (
              <tr key={index}>
                  <td>{lead.title}</td>
                  <td>{lead.first_name}</td>
                  <td>{lead.last_name}</td>
                  <td>{lead.email}</td>
              </tr>
          ));
      case 'this_month_leads':
          return (
              <tr>
                  <td>New Leads Count</td>
                  <td>{reportData.total_leads}</td>
              </tr>
          );
      case 'converted_leads':
          return reportData.leads.map((lead, index) => (
              <tr key={index}>
                  <td>{lead.first_name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.status}</td>
              </tr>
          ));
      // Add cases for other report types as needed
      default:
          return null;
  }
};


  
  
  
  


    const handleDownloadExcel = () => {
      const ws = XLSX.utils.json_to_sheet(reports);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "reports");
      XLSX.writeFile(wb, "reports.xlsx");
    };
  return (
    <div className='report-page'>
       <div className="report-sidebar1">
       <ul>
                    {reportListItems.map((item, index) => (
                        <li key={index} onClick={() => setReportId(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
    </div>
    <div className='report-merge-excel'>
    <div className="report_nav">
  <TopNavbar/>
</div>
<div className='report-excel'>
<div>
              <Dropdown>
                  <Dropdown.Toggle variant="primary" id="payments-dropdown6" className="excel-dropdown-menu6-report">
                    Excel File
                  </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to={`/bulk-import?model=${modelName}`} className="import-excel-btn5">
                      Import Excel
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <button onClick={handleDownloadExcel} className="excel-download-btn1">
                      Excel
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="createreport">
                <NavLink to={`/${tenantId}/reportform`} id="btn1"> +Create Report</NavLink>
              </div>
</div>
<div>
  <h1 className='report-head'>
    Reports
  </h1>
</div>

<div>
<table>
                    <thead>
                        {renderTableHeadings()}
                    </thead>
                    <tbody>
                    
                        {renderReportRows()}
                    
                  
                    </tbody>
                </table>
</div>
    </div>
    


    </div>
  )
}

export default Report
