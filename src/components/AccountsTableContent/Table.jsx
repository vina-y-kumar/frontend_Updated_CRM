import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import call from "../../assets/call.jpg";
import mail from "../../assets/mail.webp";
import person from "../../assets/person.png";
import industry from "../../assets/industry.png";
import msg from "../../assets/msg.webp";
import "./accountsTableContent.css";

const AccountsTable1 = () => {

  const [accounts, setAccounts] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const modelName = "accounts";

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "https://backendcrmnurenai.azurewebsites.net/accounts/"
        );
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(excelData); // Process your Excel data here
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(accounts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "accounts");
    XLSX.writeFile(wb, "accounts.xlsx");
  };

  const getCircleColor = (letter) => {
    const colors = ['#ff6347', '#32cd32', '#1e90ff', '#ff69b4', '#ffd700']; // Define your color palette
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
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
    <div className="colored-circle1" style={{ backgroundColor: color }}>
      <i className="far fa-smile fa-lg"  style={{ fontSize: "38px" }}></i> 
    </div>
  );

  return (
    <div>
<div className="account-boxes">
        <div className="account-bigboxes">
  <h1 className="newcontact">New Accounts this Week</h1>
  <Link to={`/accounts/${accounts[0]?.id}`} className="firstaccount-box">
                <h1 className="heading1">{accounts.length > 0 && accounts[0].Name}</h1>
                <p className="paragraph1">{accounts.length > 0 && accounts[0].description}</p>
                {/* Smiley */}
                <div className="smiley1">
                  {generateSmiley2(generateRandomColor())}
                </div>
              </Link>
              <Link to={`/accounts/${accounts[2]?.id}`} className="secondaccount-box">
                <h1 className="heading2">{accounts.length > 1 && accounts[1].Name}</h1>
                <p className="paragraph2">{accounts.length > 1 && accounts[1].description}</p>
                {/* Smiley */}
                <div className="smiley2">
                  {generateSmiley2(generateRandomColor())}
                </div>
              </Link>
              <Link to={`/accounts/${accounts[3]?.id}`} className="thirdaccount-box">
                <h1 className="heading3">{accounts.length > 2 && accounts[2].Name}</h1>
                <p className="paragraph3">{accounts.length > 2 && accounts[2].description}</p>
                {/* Smiley */}
                <div className="smiley3">
                  {generateSmiley2(generateRandomColor())}
                </div>
              </Link>
             
</div>

</div>

      <select
        value={viewMode}
        onChange={(e) => handleViewModeChange(e.target.value)}
        className="view-mode-select1"
      >
        <option value="">View!</option>
        <option value="table">Table View</option>
        <option value="tile">Tile View</option>
        <option value="list">List View</option>
      </select>
      <div className="file">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="payments-dropdown" className="excel-dropdown-menu">
            Excel File
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link
                to={`/bulk-import?model=${modelName}`}
                className="import-excel-btn4"
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
      </div>
      <div className="accounts-container">
        <div className="accounts-header" style={{ width: "100%" }}>
          <h2 className="accountTableCenter">Accounts </h2>
          <select className="view-mode-select2" style={{ float: "left" }}>
            <option value="">50 Records per page</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </div>
        {viewMode === "table" && (
          <div className="accounts-table-wrapper">
            <table>
              <thead className="thead1">
                <tr>
                  <th></th> {/* Empty th for alignment */}
                  <th>Account Name</th>
                  <th>Phone Number</th>
                  <th>Industry</th>
                  <th>Account Owner</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => (
                  <tr className="tablerows" key={account.id}>
                    {/* Circle in table data cell */}
                    <td>
                      <Link to={`/accounts/${account.id}`}>
                        <span className="account-circle" style={{ backgroundColor: getCircleColor(account.company.charAt(0)) }}>
                          {account.company.charAt(0).toUpperCase()}
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/accounts/${account.id}`}>
                        {account.company}
                      </Link>
                    </td>
                    <td>{account.phone}</td>
                    <td className="accountIndus">{account.industry}</td>
                    <td className="accountnames">{account.Name}</td>
                    <td className="accountems">{account.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {viewMode === "tile" && (
          <div>
            {/* Implement your Kanban view here */}
            <div className="accounts-tiles-container">
              {accounts.map((account, index) => (
                <div className={`account-tile tile-${index + 1}`} key={account.id}>
                  <Link to={`/accounts/${account.id}`} className="account-link">
                    <div className="tile-icon" style={{ backgroundColor: getCircleColor(account.company.charAt(0)) }}>
                      {account.company.charAt(0)} {/* First letter of company name */}
                    </div>
                    <div className="tile-header">{account.company}<img src={msg} width={30} height={30} className="msg-icon" /></div>
                  </Link>
                  <div className="tile-content">
                    <p className="accountphone">
                      {" "}
                      <span style={{ display: "flex" }}>
                        <img src={call} width={30} height={30} />
                      </span>{" "}
                      {account.phone}
                    </p>
                    <p className="accountIndustry">
                      <span style={{ display: "flex" }}>
                        <img src={industry} width={30} height={30} />
                      </span>{" "}
                      {account.industry}
                    </p>
                  </div>
                  <div className="tile-footer">
                    <p className="accountName">
                      <span style={{ display: "flex" }}>
                        <img src={person} width={25} height={25} />
                      </span>{" "}
                      {account.Name}
                    </p>
                    <p className="accountemail">
                      <span style={{ display: "flex" }}>
                        <img src={mail} width={30} height={30} />
                      </span>{" "}
                      {account.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {viewMode === "list" && (
          <div>
            <h2>List View</h2>
            <div className="accounts-list-container">
              <ListGroup>
                {accounts.map((account, index) => (
                  <ListGroup.Item key={account.id} className="accounts-list-item">
                    <Link to={`/accounts/${account.id}`}>{account.Name}</Link>
                    <p>Phone Number: {account.phone}</p>
                    <p>Industry: {account.industry}</p>
                    <p>Company Name: {account.company}</p>
                    <p>Email: {account.email}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsTable1;
