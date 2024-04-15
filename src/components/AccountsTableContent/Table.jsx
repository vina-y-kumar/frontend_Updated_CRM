import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./accountsTableContent.css";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";

const AccountsTable1 = () => {
  const [accounts, setAccounts] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // Default view mode is table

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
  if (!accounts) {
    return <div className="loader"></div>; // Show a loading message while fetching data
  }

  return (
    <div>
      <div className="records2" style={{ width: "100%" }}>
        <select className="view-mode-select" style={{ float: "left" }}>
          <option value="">50 Records per page</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </select>
        <select
  value={viewMode}
  onChange={(e) => handleViewModeChange(e.target.value)}
  className="view-mode-select"
>
  <option value="">View!</option>
  <option value="table">Table View</option>
  <option value="tile">Tile View</option>
  <option value="list">List View</option>
</select>

      </div>

      <br />
      {/* <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">
            Action
          </a>
          <a class="dropdown-item" href="#">
            Another action
          </a>
          <a class="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      </div> */}
      {/* table view */}
      {viewMode === "table" && (
        <div>
          <h2>Accounts Table</h2>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Account Name</th>
                <th>Phone Number</th>
                <th>Industry</th>
                <th>Account Owner</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={account.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/accounts/${account.id}`}>
                      {account.company}
                    </Link>
                  </td>
                  <td>{account.phone}</td>
                  <td>{account.industry}</td>
                  <td>{account.Name}</td>
                  <td>{account.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Tile View */}
      {viewMode === "tile" && (
        <div>
          <h2>Tiles View</h2>
          {/* Implement your Kanban view here */}
          <div className="accounts-tiles-container">
            {accounts.map((account, index) => (
              <Card key={account.id} className="account-tile">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/accounts/${account.id}`}>
                      {account.company}
                    </Link>
                  </Card.Title>
                  <Card.Text>Phone Number: {account.phone}</Card.Text>
                  <Card.Text>Industry: {account.industry}</Card.Text>
                  <Card.Text>Account Owner: {account.Name}</Card.Text>
                  <Card.Text>Email: {account.email}</Card.Text>
                </Card.Body>
              </Card>
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
  );
};

export default AccountsTable1;
