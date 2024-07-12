import React, { useState, useEffect } from 'react';
import './report.css';
import GraphPage from './GraphPage.jsx'; // Import the new GraphPage component
import axiosInstance from "../../api.jsx";
import TopNavbar from "../TopNavbar/TopNavbar.jsx";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "../../authContext";
import { Link } from 'react-router-dom';
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
  const [reportData, setReportData] = useState([]);
  const [reportId, setReportId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [donutChartData, setDonutChartData] = useState([]);
  const [funnelChartData, setFunnelChartData] = useState([]); // Add a new state for funnel chart data

  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d94a49', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const fetchReportData = async () => {
    if (reportId) {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/report/${reportId}/`);
        console.log('Response:', response);
        setReportData(response.data);

        let dataForChart = [];
        let barData = [];
        let funnelData = [];
        let donutData = [];

        if (Array.isArray(response.data)) {
          dataForChart = response.data;
          barData = response.data.map(item => ({ name: item.name, value: item.value }));
          funnelData = response.data.map(item => ({ name: item.name, value: item.value }));
          donutData = response.data.reduce((acc, item) => {
            const existingStage = acc.find(stage => stage.name === item.stage);
            if (existingStage) {
              existingStage.value += item.value;
            } else {
              acc.push({ name: item.stage, value: item.value });
            }
            return acc;
          }, []);
        } else if (typeof response.data === 'object') {
          dataForChart = Object.entries(response.data).map(([key, value]) => ({ name: key, value }));
          barData = dataForChart;
          funnelData = dataForChart;
          donutData = Object.entries(response.data).map(([stage, count]) => ({ name: stage, value: count }));
        }

        setChartData(dataForChart);
        setBarChartData(barData);
        setDonutChartData(donutData);
        setFunnelChartData(funnelData);
      } catch (error) {
        console.error('Error fetching report data:', error);
        setReportData([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

 
  useEffect(() => {
    fetchReportData();
  }, [reportId]); // Fetch data whenever reportId changes

  useEffect(() => {
    const fetchGenerateReportData = async () => {
      try {
        const response = await axiosInstance.get('https://webappbaackend.azurewebsites.net/generate-report/');
        console.log('Generate Report Response:', response);
        const { created_at, leads_amount, revenue, total_leads } = response.data;
        const formattedData = [
          { date: created_at, value: leads_amount },
          { date: created_at, value: revenue },
          { date: created_at, value: total_leads },
        ];
        setChartData(formattedData);
        setBarChartData(formattedData);
      } catch (error) {
        console.error('Error fetching generate report data:', error);
      }
    };

    fetchGenerateReportData();
  }, []);
  useEffect(() => {
    const fetchDonutChartData  = async () => {
      try {
        const response = await axiosInstance.get('/donut-chart/');
        console.log('Donut Chart Data Response:', response);
        const donutData = response.data.map(item => ({ name: item.name, value: item.value }));
        setDonutChartData(donutData);

      
      } catch (error) {
        console.error('Error fetching generate report data:', error);
      }
    };

    fetchDonutChartData();
  }, []);
 

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
            <th>Closed On</th>
            <th>Description</th>
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
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
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
      case 'sales this month':
        return (
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        );
      case 'top_users':
        return (
          <tr>
            <th>Date Joined</th>
            <th>ID</th>
            <th>Username</th>
          </tr>
        );
      case 'total_campaign':
        return (
          <tr>
            <th>Campaign Name</th>
            <th>Campaign Owner</th>
          </tr>
        );
      case 'total_interaction': // Ensure this matches exactly with your reportId case
        return (
          <tr>
            <th>ID</th>
            <th>Notes</th>
            <th>Entity Type</th>
          </tr>
        );

      case 'todays_leads': // Ensure this matches exactly with your reportId case
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

      case 'leads_account_name':
        return (
          <tr>
            <th>Created By</th>
            <th>Account Name</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        );
      case 'campaign_status':
        return (
          <tr>
            <th>Campaign Name</th>
            <th>Status</th>
          </tr>
        );
      case 'today_sales':
        return (
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Stage</th>
            <th>Probability</th>
            <th>Closed On</th>
            <th>Description</th>
          </tr>
        );
      case 'lead_by_source':
        return (
          <tr>
            <th>Lead Source</th>
            <th>Number of Leads</th>
          </tr>
        );
      case 'sales_this_month':
        return (
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        );
      case 'vendor_owner':
        return (
          <tr>
            <th>Vendor</th>
            <th>Owner</th>
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
          <td colSpan="3">No data available</td>
        </tr>
      );
    }
  
    switch (reportId) {
      case 'total_leads':
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
        if (!Array.isArray(reportData.opportunity) || reportData.opportunity.length === 0) {
          return (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          );
        }
        return reportData.opportunity.map((opportunity, index) => (
          <tr key={index}>
            <td>{opportunity.name || 'N/A'}</td>
            <td>{opportunity.amount || 'N/A'}</td>
            <td>{opportunity.stage_id || 'N/A'}</td>
            <td>{opportunity.probability || 'N/A'}</td>
            <td>{opportunity.closedOn || 'N/A'}</td>
            <td>{opportunity.description || 'N/A'}</td>
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
        if (!Array.isArray(reportData.Contacts) || reportData.Contacts.length === 0) {
          return (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          );
        }
        return reportData.Contacts.map((contact, index) => (
          <tr key={index}>
            <td>{contact.id || 'N/A'}</td>
            <td>{contact.first_name || 'N/A'}</td>
            <td>{contact.last_name || 'N/A'}</td>
            <td>{contact.address || 'N/A'}</td>
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
  
      case 'sales this month':
        return (
          <tr>
            <td>total_sales_this_month</td>
            <td>{reportData.total_sales_this_month ? reportData.total_sales_this_month : 'N/A'}</td>
          </tr>
        );
  
      case 'top_users':
        if (!Array.isArray(reportData.top_users) || reportData.top_users.length === 0) {
          return (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          );
        }
        return reportData.top_users.map((user, index) => (
          <tr key={index}>
            <td>{user.username || 'N/A'}</td>
            <td>{user.id || 'N/A'}</td>
            <td>{user.date_joined ? new Date(user.date_joined).toLocaleString() : 'N/A'}</td>
          </tr>
        ));
  
      case 'total_campaign':
        if (!Array.isArray(reportData.campaign) || reportData.campaign.length === 0) {
          return (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          );
        }
        return reportData.campaign.map((campaign, index) => (
          <tr key={index}>
            <td>{campaign.campaign_name || 'N/A'}</td>
            <td>{campaign.campaign_owner || 'N/A'}</td>
          </tr>
        ));
  
      case 'total_interaction':
        console.log('reportData in renderReportRows:', reportData);

  if (!reportData || !Array.isArray(reportData.interaction) || reportData.interaction.length === 0) {
    return (
      <tr>
        <td colSpan="3">No data available</td>
      </tr>
    );
  }

  return reportData.interaction.map((interaction, index) => (
    <tr key={index}>
      <td>{interaction.id}</td>
      <td>{interaction.notes}</td>
      <td>{interaction.entity_type}</td>
    </tr>
  ));
  case 'todays_leads':
      if (!Array.isArray(reportData.today_leads) || reportData.today_leads.length === 0) {
        return (
          <tr>
            <td colSpan="4">No data available</td>
          </tr>
        );
      }
      return reportData.today_leads.map((lead, index) => (
        <tr key={index}>
          <td>{lead.email || 'N/A'}</td>
          <td>{lead.phone || 'N/A'}</td>
          <td>{lead.source || 'N/A'}</td>
          <td>{lead.stage__status || 'N/A'}</td>
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

 const handleReportChange = (event) => {
    setReportId(event.target.value);
  };

    

  return (
    <div className="report-page">
      <div className="report-sidebar1">
      <div>
          <Link to={`../${tenantId}/home`} id='back-inter-report'>
            Back
          </Link>
        </div>
        <div  className="report-sidebar">
          <label htmlFor="reportId">Select Report</label>
          <select id="reportId" value={reportId} onChange={handleReportChange}>
            <option value="">-- Select --</option>
            <option value="total_leads">Total Leads</option>
            <option value="this_month_leads">This Month Leads</option>
            <option value="converted_leads">Converted Leads</option>
            <option value="lead_source">Lead Source</option>
            <option value="total_calls">Total Calls</option>
            <option value="total_opportunities">Total Opportunities</option>
            <option value="total_meetings">Total Meetings</option>
            <option value="Contact_mailing_list">Contact Mailing List</option>
            <option value="call_email_owner">Call and Email by Owner</option>
            <option value="leads_account_name">Leads Account Name</option>
            <option value="campaign_status">Campaign Status</option>
            <option value="today_sales">Today's Sales</option>
            <option value="lead_by_source">Lead by Source</option>
            <option value="sales_this_month">Sales This Month</option>
            <option value="vendor_owner">Vendor and Owner</option>
          </select>
        </div>
      </div>
       <div>

       <div className="report_nav">
          <TopNavbar />
        </div>
        <div className="report-content">
        <GraphPage
          chartData={chartData}
          barChartData={barChartData}
          donutChartData={donutChartData}
          reportId={reportId}
        />

        <table  className='report-table'>
          <thead>{renderTableHeadings()}</thead>
          <tbody>{renderReportRows()}</tbody>
        </table>
      </div>
       </div>
      

     
    </div>
  );
}

export default Report;
