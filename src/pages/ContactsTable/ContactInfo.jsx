import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";
import RelatedList from "./RelatedList.jsx";
import "./contactsTable.css";
import "./index.jsx";
const ContactInfo = () => {
  // const [showCadence, setShowCadence] = useState(false);
  const handleAddCadence = () => {
    setShowCadence(true);
  };

  const [contactinfo, setContactInfo] = useState({
    first_name: "",
    ContactName: "",
    email: "",
    emailOptOut: "",
    phone: "",
    address: "",
    account: "",
    title: "",
    leadSource: "",
    accountName: "",
    vendorName: "",
    HomePhone: "",
    Fax: "",
    DateOfBirth: "",
    AsstPhone: "",
    SkypeId: "",
    ModifiedBy: "",
    Currency1: "",
    Twitter: "",
    MailingStreet: "",
    secondaryEmail: "",
    MailingCity: "",
    MailingState: "",
    MailingZip: "",
    MailingCountry: "",
    OtherStreet: "",
    OtherCity: "",
    OtherState: "",
    OtherPhone: "",
    OtherZip: "",
    OtherCountry: "",
    Notes: "",
    AddCadence: "",
    assistant: "",
    Description: "",
    RecentNotes: [],
    CadenceName: "",
    Modules: "",
    CreatedDate: "",
    createdBy: "",
  });
  const { id } = useParams(); // Get the account ID from the URL parameter

  const [meetings, setMeetings] = useState([]);
  // const [modalOpen1, setModalOpen1] = useState(false);
  useEffect(() => {
    const fetchcontactData = async () => {
      try {
        const response = await axios.get(
          `https://backendcrmnurenai.azurewebsites.net/contacts/${id}`
        );
        setContactInfo(response.data);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchcontactData();
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
    setContactInfo({
      ...contactinfo,
      [event.target.name]: event.target.value,
    });
  };
  const handleAddNote = (event) => {
    event.preventDefault();
    const newNote = {
      id: new Date().getTime(),
      text: contactinfo.Notes,
    };

    setContactInfo({
      ...contactinfo,
      RecentNotes: [newNote, ...contactinfo.RecentNotes],
      Notes: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://backendcrmnurenai.azurewebsites.net/contacts/",
        contactinfo
      );
      console.log("contact Information submitted :", response.data);
      setContactInfo({
        first_name: "",
        ContactName: "",
        email: "",
        emailOptOut: "",
        phone: "",
        address: "",
        account: "",
        title: "",
        leadSource: "",
        accountName: "",
        vendorName: "",
        HomePhone: "",
        Fax: "",
        DateOfBirth: "",
        AsstPhone: "",
        SkypeId: "",
        ModifiedBy: "",
        Currency1: "",
        Twitter: "",
        MailingStreet: "",
        secondaryEmail: "",
        MailingCity: "",
        MailingState: "",
        MailingZip: "",
        MailingCountry: "",
        OtherStreet: "",
        OtherCity: "",
        OtherState: "",
        OtherZip: "",
        OtherCountry: "",
        OtherPhone: "",
        Notes: "",
        AddCadence: "",
        assistant: "",

        Description: "",
        RecentNotes: [],
        CadenceName: "",
        Modules: "",
        CreatedDate: "",
        createdBy: "",
      });
    } catch (error) {
      console.error("Error In contact Information:", error);
    }
  };
  const handleAttach = () => {
    console.log("Attach happened");
  };
  const handleNew = () => {
    console.log("Add New happened");
  };

  const toggleAdditionalDetails = () => {
    setContactInfo(!contactinfo);
  };

  const handleAddMeeting = (event) => {
    event.preventDefault();
    const newMeeting = {
      CadenceName: contactinfo.CadenceName,
      Modules: contactinfo.Modules,
      CreatedDate: contactinfo.CreatedDate,
      CreatedBy: contactinfo.createdBy,
    };
    setMeetings([...meetings, newMeeting]);
    setContactInfo({
      ...contactinfo,
      CadenceName: "",
      Modules: "",
      CreatedDate: "",
      createdBy: "",
    });
    setModalOpen1(false);
  };
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateSmiley2 = (color) => (
    <div className="colored-circle2" style={{ backgroundColor: color, color:"white" }}>
      <span className="material-icons" style={{ fontSize: "60px", fontFamily: "'Material Symbols Outlined'" }}>person</span>
    </div>
  );
  
  console.log("**********", contactinfo);
  return (
    <div>
      <div className="classs">
        {/* <div className="buttonss">
          <div className="mail-icon-button">
            <button>Send Email</button>
          </div>
          <div className="edit-button">
            <button>Edit</button>
          </div>
          <div className="dot-button">
            <button>...</button>
          </div>
        </div> */}
      </div>

      <div className="pages">
        <div>
          <RelatedList title="Related List" items={relatedListItems} />
        </div>
        <div className="relatedList-Contacts">
              <Link to="/contants"> Back</Link>
            </div>


        
        <div></div>
        <div className="blank-page">
          <div className="contact-details">
            <h1>
              Contact Details
            </h1>
            <div>
            <h2 className="owner1"> {contactinfo.first_name}</h2>
            <h2 className="owner3"> {contactinfo.address}</h2>
            <div>
            {generateSmiley2(generateRandomColor())}

            </div>
            <a
                className="visitLinkedin"
                href={contactinfo.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin link
              </a>
            </div>
          </div>
          {/* <div className="button-group">
            <button className="button-overview">Overview</button>
            <button className="button-timeline">Timeline</button>
          </div> */}


          <div className="info-contactOwner">
            <h2 className="owner">Contact Owner</h2>
         
            <div className="para1">
            <p>
                  <strong className="contactinfo-para1">Email:</strong>
                  <div className="contactinfo_email"> {contactinfo.email}</div>
                </p>
                <p>
                  <strong className="contactinfo-para2">Phone:</strong>
                  <div className="contactinfo_phone"> {contactinfo.phone}</div>
                </p>
                <p>
                  <strong className="contactinfo-para3">Address:</strong>
                  <div className="contactinfo_address"> {contactinfo.address}</div>
                </p>
                <p>
                  <strong className="contactinfo-para4">Account:</strong>
                  <div className="contactinfo_account"> {contactinfo.account}</div>
                </p>
            
            </div>
          </div>

            <div className="button-group">
            <button className="button-overview">Overview</button>
            <button className="button-timeline">Timeline</button>
          </div> 
          <div className="info-hideandshowDetail">
            <div className="hidedetail">
              <button onClick={toggleAdditionalDetails}>
                {contactinfo ? "Hide Details" : "Show Details"}
              </button>
            </div>
          

            <div className="showdetails">
              <div className="showdetailsdata">
              <p>
                  <strong className="contactdetails-para1">Account Name: </strong>
                  <div className="contactinfo_accountName"> {contactinfo.accountName}</div>
                </p>
                <p>
                  <strong className="contactdetails-para2">Email: </strong>
                  <div className="contactinfo_Email"> {contactinfo.email}</div>
                </p>
                <p>
                  <strong className="contactdetails-para3">Lead Source: </strong>
                  <div className="contactinfo_leadSource"> {contactinfo.leadSource}</div>
                </p>
            
              </div>
              <div className="show-hideDetails">
              <p>
                  <strong className="contactdetails-para4">Contact Name:</strong>
                  <div className="contactinfo_ContactName"> {contactinfo.ContactName}</div>
                </p>
                <p>
                  <strong className="contactdetails-para5">Vendor Name:</strong>
                  <div className="contactinfo_vendorName"> {contactinfo.vendorName}</div>
                </p>
                <p>
                  <strong className="contactdetails-para6">Other Phone: </strong>
                  <div className="contactinfo_OtherPhone"> {contactinfo.OtherPhone}</div>
                </p>
                <p>
                  <strong className="contactdetails-para7">Address: </strong>
                  <div className="contactinfo_Address"> {contactinfo.address}</div>
                </p>
             
              </div>
            </div>
            {contactinfo && (
              <div className="detail">
                <h3 className="additional">Additional Details:</h3>
                <div className="add">
                  <div className="adddetail_1">
                  <p>
                  <strong className="contactdetails-para8">Assistant: </strong>
                  <div className="contactinfo_assistant"> {contactinfo.assistant}</div>
                </p>
                <p>
                  <strong className="contactdetails-para9">Created By: </strong>
                  <div className="contactinfo_createdBy"> {contactinfo.createdBy}</div>
                </p>
                <p>
                  <strong className="contactdetails-para10">Modified By: </strong>
                  <div className="contactinfo_modifiedBy">  {contactinfo.ModifiedBy}</div>
                </p>
                <p>
                  <strong className="contactdetails-para11">Currency: </strong>
                  <div className="contactinfo_Currency1"> {contactinfo.Currency1}</div>
                </p>
                <p>
                  <strong className="contactdetails-para12">Account: </strong>
                  <div className="contactinfo_Account">{contactinfo.account}</div>
                </p>
                <p>
                  <strong className="contactdetails-para13">Fax: </strong>
                  <div className="contactinfo_Fax">{contactinfo.Fax}</div>
                </p>
                
                   
                  </div>

                  <div className="hide_show">
                  <p>
                  <strong className="contactdetails-para14">Date of Birth: </strong>
                  <div className="contactinfo_DOB">{contactinfo.DateOfBirth}</div>
                </p>
                <p>
                  <strong className="contactdetails-para15">Asst Phone: </strong>
                  <div className="contactinfo_Asst"> {contactinfo.AsstPhone}</div>
                </p>
                <p>
                  <strong className="contactdetails-para16"> Email Opt Out: </strong>
                  <div className="contactinfo_emailopt"> {contactinfo.emailOptOut ? "Yes" : "No"}</div>
                </p>
                <p>
                  <strong className="contactdetails-para17">Skype ID: </strong>
                  <div className="contactinfo_SkypeID"> {contactinfo.SkypeId}</div>
                </p>
                <p>
                  <strong className="contactdetails-para18">Secondary Email:</strong>
                  <div className="contactinfo_Secondaryemail"> {contactinfo.secondaryEmail}</div>
                </p>
                <p>
                  <strong className="contactdetails-para19">Twitter: </strong>
                  <div className="contactinfo_Twitter"> {contactinfo.Twitter}</div>
                </p>
                   
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="info_AdditionalDetails">
            <h2 className="addinfo1"> Additional Information</h2>
           
            <div className="locate-map-button-container">
              <button className="locate-map-button">
                <span className="locate-map-button-text">Locate Map</span>
              </button>
            </div>

            <div className="add">
              <div className="OtherMailing">
              <p>
                  <strong className="contactdetails-para20"> Mailing Street: </strong>
                  <div className="contactinfo_mailingstreet"> {contactinfo.MailingStreet}</div>
                </p>
                <p>
                  <strong className="contactdetails-para21"> Mailing Zip: </strong>
                  <div className="contactinfo_mailingzip"> {contactinfo.MailingZip}</div>
                </p>
                <p>
                  <strong className="contactdetails-para22"> Mailing Country: </strong>
                  <div className="contactinfo_mailingcountry"> {contactinfo.MailingCountry}</div>
                </p>
                <p>
                  <strong className="contactdetails-para23"> Mailing City: </strong>
                  <div className="contactinfo_mailingcity"> {contactinfo.MailingCity}</div>
                </p>
                             
              </div>
              <div className="othercontactinfo">
              <p>
                  <strong className="contactdetails-para24"> Other Country: </strong>
                  <div className="contactinfo_othercountry"> {contactinfo.OtherCountry}</div>
                </p>
                <p>
                  <strong className="contactdetails-para25"> Other City: </strong>
                  <div className="contactinfo_othercity"> {contactinfo.OtherCity}</div>
                </p>
                <p>
                  <strong className="contactdetails-para26"> Other State: </strong>
                  <div className="contactinfo_otherstate"> {contactinfo.OtherState}</div>
                </p>
                <p>
                  <strong className="contactdetails-para27"> Other Zip: </strong>
                  <div className="contactinfo_otherzip"> {contactinfo.OtherZip}</div>
                </p>
               
              </div>
            </div>
            <h2 className="description-info"> Description Information: </h2>
            <p className="add_description">  {contactinfo.Description}</p>
          </div>
          <div className="info_notes">
            <div className="notes-container">
              <div className="recent">
                <div className="notes">
                  <h1>Notes</h1>
                </div>

                <div className="Noted-head">
                  <button className="recent-notes-button"> Recent Notes</button>

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
                  value={contactinfo.Notes}
                  onChange={handleChange}
                  className="notes-textarea"
                  placeholder="Add Notes........"
                ></textarea>
                
              </form>
            </div>
          </div>
          <div className="info_cadence">
            <h2 className="cadence"> Cadences </h2>
            
            <div>
              <div className="addcadencebtn">
              <button onClick={() => setModalOpen1(true)}>+Add Cadence</button>

              </div>

              <div className="Cadence_table">
                <table className="table10">
                  <thead>
                    <tr>
                      <th className="table_cadence-row">Cadence Name</th>
                      <th className="table_cadence-row"> Modules </th>
                      <th className="table_cadence-row">Created Date</th>
                      <th className="table_cadence-row">Created By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetings.map((meeting) => (
                      <tr className="table_cadence_table">
                        <td className="table_cadence-data">{meeting.CadenceName}</td>
                        <td className="table_cadence-data">{meeting.Modules}</td>
                        <td className="table_cadence-data">{meeting.CreatedDate}</td>
                        <td className="table_cadence-data">{meeting.createdBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="info_Attach">
            <div className="info1">
              <div >
                <h2 className="heads_Attach">Attachments</h2>
              </div>
              <div class="attachment-upload1">
                <input type="file" id="attachment-input" />
                <label for="attachment-input">
                  <div className="clicktoupload1">clicktoupload</div>
                </label>
              </div>
              
            </div>
          </div>

          <div className="info_deals">
            <h2 className="info_deals2">Deals</h2>
            <div className="deal">
              <button>+New Deal</button>
            </div>
          </div>

          <div className="info_activities">
            <div className="actvities">
              <div>
                <h2 className='open_activity'>Open Activities</h2>
              </div>
              <div className="added">
                <select onChange={handleNew}>
                  <option value="">+Add New Activity</option>

                  <option value="1">Task</option>
                  <option value="2"> meeting </option>
                  <option value="3">call</option>
                </select>
              </div>
            </div>
          </div>
          <div className="info_closed">
            <h2 className="closed_activity">Closed Activities</h2>
          </div>
          <div className="info_meeting">
            <h2 className="invite_meet">Invite Meetings</h2>
          </div>
          <div className="info_product">
            <h2 className="info-pro">Products</h2>
            <div className="productsbtn">
              <button>+Add Products</button>
            </div>
          </div>
          <div className="info_cases">
            <h2 className="cases">Cases</h2>
            <div className="Assignnew">
              <div className="assign1">
                {" "}
                <button>Assign</button>
              </div>
              <div className="assign2">
                {" "}
                <button>New</button>
              </div>
            </div>
          </div>
          <div className="info_Quotes">
            <h2 className="info-quto">Quotes</h2>
            <div className="Assignnew">
              <div className="assign1">
                {" "}
                <button>Assign</button>
              </div>
              <div className="assign2">
                {" "}
                <button>New</button>
              </div>
            </div>
          </div>
          <div className="info_sales">
            <h2 className="info-sale">Sales Order</h2>
            <div className="Assignnew">
              <div className="assign1">
                {" "}
                <button>Assign</button>
              </div>
              <div className="assign2">
                {" "}
                <button>New</button>
              </div>
            </div>
          </div>
          <div className="info_purchase">
            <h2 className="purchase">Purchase Order</h2>
            <div className="Assignnew">
              <div className="assign1">
                {" "}
                <button>Assign</button>
              </div>
              <div className="assign2">
                {" "}
                <button>New</button>
              </div>
            </div>
          </div>
          <div className="info_invoice">
            <h2 className="invoice">Invoices</h2>
            <div className="Assignnew">
              <div className="assign1">
                {" "}
                <button>Assign</button>
              </div>
              <div className="assign2">
                {" "}
                <button>New</button>
              </div>
            </div>
          </div>
        
          <div className="info_cop">
            <h2 className="infi-campi">campaigns</h2>
            <div className="productsbtn">
              {" "}
              <button>Add Compaigns</button>
            </div>
          </div>
          <div className="info_social">
            <h2 className="infi-campi" > social</h2>
            {/* <span class="material-icons">Facebook</span> */}

          </div>
          <div className="infi_conts">
            <h2 className="infi-campi">Reporting Contacts</h2>
            <div className="Assignnew">
              <div className="productsbtn1">
                {" "}
                <button>New</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
