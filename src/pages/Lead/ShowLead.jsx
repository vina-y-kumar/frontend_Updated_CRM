import axios from "axios";
import React, { useEffect, useState } from "react";
import "./LeadPage.css";
import './ShowLead.css';
import { useParams, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import RelatedList1 from "./RelatedList1.jsx";
import ConvertLead from "./ConvertLead.jsx";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Sidebar } from "../../components/Sidebar";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import axiosInstance from "../../api.jsx";
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import ViewArrayRoundedIcon from '@mui/icons-material/ViewArrayRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import BrowseGalleryRoundedIcon from '@mui/icons-material/BrowseGalleryRounded';
import Chart from "chart.js/auto"; // Import Chart.js library
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';


const getTenantIdFromUrl = () => {
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; 
};


const ShowLead = () => {
  const [showLead, setShowLead] = useState({
    first_name: "",
    email: "",
    phone: "",
    mobile: "",
    LeadStatus: "",
    account_name: "",
    title: "",
    company: "",
    LeadName: "",
    fax: "",
    LeadSource: "",
    website: "",
    modifiedBy: "",
    createdBy: "",
    Street: "",
    City: "",
    State: "",
    Country: "",
    ZipCode: "",
    description: "",
  });
  const tenantId=getTenantIdFromUrl();
  const { id } = useParams();
  const [met, setMet] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [editedLead, setEditedLead] = useState({});
  const [timeline, setTimeline] = useState([]); // New state variable for timeline data
  const [showTimeline, setShowTimeline] = useState(false); 


  useEffect(() => {
    const fetchformData = async () => {
      try {
        const response = await axiosInstance.get(`/leads/${id}`);
        setShowLead(response.data);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };
    fetchformData();
  }, [id]);
  useEffect(() => {
    const ctx = document.getElementById("leadScoreChart1").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Lead Score", " "],
        datasets: [
          {
            label: "Lead Score",
            data: [80, 20],
            backgroundColor: ["#4CAF50", "lightgrey"], // Set the permanent background color here
            borderWidth: [0, 0],
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        cutout: "70%",
      },
    });
  }, []);
  

  const relatedListItems = [
    "Notes",
    "Cadences",
    "Attachments",
    "Deals",
    "Open Activities",
    "Closed Activities",
    "Invited Meetings",
    "Products",
    "Cases",
    "Quotes",
    "Sales Orders",
    "Purchase Orders",
    "Emails",
    "Invoices",
  ];

  const handleChange = (event) => {
    setShowLead({
      ...showLead,
      [event.target.name]: event.target.value,
    });
    setEditedValues({
      ...editedValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddNote = (event) => {
    event.preventDefault();
    const newNote = {
      id: new Date().getTime(),
      text: showLead.Notes,
    };

    setShowLead({
      ...showLead,
      RecentNotes: [newNote, ...showLead.RecentNotes],
      Notes: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://backendcrmnurenai.azurewebsites.net/leads/",
        showLead
      );
      console.log("ShowLead Information submitted :", response.data);
      setShowLead({
        first_name: "",
        email: "",
        phone: "",
        mobile: "",
        LeadStatus: "",
        title: "",
        account_name: "",
        company: "",
        LeadName: "",
        fax: "",
        LeadSource: "",
        website: "",
        modifiedBy: "",
        createdBy: "",
        Street: "",
        City: "",
        State: "",
        Country: "",
        ZipCode: "",
        description: "",
      });
    } catch (error) {
      console.error("Error In ShowLead Information:", error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.patch(`/leads/${id}`, editedLead); // Use editedLead instead of editedValues
      console.log("ShowLead Information submitted :", response.data);
      setShowLead(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error In ShowLead Information:", error);
    }
    setIsEditing(false);
  };

  const handleAttach = () => {
    console.log("Attach happened");
  };

  const handleNew = () => {
    console.log("Add New happened");
  };

  const toggleAdditionalDetails = () => {
    setShowLead(!showLead);
  };

  const handleConvert = () => {
    // Add logic here to handle conversion
    console.log("Lead converted");
  };

  const handleEdit = () => {
    setEditedLead({ ...showLead });
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };
  const fetchTimeline = async () => {
    try {
      const response = await axiosInstance.get(`/return-interaction/9/${id}/`);
      setTimeline(response.data.interactions); // Set the timeline with interactions array
      console.log('Timeline data fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching timeline data:', error);
    }
  };
  const toggleTimeline = async () => {
    setShowTimeline(prevShowTimeline => !prevShowTimeline);
    if (!showTimeline && timeline.length === 0) { // Check if timeline is empty
      await fetchTimeline();
    }
  };
  

  return (
    <div className="container1">
      <div className="side_lead">
      <Sidebar />
      </div>
     
      <div className="head_lead_information">
        <div className="arrow_head">
          <div className="arrow_lead">
            <ArrowForwardRoundedIcon />
          </div>
          <div>
            <h1 className="lead_info">Lead details</h1>
          </div>
          <button className="timeline-button-lead" onClick={toggleTimeline}>
            {showTimeline ? 'Hide Timeline' : 'Show Timeline'}
          </button>
          <Link to={`/${tenantId}/convert/${id}`} className="convert-lead-button">
      Convert Lead
    </Link>
        </div>
        <div>
          <div className="arrow_container">
           

<div className="lead_display"> 
  <NavLink to="/new-lead" className="lead_data_">
    <div className="lead_click">
      <DoneRoundedIcon style={{ width: '20px', height: '20px', fill: '#EEFDF3FF' }} />
    </div>
    <div>
      <h1 className="lead_headd">New Lead </h1>
    </div>
    <div className="half-arrow">
      <ArrowForwardIosRoundedIcon/>
    </div>
  </NavLink>
  <NavLink to="/proposal" className="lead_data_">
    <div className="lead_click">
      <DoneRoundedIcon style={{ width: '20px', height: '20px', fill: '#EEFDF3FF' }} />
    </div>
    <div>
      <h1 className="lead_headd">Proposal </h1>
    </div>
    <div className="half-arrow">
      <ArrowForwardIosRoundedIcon/>
    </div>
  </NavLink>
  <NavLink to="/negotiation" className="lead_data_">
    <div className="lead_click1">
      <div className="lead_number2">3</div>
    </div>
    <div>
      <h1 className="lead_headd">Negotiation </h1>
    </div>
    <div className="half-arrow">
      <ArrowForwardIosRoundedIcon/>
    </div>
  </NavLink>
  <NavLink to="/contact-sent" className="lead_data_">
    <div className="lead_click2">
      <div className="lead_number">4</div>
    </div>
    <div>
      <h1 className="lead_headd">Contact Sent</h1>
    </div>
    <div className="half-arrow">
      <ArrowForwardIosRoundedIcon/>
    </div>
  </NavLink>
  <NavLink to="/close" className="lead_data_">
    <div className="lead_click2">
      <div className="lead_number">5</div>
    </div>
    <div>
      <h1 className="lead_headd">Close</h1>
    </div>
    <div className="half-arrow">
      <ArrowForwardIosRoundedIcon/>
    </div>
  </NavLink>
</div>



          </div>
<div>
{!showTimeline && (

<div>
        <div className="lead_info_container">
          <div className="lead_info_container-data">
          <div>
    <div><h1 className="lead_title-info">TITLE</h1></div>
    <div className="lead_title-infovalue">{showLead.title}</div>

  </div>
  <div>
    <div><h1 className="lead_title-info">EST REVENUE</h1></div>
    <div className="lead_title-infovalue">{showLead.LeadSource}</div>

  </div>
  <div>
    <div><h1 className="lead_title-info">PRODUCT</h1></div>
    <div className="lead_title-infovalue">{showLead.LeadName}</div>

  </div>
  <div>
    <div><h1 className="lead_title-info">Est.CLOSE Date </h1></div>
    <div className="lead_title-infovalue">{showLead.website}</div>

  </div>
          </div>
          </div>
          
          <div>
          <div className='lead-headings'>
  <div className="task_lead_head">
    <div className="sum_header">
      <button>Summary</button>
    </div>
    <div className="sum_header">
      <button>TaskList</button>
    </div>
    <div className="sum_header">
      <button>Dealanalysis</button>
    </div>
    <div className="sum_header">
      <button>Activitieslog</button>
    </div>
  </div>
</div>

<div className="big-lead-container">
      <div className="general-lead-container">
        <div>
          <h1 className="lead_general_head">General info</h1>
          <div className="lead-button">
            <button className="lead-button" onClick={handleEdit} disabled={isEditing}>Edit</button>
            {isEditing && (
              <>
                <button className="lead-save-button" onClick={handleSave}>Save</button>
                <button className="lead-cancel-button" onClick={handleCancel}>Cancel</button>
              </>
            )}
          </div>
        </div>
        <div>
          <div className="Lead_general_box">
            <div>
              <h1 className="head_Lead_">
                <NewspaperRoundedIcon style={{ width: '24px', height: '24px', marginRight: '20px', fill: '#6D31EDFF' }} />
                Lead Code
              </h1>
            </div>
            <div className="lead_head_data">
              {isEditing ? (
                <input
                  type="text"
                  name="first_name"
                  value={editedLead.first_name}
                  onChange={handleChange}
                />
              ) : (
                showLead.first_name
              )}
            </div>
          </div>
          <div className="Lead_general_box">
            <div>
              <h1 className="head_Lead_">
                <LocalOfferRoundedIcon style={{ width: '24px', height: '24px', marginRight: '20px', fill: '#6D31EDFF' }} />
                Product Sample Business
              </h1>
            </div>
            <div className="lead_head_data">
              {isEditing ? (
                <input
                  type="text"
                  name="productSampleBusiness"
                  value={editedLead.productSampleBusiness}
                  onChange={handleChange}
                />
              ) : (
                showLead.productSampleBusiness
              )}
            </div>
          </div>
          <div className="Lead_general_box">
            <div>
              <h1 className="head_Lead_">
                <Groups2RoundedIcon style={{ width: '24px', height: '24px', marginRight: '20px', fill: '#6D31EDFF' }} />
                Client
              </h1>
            </div>
            <div className="lead_head_data">
              {isEditing ? (
                <input
                  type="text"
                  name="client"
                  value={editedLead.client}
                  onChange={handleChange}
                />
              ) : (
                showLead.client
              )}
            </div>
          </div>
          <div className="Lead_general_box">
            <div>
              <h1 className="head_Lead_">
                <StoreRoundedIcon style={{ width: '24px', height: '24px', marginRight: '20px', fill: '#6D31EDFF' }} />
                Company
              </h1>
            </div>
            <div className="lead_head_data">
              {isEditing ? (
                <input
                  type="text"
                  name="company"
                  value={editedLead.company}
                  onChange={handleChange}
                />
              ) : (
                showLead.company
              )}
            </div>
          </div>
          <div className="Lead_general_box">
            <div>
              <h1 className="head_Lead_">
                <LocalPhoneRoundedIcon style={{ width: '24px', height: '24px', marginRight: '20px', fill: '#6D31EDFF' }} />
                Phone Number
              </h1>
            </div>
            <div className="lead_head_data" style={{ color: '#379AE6FF' }}>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={editedLead.phone}
                  onChange={handleChange}
                />
              ) : (
                showLead.phone
              )}
            </div>
          </div>
          <div className="Lead_general_box">
            <div>
              <h1 className="head_Lead_">
                <AlternateEmailRoundedIcon style={{ width: '24px', height: '24px', marginRight: '20px', fill: '#6D31EDFF' }} />
                Email
              </h1>
            </div>
            <div className="lead_head_data" style={{ color: '#379AE6FF' }}>
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={editedLead.email}
                  onChange={handleChange}
                />
              ) : (
                showLead.email
              )}
            </div>
          </div>
          <div className="Lead_general_box">
            <div>
              <h1 className="head_Lead_">
                <CreditCardRoundedIcon style={{ width: '24px', height: '24px', marginRight: '20px', fill: '#6D31EDFF' }} />
                Payment Method
              </h1>
            </div>
            <div className="lead_head_data">
              {isEditing ? (
                <input
                  type="text"
                  name="paymentMethod"
                  value={editedLead.paymentMethod}
                  onChange={handleChange}
                />
              ) : (
                showLead.paymentMethod
              )}
            </div>
          </div>
          <div className="Lead_general_box">
            <div>
              <h1 className="head_Lead_">
                <PaymentsRoundedIcon style={{ width: '24px', height: '24px', marginRight: '20px', fill: '#6D31EDFF' }} />
                Currency
              </h1>
            </div>
            <div className="lead_head_data">
              {isEditing ? (
                <input
                  type="text"
                  name="currency"
                  value={editedLead.currency}
                  onChange={handleChange}
                />
              ) : (
                showLead.currency
              )}
            </div>
          </div>
          <div className="Lead_general_box">
            <div>
              <h1 className="head_Lead_">
                <LocalPrintshopRoundedIcon style={{ width: '24px', height: '24px', marginRight: '20px', fill: '#6D31EDFF' }} />
                Fax
              </h1>
            </div>
            <div className="lead_head_data">
              {isEditing ? (
                <input
                  type="text"
                  name="fax"
                  value={editedLead.fax}
                  onChange={handleChange}
                />
              ) : (
                showLead.fax
              )}
            </div>
          </div>
          <div className="Lead_general_box">
            <div>
              <h1 className="head_Lead_">
                <ViewArrayRoundedIcon style={{ width: '24px', height: '24px', marginRight: '20px', fill: '#6D31EDFF' }} />
                Website
              </h1>
            </div>
            <div className="lead_head_data" style={{ color: '#379AE6FF' }}>
              {isEditing ? (
                <input
                  type="text"
                  name="website"
                  value={editedLead.website}
                  onChange={handleChange}
                />
              ) : (
                showLead.website
              )}
            </div>
          </div>
          </div>
     

  </div>
  <div>
    <div className="upcoming_lead_activity">
      <div>
        <h1 className="lead_general_head">
          Upcoming activities
        </h1>
      </div>
      <div className="small_lead_container">
  <div>
    <h1 className="lead_today"> Today</h1>
  </div>
  <div className="lead_Internal_container"> {/* Container for Internal preparation meeting and lead_Internal_data */}
    <h1 className="lead_Internal"> Internal preparation meeting</h1>
    <div className="lead_Internal_data"> {/* Nested container for lead_Internal_data */}
      <BrowseGalleryRoundedIcon style={{width: '24px', height: '24px', marginRight: '20px', fill: 'grey' }}/>
      <span>08:00-09:00</span>
    </div>
  </div>
 
</div>


      <div className="small_lead_container1">
      <div>
    <h1 className="lead_today1"> Sep30,2022</h1>
  </div>
  <div className="lead_Internal_container"> {/* Container for Internal preparation meeting and lead_Internal_data */}
    <h1 className="lead_Internal"> External meeting - Negotiation</h1>
    <div className="lead_Internal_data"> {/* Nested container for lead_Internal_data */}
      <BrowseGalleryRoundedIcon style={{width: '24px', height: '24px', marginRight: '20px', fill: 'grey' }}/>
      <span>08:00-09:00</span>
    </div>
  </div>
      </div>

    </div>
    <div className="lead_score_activity">
     
  <h1 className="lead_general_head">Lead Score </h1>
  <div className="lead-data-chart">
  <canvas id="leadScoreChart1" className="chart-canvas"></canvas>
  <div  className = 'lead_num 'style={{ fontFamily: 'Lexend', fontSize: '24px', lineHeight: '36px', fontWeight: 700, color: '#1DD75BFF', display: 'flex', alignItems: 'center' }}>
    <ShowChartIcon style={{ width: '24px', height: '24px' }} />
    80%
  </div>
  <div className="lead_data_list">
  <ul >
    <li className='lead_data_list_data '>Country/Region:UK</li>
    <li className='lead_data_list_data '>Job Title:Manager</li>
    <li className='lead_data_list_data '>ReturningOpportunity</li>
    <li className='lead_data_list_data '>Est. Close Date:10</li>
    <li className='lead_data_list_data '>Accept DemoMeeting</li>
  </ul>
</div>

  </div>
  
</div>


  </div>

</div>
          </div>
        </div>
)}
        {showTimeline && timeline.length > 0 && (
  <div className="timeline-lead">
    <div className='timeline-btn-lead'>
      <button className='timeline-btn1-lead'>Deals</button>
      <button className='timeline-btn2-lead'>Messages</button>
      <button className='timeline-btn3-lead'>Schedule</button>
      <button className='timeline-btn4-lead'>Activity Log </button>
    </div>
    <ul>
      {timeline.map((interaction, index) => (
        <li className='timeline-oopo1-lead' key={index} >
        <div>
        <div className='data-timeline-lead'>
            <p className='textdesign-lead'>  <TextSnippetRoundedIcon style={{height:'40px',width:'30px',fill:'#F9623EFF',marginLeft:'7px'  }}/>   </p>
            <h1 className='contract-lead'>Signed Contract</h1>
          </div>
          <div className='dotted-line'></div>

        
          <div className='timeline_data1-lead'>
          {interaction.interaction_type}

          </div>
        </div>

         <div className='time-box2-lead'>
         <div className='data-timeline-lead'>
            <p className='textdesign1-lead'>  <CallRoundedIcon style={{height:'40px',width:'30px',fill:'#6D31EDFF',marginLeft:'7px'  }}/>   </p>
            <h1 className='contract-lead'>Made Call</h1>
          </div>
          <div className='timeline_data1-lead'>
          {interaction.datetime}

          </div>
         </div>
         <div className='dotted-line'></div>

         <div className='time-box2-lead'>
         <div className='data-timeline-lead'>
            <p className='textdesign1-lead'>  <FactCheckRoundedIcon style={{height:'40px',width:'30px',fill:'#3D31EDFF',marginLeft:'7px'  }}/>   </p>
            <h1 className='contract-lead'>Sent email</h1>
          </div>
          <div className='timeline_data1-lead'>
          {interaction.datetime}

          </div>
         </div>
         <div className='dotted-line'></div>

         <div className='time-box2-lead'>
         <div className='data-timeline-lead'>
            <p className='textdesign1-lead'>  <MailOutlineRoundedIcon style={{height:'40px',width:'30px',fill:'#FF56A5FF',marginLeft:'7px'  }}/>   </p>
            <h1 className='contract-lead'>Called</h1>
          </div>
          <div className='timeline_data1-lead'>
          {interaction.interaction_type}

          </div>
         </div>
        </li>
      ))}
    </ul>
  </div>
)}
</div>
       
        </div>
      </div>
    </div>
  );
};

export default ShowLead;