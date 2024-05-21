import React, { useEffect, useState } from "react";

import { Sidebar } from "../../components/Sidebar";
import { OpportunitiesContent } from "../../components/OpportunitiesContent";
import "./Form3.jsx";
import { NavLink,Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import * as XLSX from "xlsx";
import axiosInstance from "../../api.jsx";

export const Opportunities = () => {
  const { pathname } = useLocation();
  const tenantId = getTenantIdFromUrl();


  function getTenantIdFromUrl() {
    const pathArray = pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null; // Return null if tenant ID is not found or not in the expected place
  }
 
  const [oppourtunity, setOppourtunity] = useState([]);

  useEffect(() => {
    fetchOppourtunity();
  }, []);

  const fetchOppourtunity = async () => {
    try {
      const response = await axiosInstance.get('/opportunities/');
      setOppourtunity(response.data);
      console.log('Opportunity fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(oppourtunity);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "opportunity");
    XLSX.writeFile(wb, "opportunity.xlsx");
  };
  const handleRecords = (event) => {
    console.log("Records per page: ", event.target.value);
  };
  const renderStageCellStyle = (stage) => {
    let className = "stage-cell";
    switch (stage) {
      case "Need analysis":
        className += " need-analysis";
        break;
      case "Closed":
        className += " closed";
        break;
      case "Progressing":
        className += " progressing";
        break;
      case "Close as won":
        className += " close-as-won";
        break;
      default:
        break;
    }
    return className;
  };

  return (
    <div className="opportunities-container">
      <div className="opportunities-sidebar">
        <Sidebar />
      </div>
      <div className="opportunities-content">
        <div className="opportunities-header">
          <h1 className="opportunities-heading">Opportunities</h1>
          <div className="opportunities-actions">
            <div className="opportunity_excel">
            <Dropdown>
              <Dropdown.Toggle variant="primary22" id="payments-dropdown9">
                Excel File
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to={`/bulk-import?model=opportunity`}>
                    Import Excel
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button onClick={handleDownloadExcel}>Download Excel</button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </div>
            <div className="create2">

            <NavLink to={`/${tenantId}/opportunity`} id="btn3">

                        {" "}
                  Create Oppourtunity
                  </NavLink>
            </div>
          </div>
        </div>

        <div>
        <select className="view-mode-select_oppo" onChange={handleRecords}>
            <option value="">50 Records per page</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </div>
        <div className="opportunities-table">
          <table>
            <thead className="oppo_table_row">
              <tr>
                <th>Contact Name</th>
                <th>Account</th>
                <th>Stage</th>
                <th>Created By</th>
                <th>Contacts</th>
                <th>Closed on</th>
                <th>Closed by</th>
              </tr>
            </thead>
            <tbody>
              {oppourtunity.map((opportunity) => (
                <tr key={opportunity.id}>
                  <td className="row_oppo_name">{opportunity.name}</td>
                  <td className="row_oppo_account">{opportunity.account}</td>
                  <td className={renderStageCellStyle(opportunity.stage)}>
                    {opportunity.stage}
                  </td>
                  <td className="row_oppo_created">{opportunity.createdBy}</td>
                  <td className="row_oppo_contact">{opportunity.contacts}</td>
                  <td className="row_oopo_closedon">{opportunity.closedOn}</td>
                  <td className="row_oopo_cloesd">{opportunity.closedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
