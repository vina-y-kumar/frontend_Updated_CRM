import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  console.log("**********", contactinfo);
  return (
    <div>
      <div className="classs">
        <div className="buttonss">
          <div className="mail-icon-button">
            <button>Send Email</button>
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
          <RelatedList title="Related List" items={relatedListItems} />
        </div>

        
        <div></div>
        <div className="blank-page">
          <div className="button-group">
            <button className="button-overview">Overview</button>
            <button className="button-timeline">Timeline</button>
          </div>
          <div className="info">
            <h2 className="owner">Contact Owner: {contactinfo.first_name}</h2>
            <hr />
            <div className="para1">
              <p className="para">Email: {contactinfo.email}</p>
              <p className="para">Phone: {contactinfo.phone}</p>
              <p className="para">Address: {contactinfo.address}</p>
              <p className="para">Account: {contactinfo.account}</p>
            </div>
          </div>
          <div className="info">
            <div className="hidedetail">
              <button onClick={toggleAdditionalDetails}>
                {contactinfo ? "Hide Details" : "Show Details"}
              </button>
            </div>
            <hr />

            <div className="showdetails">
              <div>
                <h2>Contact Owner: {contactinfo.first_name}</h2>
                <p>Account Name: {contactinfo.accountName}</p>
                <p>Email: {contactinfo.email}</p>
                <p>Lead Source: {contactinfo.leadSource}</p>
              </div>
              <div>
                <p>Contact Name: {contactinfo.ContactName}</p>
                <p>Vendor Name: {contactinfo.vendorName}</p>
                <p>Other Phone: {contactinfo.OtherPhone}</p>
                <p>Mobile: {contactinfo.address}</p>
              </div>
            </div>
            {contactinfo && (
              <div className="detail">
                <h3 className="additional">Additional Details</h3>
                <div className="add">
                  <div>
                    <p>Assistant: {contactinfo.assistant}</p>
                    <p>Created By: {contactinfo.createdBy}</p>
                    <p>Modified By: {contactinfo.ModifiedBy}</p>
                    <p>Currency 1: {contactinfo.Currency1}</p>
                    <p>Department: {contactinfo.account}</p>
                    <p>Home Phone: {contactinfo.HomePhone}</p>
                    <p>Fax: {contactinfo.Fax}</p>
                  </div>

                  <div>
                    <p>Date of Birth: {contactinfo.DateOfBirth}</p>
                    <p>Asst Phone: {contactinfo.AsstPhone}</p>
                    <p>
                      Email Opt Out: {contactinfo.emailOptOut ? "Yes" : "No"}
                    </p>
                    <p>Skype ID: {contactinfo.SkypeId}</p>
                    <p>Secondary Email: {contactinfo.secondaryEmail}</p>
                    <p>Twitter: {contactinfo.Twitter}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="info">
            <h2 className="addinfo"> Additional Information</h2>
            <hr />
            <div className="locate-map-button-container">
              <button className="locate-map-button">
                <span className="locate-map-button-text">Locate Map</span>
              </button>
            </div>

            <div className="add">
              <div>
                <p className="para">
                  Mailing Street: {contactinfo.MailingStreet}
                </p>
                <p className="para">Mailing City: {contactinfo.MailingCity}</p>
                <p className="para">
                  Mailing State: {contactinfo.MailingState}
                </p>
                <p className="para">Mailing Zip: {contactinfo.MailingZip}</p>
                <p className="para">
                  Mailing Country: {contactinfo.MailingCountry}
                </p>
              </div>
              <div>
                <p className="para"> Other Street: {contactinfo.OtherStreet}</p>
                <p className="para"> Other City: {contactinfo.OtherCity}</p>
                <p className="para"> Other State: {contactinfo.OtherState}</p>
                <p className="para"> Other Zip: {contactinfo.OtherZip}</p>
                <p className="para">
                  {" "}
                  Other Country: {contactinfo.OtherCountry}
                </p>
              </div>
            </div>
            <h2> Description Information </h2>
            <p className="add"> Description: {contactinfo.Description}</p>
          </div>
          <div className="info">
            <div className="notes-container">
              <div className="recent">
                <div className="notes">
                  <h1>Notes</h1>
                </div>

                <div>
                  <button className="recent-notes-button">Recent Notes</button>

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
                  placeholder="add a note........"
                ></textarea>
                <button type="submit" className="add-note-button">
                  Add Note
                </button>
              </form>
            </div>
          </div>
          <div className="info">
            <h2 className="cadence"> Cadences </h2>
            <hr />
            <div>
              <button onClick={() => setModalOpen1(true)}>Add Cadence</button>

              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Cadence Name</th>
                      <th> Modules </th>
                      <th>Created Date</th>
                      <th>Created By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetings.map((meeting) => (
                      <tr>
                        <td>{meeting.CadenceName}</td>
                        <td>{meeting.Modules}</td>
                        <td>{meeting.CreatedDate}</td>
                        <td>{meeting.createdBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="info">
            <div className="info1">
              <div className="heads">
                <h2>Attachments</h2>
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
            <h2>Deals</h2>
            <div className="deal">
              <button>New Deal</button>
            </div>
          </div>

          <div className="info">
            <div className="actvities">
              <div>
                <h2>Open Activities</h2>
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
            <h2>CLosed Activities</h2>
          </div>
          <div className="info">
            <h2>Invite Meetings</h2>
          </div>
          <div className="info">
            <h2>Products</h2>
            <div className="products">
              <button>Add Products</button>
            </div>
          </div>
          <div className="info">
            <h2>Cases</h2>
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
          <div className="info">
            <h2>Quotes</h2>
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
          <div className="info">
            <h2>Sales Order</h2>
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
          <div className="info">
            <h2>Purchase Order</h2>
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
          <div className="info">
            <h2>Emails</h2>
          </div>
          <div className="info">
            <h2>Invoices</h2>
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
          <div className="info">
            <h2>campaigns</h2>
            <div className="addCompaigns">
              {" "}
              <button>Add Compaigns</button>
            </div>
          </div>
          <div className="info">
            <h2>social</h2>
          </div>
          <div className="info">
            <h2>Reporting Contacts</h2>
            <div className="Assignnew">
              <div className="neww">
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
