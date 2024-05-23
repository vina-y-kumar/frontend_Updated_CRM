import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeadTable.css";
import axiosInstance from "../../../api";
const LeadTable = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/leads/');
        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
    fetchData();
}, []);

const getStatusColor = (status) => {
    switch (status) {
      case "in process":
        return "lightpink";
      case "converted":
        return "lightgreen";
      case "assigned":
        return "lightpurple";
      default:
        return "gray";
    }
  };

  const getCircleColor = (index) => {
    const colors = ["purple-circle", "blue-circle", "orange-circle", "red-circle", "green-circle"];
    return colors[index % colors.length];
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Account Name</th>
            <th>Email</th>
            <th>Enquiry Type</th>
            <th>Created on</th>
            <th>Status</th>
            <th>Assigned to</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={lead.id}>
                <td className="icon-cell">
                <div className={`icon ${getCircleColor(index)}`}>$</div>
              </td>
              <td className="name-cell">
                {`${lead.first_name} ${lead.last_name}`}
              </td>
              <td>{lead.account_name}</td>
              <td>{lead.email}</td>
              <td className="lead-enquiry">{lead.enquery_type}</td>
              <td>{new Date(lead.createdOn).toLocaleDateString()}</td>
              <td>
              <span className={`status-label ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
              </td>
              <td>{lead.assigned_to}</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;