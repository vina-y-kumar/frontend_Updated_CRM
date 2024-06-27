

import React, { useState, useEffect } from 'react';
import './report.css';
import axiosInstance from "../../api.jsx";
import TopNavbar from "../TopNavbar/TopNavbar.jsx";

import { Dropdown } from "react-bootstrap";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Line,
  BarChart,
  Bar,
  LabelList,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from "../../authContext";
import { Link, NavLink } from 'react-router-dom';
import CustomTooltip from './CustomTooltip'; // Import the custom tooltip component

const getTenantIdFromUrl = () => {
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1];
  }
  return null;
};

const Report = () => {
  const { userRole } = useAuth(); // Destructure userRole from useAuth hook

  const tenantId = getTenantIdFromUrl();
  const modelName = "reports";
  const [reportData, setReportData] = useState([]);
  const [reportId, setReportId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [donutChartData, setDonutChartData] = useState([]);
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d94a49', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchReportData = async () => {
      if (reportId) {
        setIsLoading(true);
        try {
          const response = await axiosInstance.get(`/report/${reportId}/`);
          console.log('Response:', response);
          setReportData(response.data);

          let dataForChart = [];
          let barData = [];

          if (Array.isArray(response.data)) {
            dataForChart = response.data;
            barData = response.data.map(item => ({
              name: item.name,
              value: item.value
            }));
          } else if (typeof response.data === 'object') {
            dataForChart = Object.entries(response.data).map(([key, value]) => ({
              name: key,
              value: value
            }));
            barData = Object.entries(response.data).map(([key, value]) => ({
              name: key,
              value: value
            }));
          }

          setChartData(dataForChart);
          setBarChartData(barData);
          setDonutChartData(formatDonutChartData(barData)); // Format data for donut chart
        } catch (error) {
          console.error('Error fetching report data:', error);
          setReportData([]);
        } finally {
          setIsLoading(false);
        }
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
            <th>Email</th>
            <th>Created On</th>
            <th>Title</th>
            <th>Created By</th>
            <th>First Name</th>
            <th>Last Name</th>
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
      case 'lead_source':
        return (
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Account Name</th>
            <th>Source</th>
          </tr>
        );
      case 'total_calls':
        return (
          <tr>
            <th>Related To</th>
            <th>Call Type</th>
            <th>Outgoing Status</th>
          </tr>
        );
      case 'total_opportunities':
        return (
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Stage</th>
            <th>Probability</th>
          </tr>
        );
      case 'total_meetings':
        return (
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Related To</th>
            <th>Location</th>
            <th>From Time</th>
            <th>To Time</th>
          </tr>
        );
      case 'Contact_mailing_list':
        return (
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        );
      case 'call_email':
        return (
          <tr>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        );
      default:
        return null;
    }
  };

  const renderReportRows = () => {
    console.log('reportData:', reportData);
    console.log('reportId:', reportId);

    if (!reportData) {
      return (
        <tr>
          <td colSpan="6">No data available</td>
        </tr>
      );
    }

    switch (reportId) {
      case 'total_leads':
        console.log('Rendering total_leads:', reportData.leads);
        if (!Array.isArray(reportData.leads) || reportData.leads.length === 0) {
          return (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          );
        }
        return reportData.leads.map((lead, index) => (
          <tr key={index}>
            <td>{lead.email || 'N/A'}</td>
            <td>{lead.createdOn || 'N/A'}</td>
            <td>{lead.title || 'N/A'}</td>
            <td>{lead.createdBy || 'N/A'}</td>
            <td>{lead.first_name || 'N/A'}</td>
            <td>{lead.last_name || 'N/A'}</td>
          </tr>
        ));

      case 'this_month_leads':
        return (
          <tr>
            <td>New Leads Count</td>
            <td>{reportData.total_leads ? reportData.total_leads : 'N/A'}</td>
          </tr>
        );

      case 'converted_leads':
        if (typeof reportData !== 'object' || !reportData || !reportData.first_name) {
          return (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          );
        }
        return (
          <tr>
            <td>{reportData.first_name || 'N/A'}</td>
            <td>{reportData.phone || 'N/A'}</td>
            <td>{reportData.status || 'N/A'}</td>
          </tr>
        );

      case 'lead_source':
        if (!Array.isArray(reportData.source) || reportData.source.length === 0) {
          return (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          );
        }
        return reportData.source.map((lead, index) => (
          <tr key={index}>
            <td>{lead.first_name || 'N/A'}</td>
            <td>{lead.last_name || 'N/A'}</td>
            <td>{lead.email || 'N/A'}</td>
            <td>{lead.account_name || 'N/A'}</td>
            <td>{lead.source || 'N/A'}</td>
          </tr>
        ));

      case 'total_calls':
        if (!Array.isArray(reportData.calls) || reportData.calls.length === 0) {
          return (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          );
        }
        return reportData.calls.map((call, index) => (
          <tr key={index}>
            <td>{call.related_to || 'N/A'}</td>
            <td>{call.call_type || 'N/A'}</td>
            <td>{call.outgoing_status || 'N/A'}</td>
          </tr>
        ));

      case 'total_opportunities':
        if (!Array.isArray(reportData.opportunities) || reportData.opportunities.length === 0) {
          return (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          );
        }
        return reportData.opportunities.map((opportunity, index) => (
          <tr key={index}>
            <td>{opportunity.name || 'N/A'}</td>
            <td>{opportunity.amount || 'N/A'}</td>
            <td>{opportunity.stage || 'N/A'}</td>
            <td>{opportunity.probability || 'N/A'}</td>
          </tr>
        ));

      case 'total_meetings':
        if (!Array.isArray(reportData.meetings) || reportData.meetings.length === 0) {
          return (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          );
        }
        return reportData.meetings.map((meeting, index) => (
          <tr key={index}>
            <td>{meeting.title || 'N/A'}</td>
            <td>{meeting.description || 'N/A'}</td>
            <td>{meeting.related_to || 'N/A'}</td>
            <td>{meeting.location || 'N/A'}</td>
            <td>{meeting.from_time || 'N/A'}</td>
            <td>{meeting.to_time || 'N/A'}</td>
          </tr>
        ));

      case 'Contact_mailing_list':
        if (!Array.isArray(reportData.contacts) || reportData.contacts.length === 0) {
          return (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          );
        }
        return reportData.contacts.map((contact, index) => (
          <tr key={index}>
            <td>{contact.first_name || 'N/A'}</td>
            <td>{contact.last_name || 'N/A'}</td>
          </tr>
        ));

      case 'call_email':
        if (!Array.isArray(reportData.emails) || reportData.emails.length === 0) {
          return (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          );
        }
        return reportData.emails.map((email, index) => (
          <tr key={index}>
            <td>{email.address || 'N/A'}</td>
            <td>{email.email || 'N/A'}</td>
            <td>{email.phone || 'N/A'}</td>
          </tr>
        ));

      default:
        return (
          <tr>
            <td colSpan="6">No data available</td>
          </tr>
        );
    }
  };

  const renderChart = () => {
    switch (reportId) {
      case 'total_leads':
      case 'converted_leads':
      case 'lead_source':
      case 'total_calls':
      case 'total_opportunities':
      case 'total_meetings':
      case 'Contact_mailing_list':
      case 'call_email':
      case 'campaign_status':
      case 'today_sales':
      case 'lead_by_source':
      case 'sales_this_month':
      case 'vendor_owner':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'this_month_leads':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                <LabelList dataKey="value" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'total_campaign':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={donutChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {donutChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const formatDonutChartData = (data) => {
    return data.map((item) => ({
      name: item.name,
      value: item.value
    }));
  };

  return (
    <>
      <TopNavbar />

      <div className="main-content">
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/${tenantId}`} className="nav-link">
                Main /&nbsp;
              </NavLink>
            </li>
            <li className="nav-item">
              <Link to={`/${tenantId}/reports`} className="nav-link">
                Report /&nbsp;
              </Link>
            </li>
          </ul>
        </nav>

        <div className="report-container">
          <div className="report-sidebar">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select Report
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {reportListItems.map((item, index) => (
                  <Dropdown.Item key={index} onClick={() => setReportId(item)}>
                    {item.replace(/_/g, ' ')}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="report-content">
            <div className="report-table">
              <table>
                <thead>{renderTableHeadings()}</thead>
                <tbody>{renderReportRows()}</tbody>
              </table>
            </div>

            <div className="report-chart">
              {renderChart()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;


