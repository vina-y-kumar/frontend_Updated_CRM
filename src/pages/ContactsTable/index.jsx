import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Card, ListGroup } from "react-bootstrap";
import * as XLSX from "xlsx"; // Importing xlsx library


export const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [newContact, setNewContact] = useState({
    first_name: "",
    account: "",
    email: "",
    phone: "",
    createdBy: "",
  });
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAccountTerm, setSearchAccountTerm] = useState(""); // New state for account dropdown search

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        "https://backendcrmnurenai.azurewebsites.net/contacts/"
      );
      const data = await response.json();
      setContacts(data);
      setFilteredContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Your form submission logic here
    } catch (error) {
      console.error("Error creating new contact:", error);
    }
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredContacts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");
    XLSX.writeFile(wb, "contacts.xlsx");
  };

  const handleAllCalls1 = (event) => {
    console.log("Filter by: ", event.target.value);
  };

  const handleAction = () => {
    console.log("Action required");
  };

  const handlePlusClick1 = () => {
    console.log("Plus clicked");
  };

  const handleRecords1 = (event) => {
    console.log("Records per page: ", event.target.value);
  };

  const handleFilterChange = (event) => {
    const filterBy = event.target.value;
    if (filterBy === "first_name") {
      setFilteredContacts(
        contacts.slice().sort((a, b) =>
          a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : -1
        )
      );
    } else if (filterBy === "createdBy") {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.createdBy.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    } else {
      setFilteredContacts(contacts);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.first_name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
  };

  const handleAccountSearch = (event) => {
    setSearchAccountTerm(event.target.value);
    // Filter dropdown options based on the search term
    // Assuming your dropdown options are stored in `contacts`
    const filteredOptions = contacts.filter((contact) =>
      contact.account.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredContacts(filteredOptions);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="calls1">
       <div className="home_left_box1">
        <Sidebar />
      </div>

      <div >

      </div>
      <div className="contain1">

      <div className="contain1" style={{width:"100%"}}>
        <div className="meet1">
          
          <button onClick={handleDownloadExcel} className="excel-download-btn">
            Excel
          </button>
          
          <div className="Addcalls1">
            <select className="view-mode-select" onChange={handleAllCalls1}>
              <option value="">All Contacts</option>
              <option value="1">Log in</option>
              <option value="2">Log out</option>
            </select>
          </div>
          <div className="handle1">
            <select onChange={handlePlusClick1} className="view-mode-select">
              <option value="">!!!</option>
              <option value="1">Log in</option>
              <option value="2">Log out</option>
            </select>
            <div className="create1">
              <NavLink to="/addcontact" id="btn1">
                Create Contact
              </NavLink>
            </div>

            <select className="view-mode-select" onChange={handleAction}>
              <option value="">Action</option>
              <option value="1">Log in</option>
              <option value="2">Log out</option>
            </select>
          </div>
        </div>
        <div className="records">
          <select className="view-mode-select" onChange={handleRecords1}>
            <option value="">10 Records per page</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
          <select
            value={viewMode}
            onChange={handleViewModeChange}
            className="view-mode-select"
          >
            <option value="">View!</option>
            <option onClick={() => handleViewModeChange("table")} value="">
              Table View
            </option>
            <option onClick={() => handleViewModeChange("tile")}>
              Tile View
            </option>
            <option onClick={() => handleViewModeChange("list")}>
              List View
            </option>
          </select>
        </div>
        <div className="bugs">
          <div className="filter-container">
            <h2>Filter Contacts by</h2>
            <div className="search-bar">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />

            </div>
            <div className="dropdown-container">
              <button className="dropdown-button">
                System Defined Filters
              </button>
              <div className="dropdown-content">
                <a href="#"> Contacts</a>
                <a href="#">Deals</a>
                <a href="#">Deal Amount</a>
                <a href="#">Deal Stage</a>
                <a href="#">Deal Owner</a>
                <a href="#">Deal Closing Date</a>
                <a href="#">Locked</a>
                <a href="#">Notes</a>
                <a href="#">Activities</a>
                <a href="#">Campaigns</a>
              </div>
              <button className="dropdown-button">Filter By Fields</button>
              <div className="dropdown-content">
              <a href="#" onClick={() => handleFilterChange("first_name")}>
                  Contact Name
                </a>
                <a href="#" onClick={() => handleFilterChange("createdBy")}>
                  Created By 
                </a>
              </div>
            </div>
          </div>

{/* Table View */}
{viewMode==='table' &&(
          <div className="table1">
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  
                  <th>Account Name</th>

                  <th>Contact Name</th>
                  <th>Description</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts?.map &&
                  filteredContacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>
                        <NavLink to={`/contactinfo/${contact.id}`}>
                          {contact.first_name + " " + contact.last_name}
                        </NavLink>
                      </td>
                      <td>{contact.description}</td>
                      <td>
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </td>
                      <td>{contact.phone}</td>
                      <td>{contact.address}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          )}
          {/* Tile View */}
          {viewMode==='tile' &&(
            
            <div>
          <h2>Tiles View</h2>
          {/* Implement your Kanban view here */}
          <div className="accounts-tiles-container">
            {contacts.map((contact, index) => (
              <Card key={contact.id} className="account-tile">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/contactinfo/${contact.id}`}>
                      {contact.first_name+" "+contact.last_name}
                    </Link>
                  </Card.Title>
                  <Card.Text>Phone Number: {contact.phone}</Card.Text>
                  <Card.Text>Address: {contact.address}</Card.Text>
                  <Card.Text>Description: {contact.description}</Card.Text>
                  <Card.Text>Email: {contact.email}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
          )}
          {/* List View */}
          {viewMode==='list' &&(
            <div>
            <h2>List View</h2>
            <div className="accounts-list-container" style={{width:"180%"}}>
              <ListGroup >
                {contacts.map((contact, index) => (
                  <ListGroup.Item key={contact.id} className="accounts-list-item" >
                    <Link to={`/contactinfo/${contact.id}`}>{contact.first_name+" "+contact.last_name}</Link>
                    <p>Phone Number: {contact.phone}</p>
                    <p>Description: {contact.description}</p>
                    <p>Address: {contact.address}</p>
                    <p>Email: {contact.email}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  
      </div>
     );
    }