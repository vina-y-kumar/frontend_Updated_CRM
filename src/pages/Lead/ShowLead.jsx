import axios from "axios";
import React, { useEffect, useState } from "react";
import "./LeadPage.css";
import { useParams, NavLink } from "react-router-dom";
import RelatedList1 from "./RelatedList1.jsx";
import ConvertLead from "./ConvertLead.jsx";
import axiosInstance from "../../api.jsx";
const ShowLead = () => {
  const [ShowLead, setShowLead] = useState({
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
      ...ShowLead,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddNote = (event) => {
    event.preventDefault();
    const newNote = {
      id: new Date().getTime(),
      text: ShowLead.Notes,
    };

    setShowLead({
      ...ShowLead,
      RecentNotes: [newNote, ...ShowLead.RecentNotes],
      Notes: "",
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://backendcrmnurenai.azurewebsites.net/leads/",

        ShowLead
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
    setShowLead(!ShowLead);
  };

  const handleConvert = () => {
    // Add logic here to handle conversion
    console.log("Lead converted");
  };
  return (
    <div>
      <div className="classs">
        <div className="buttonss">
          <div className="mail-icon-button">
            <button>Send Email</button>
          </div>
          <div>
            <NavLink to={`/convert/${id}`}>
              <button onClick={handleConvert}>Convert</button>
            </NavLink>
          </div>
          <div className="edit-button">
            <button>Edit</button>
          </div>
          <div className="dot-button">
            <button>...</button>
          </div>
        </div>
      </div>
      <div className="pages">
        <div>
          <RelatedList1 title="Related List" items={relatedListItems} />
        </div>
        <div className="blank-page">
          <div className="button-group">
            <button className="button-overview">Overview</button>
            <button className="button-timeline">Timeline</button>
          </div>
          <div className="info">
            <hr />
            <div className="para1">
              <p className="para">Lead Owner -{ShowLead.first_name}</p>

              <p className="para">Email - {ShowLead.email}</p>
              <p className="para">Phone -{ShowLead.phone}</p>
              <p className="para">mobile -{ShowLead.mobile}</p>
              <p className="para">Created By - {ShowLead.createdBy}</p>
              <p className="para">Organization - {ShowLead.account_name}</p>
            </div>
          </div>
          <div className="info">
            <div className="hidedetail">
              <button onClick={toggleAdditionalDetails}>
                {ShowLead ? "Hide Details" : "Show Details"}
              </button>
            </div>
            <hr />

            <div className="showdetails"></div>
            {ShowLead && (
              <div className="detail">
                <div className="add">
                  <div>
                    <p>Contact Owner - {ShowLead.first_name}</p>
                    <p>Account Name -{ShowLead.accountName}</p>
                    <p>Email -{ShowLead.email}</p>
                    <p>Lead Source - {ShowLead.LeadSource}</p>
                    <p>Zip Code -{ShowLead.ZipCode}</p>
                    <p>Country -{ShowLead.Country}</p>
                    <p>Description -{ShowLead.description}</p>
                  </div>

                  <div>
                    <p>Contact Name - {ShowLead.first_name}</p>
                    <p>Vendor Name -{ShowLead.vendorName}</p>
                    <p>Fax -{ShowLead.fax}</p>
                    <p>address -{ShowLead.address}</p>
                    <p>Street -{ShowLead.Street}</p>
                    <p>City -{ShowLead.City}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="info">
            <div className="notes-container">
              <div className="recent">
                <div className="notes">
                  <h1>Notes</h1>
                </div>

                <div>
                  <button className="recent-notes-button">Recent Last</button>

                  <ul className="recent-notes-list">
                    {/* {contactinfo.RecentNotes.map(note => (
                      <li key={note.id}>{note.text}</li>
                    ))} */}
                  </ul>
                </div>
              </div>

              <form onSubmit={handleAddNote}>
                <textarea
                  name="Notes"
                  value={ShowLead.Notes}
                  onChange={handleChange}
                  className="notes-textarea"
                  placeholder="add a note........"
                ></textarea>
                <button type="submit" className="add-note-button">
                  Add Note
                </button>
              </form>
            </div>
          </div>
          <div className="info">
            <p className="cadence"> Cadences </p>
            <hr />
            <div>
              <button onClick={() => setModalOpen1(true)}>Add Cadence</button>
            </div>
          </div>
          <div className="info">
            <div className="info1">
              <div className="heads">
                <p>Attachments</p>
              </div>
              <div className="attach">
                <select onChange={handleAttach}>
                  <option value="">Attach</option>

                  <option value="1">first Attach</option>
                  <option value="2">last Attach</option>
                </select>
              </div>
            </div>
          </div>
          <div className="info">
            <p> Deals</p>
            <div className="deal">
              <button>New Deal</button>
            </div>
          </div>
          <div className="info">
            <div className="actvities">
              <div>
                <p>Open Activities</p>
              </div>
              <div className="added">
                <select onChange={handleNew}>
                  <option value="">Add New</option>

                  <option value="1">Task</option>
                  <option value="2"> meeting </option>
                  <option value="3">call</option>
                </select>
              </div>
            </div>
          </div>
          <div className="info">
            <p>Closed Activities</p>
          </div>
          <div className="info">
            <p>Invite Meetings</p>
          </div>
          <div className="info">
            <p>Emails</p>
          </div>
          <div className="info">
            <p>Campaigns</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowLead;
