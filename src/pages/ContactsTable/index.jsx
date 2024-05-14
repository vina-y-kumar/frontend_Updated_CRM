import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Dropdown,Card, ListGroup } from "react-bootstrap";


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
  const modelName = "contacts";

 

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
  
  
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateSmiley = (color) => (
    <div className="colored-circle" style={{ backgroundColor: color }}>
      <span className="material-symbols-outlined">sentiment_satisfied</span>
    </div>
  );
  const generateSmiley1 = (color) => (
    <div className="colored-circle1" style={{ backgroundColor: color }}>
      <i className="far fa-smile fa-lg"  style={{ fontSize: "38px" }}></i> 
    </div>
  );
  
  
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
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="payments-dropdown1" className="excel-dropdown-menu1">
            Excel File
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link
                to={`/bulk-import?model=${modelName}`}
                className="import-excel-btn5"
              >
                Import Excel
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <button
                onClick={handleDownloadExcel}
                className="excel-download-btn1"
              >
                Excel
              </button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
       

          
          <div className="contactlist">
          <h1 >Contact list</h1>
          </div>
        
          <div className="handle4">
          <NavLink to="/addcontact" id="btn10">
                +CreateContact
              </NavLink>
            {/* <select onChange={handlePlusClick1} className="view-mode-select">
              <option value="">!!!</option>
              <option value="1">Log in</option>
              <option value="2">Log out</option>
            </select> */}
          
             
            

            {/* <select className="view-mode-select1" onChange={handleAction}>
              <option value="">Action</option>
              <option value="1">Log in</option>
              <option value="2">Log out</option>
            </select> */}
          </div>
        </div>

        <div className="contact-boxes">
        <div className="contact-bigboxes">
  <h1 className="newcontact">New contacts this Week</h1>
  <Link to={`/contactinfo/${contacts[0]?.id}`} className="firstcontact-box">
                <h1 className="heading1">{contacts.length > 0 && contacts[0].first_name}</h1>
                <p className="paragraph1">{contacts.length > 0 && contacts[0].description}</p>
                {/* Smiley */}
                <div className="smiley1">
                  {generateSmiley1(generateRandomColor())}
                </div>
              </Link>
              <Link to={`/contactinfo/${contacts[2]?.id}`} className="secondcontact-box">
                <h1 className="heading2">{contacts.length > 2 && contacts[2].first_name}</h1>
                <p className="paragraph2">{contacts.length > 2 && contacts[2].description}</p>
                {/* Smiley */}
                <div className="smiley2">
                  {generateSmiley1(generateRandomColor())}
                </div>
              </Link>
              <Link to={`/contactinfo/${contacts[3]?.id}`} className="thirdcontact-box">
                <h1 className="heading3">{contacts.length > 3 && contacts[3].first_name}</h1>
                <p className="paragraph3">{contacts.length > 3 && contacts[3].description}</p>
                {/* Smiley */}
                <div className="smiley3">
                  {generateSmiley1(generateRandomColor())}
                </div>
              </Link>
</div>

</div>
<div  className="activeInactivebtn">
  <div className="activeInactivebtn1">
  <button className="activeinactive">All Contacts</button>
  </div>
  <div className="activeInactivebtn2">
  <button>Active</button>

  </div>
  <div className="activeInactivebtn3">
  <button>Inactive</button>
  </div>
  
 

</div>

 <div className="bigcontactbox">
 <div className="records10">
 <select
  value={viewMode}
  onChange={(e) => handleViewModeChange(e.target.value)}
  className="view-mode-select7"
>
  <option value="">View!</option>
  <option value="table">Table View</option>
  <option value="tile">Tile View</option>
  <option value="list">List View</option>
</select>
          
          
          <select className="view-mode-select3" onChange={handleRecords1}>
            <option value="">10 Records per page</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
  
      
          {viewMode !== 'tile' && (
  <h1 className="allcontacts">All contacts</h1>
)}

  

        </div>
        <div className="bugs10">
          {/* <div className="filter-container">
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
          </div> */}
  


{/* Table View */}

{viewMode === "table" && (
          <div className="table4">
            <table className="contacttable">
              <thead>
                <tr>
                  <th className="user1">USER</th>
                  <th className="username1">USER NAME</th>
                  <th className="useremail1">EMAIL</th>
                  <th className="useraccount1">ROLE</th>
                  <th className="usercontact1">Contact Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts?.map &&
                  filteredContacts.map((contact) => (
                    <tr className="contacttablerow" key={contact.id}>
                      <td>
                        {generateSmiley(generateRandomColor())}
                        <div className="cont-first_name">
                        <Link to={`/contactinfo/${contact.id}`}>

                          {contact.first_name}
                          </Link></div>
                      </td>
                      <td className="contlast_name">{contact.last_name}</td>
                      <td className="cont_email">
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </td>
                      <td className="cont_phone">{contact.phone}</td>
                      <td className="cont_phone">{contact.address}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
          {/* Tile View */}
          {/* {viewMode==='tile' &&(
            
            <div>
          <h2>Tiles View</h2>
          <div className="contacts-tiles-container2">
            {contacts.map((contact, index) => (
              <Card key={contact.id} className="contact-tile">
                <Card.Body className="card-body">
                  <Card.Title className="card-title">
                    <Link to={`/contactinfo/${contact.id}`}>
                      {contact.first_name+" "+contact.last_name}
                    </Link>
                  </Card.Title>
                  <Card.Text className="card-phonenumber">Phone Number: {contact.phone}</Card.Text>
                  <Card.Text className="card-address">Address: {contact.address}</Card.Text>
                  <Card.Text className="card-desc">Description: {contact.description}</Card.Text>
                  <Card.Text className="card-email">Email: {contact.email}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
          )} */}
          {viewMode === "tile" && (
          <div className="contact-tile-view">
            {/* Implement your Kanban view here */}
            <div className="contacts-tiles-container">
              <div className="contact-index">
              {contacts.map((contact, index) => (
                <div className={`contact-tile tile-${index + 1}`} key={contact.id}>
                  <Link to={`/contactinfo/${contact.id}`} className="contact-link">
                  
                    <div className="tile-header1"><p> {contact.first_name+" "+contact.last_name}</p></div>
                  </Link>
                  <div className="smiley4">
                  {generateSmiley1(generateRandomColor())}

                  </div>
                  <div className="tile-content">
                    <p className="contactphone">
                   
                    {contact.phone}
                    </p>
                   
                  </div>
                  <div className="contfirst-name">
                    <p> {contact.first_name} </p>
                    </div>
                  <div className="tile-footer">
                  <p className="contactaddress">
                      
                      {contact.address}
                      </p>
                    <p className="contactemail">
                    {contact.email}
                      
                    </p>
                  </div>

                </div>
              ))}

              </div>
             
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
  
      </div>
     );
    }