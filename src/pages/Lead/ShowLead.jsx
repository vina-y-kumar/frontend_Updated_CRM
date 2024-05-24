import axios from "axios";
import React, { useEffect, useState } from "react";
import "./LeadPage.css";
import './ShowLead.css';
import { useParams, NavLink } from "react-router-dom";
import RelatedList1 from "./RelatedList1.jsx";
import ConvertLead from "./ConvertLead.jsx";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Sidebar } from "../../components/Sidebar";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import axiosInstance from "../../api.jsx";

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

  const { id } = useParams();
  const [met, setMet] = useState([]);
  
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
        </div>
        <div>
          <div className="arrow_container">
            {/* Your arrow content */}
            {/* Your arrow content */}
<div className="lead_display"> 
  <div className="lead_data_">
    <div className="lead_click">
      <DoneRoundedIcon style={{ width: '20px', height: '20px', fill: '#EEFDF3FF' }} />
    </div>
    <div>
      <h1 className="lead_headd">New Lead </h1>
    </div>
    <div className="half-arrow">
      <ArrowForwardIosRoundedIcon/>
    </div>
  </div>
  <div className="lead_data_">
    <div className="lead_click">
      <DoneRoundedIcon style={{ width: '20px', height: '20px', fill: '#EEFDF3FF' }} />
    </div>
    <div>
      <h1 className="lead_headd">Proposal </h1>
    </div>
    <div className="half-arrow">
      <ArrowForwardIosRoundedIcon/>
    </div>
  </div>
  {/* Add more arrow content as needed */}
  <div className="lead_data_">
    <div className="lead_click1">
    <div className="lead_number2">3</div>
    </div>
    <div>
      <h1 className="lead_headd">Negotiation </h1>
    </div>
    <div className="half-arrow">
      <ArrowForwardIosRoundedIcon/>
    </div>
  </div>
  <div className="lead_data_">
    <div className="lead_click2">
    <div className="lead_number">4</div>
    </div>
    <div>
      <h1 className="lead_headd">Contact Sent </h1>
    </div>
    <div className="half-arrow">
      <ArrowForwardIosRoundedIcon/>
    </div>
  </div>
  <div className="lead_data_">
    <div className="lead_click2">
    <div className="lead_number">5</div>
    </div>
    <div>
      <h1 className="lead_headd">Close</h1>
    </div>
    <div className="half-arrow">
      <ArrowForwardIosRoundedIcon/>
    </div>
  </div>
</div>

          </div>

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
  <div  className="general-lead-container">
    <div>
      <h1 className="lead_general_head">General info</h1>
      </div>
      <div>
      <div className="Lead_general_box">
       <div>
     <h1 className="head_Lead_">Lead Code</h1>  
       </div>
       <div className="lead_head_data">
        {showLead.first_name}
       </div>
      </div>
      <div className="Lead_general_box">
       <div>
     <h1 className="head_Lead_">Product Sample Business</h1>  
       </div>
       <div className="lead_head_data">
        {showLead.first_name}
       </div>
      </div>
      <div className="Lead_general_box">
       <div>
     <h1 className="head_Lead_">Client</h1>  
       </div>
       <div className="lead_head_data">
        {showLead.LeadName}
       </div>
      </div>
      <div className="Lead_general_box">
       <div>
     <h1 className="head_Lead_">Company</h1>  
       </div>
       <div className="lead_head_data">
        {showLead.company}
       </div>
      </div>
      <div className="Lead_general_box">
       <div>
     <h1 className="head_Lead_">Phone Number</h1>  
       </div>
       <div className="lead_head_data">
        {showLead.phone}
       </div>
      </div>
      <div className="Lead_general_box">
       <div>
     <h1 className="head_Lead_">Email</h1>  
       </div>
       <div className="lead_head_data">
        {showLead.email}
       </div>
      </div>
      <div className="Lead_general_box">
       <div>
     <h1 className="head_Lead_">Payment Method</h1>  
       </div>
       <div className="lead_head_data">
        {showLead.account_name}
       </div>
      </div>
      <div className="Lead_general_box">
       <div>
     <h1 className="head_Lead_">Currency</h1>  
       </div>
       <div className="lead_head_data">
        {showLead.website}
       </div>
      </div>
      <div className="Lead_general_box">
       <div >
     <h1 className="head_Lead_">Fax</h1>  
       </div>
       <div className="lead_head_data">
        {showLead.fax}
       </div>
      </div>
      <div className="Lead_general_box">
       <div>
     <h1 className="head_Lead_">Website</h1>  
       </div>
       <div className="lead_head_data">
        {showLead.website}
       </div>
      </div>
      </div>
     

  </div>
  <div>
    <div className="upcoming_lead_activity"></div>
    <div className="lead_score_activity"></div>
  </div>

</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowLead;
