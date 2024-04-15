import "./opportunities.css";
import { Header } from "../../components/Header";
import React, { useEffect, useState } from "react";

import { Sidebar } from "../../components/Sidebar";
import { OpportunitiesContent } from "../../components/OpportunitiesContent";
import "./Form3.jsx";
import { NavLink } from "react-router-dom";


export const Opportunities = () => {
 
  const [oppourtunity, setOppourtunity] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    account: "",
    createdBy: "",
    contacts: "",
    closedBy: "",
    closedOn:"",
    stage:"",
  });

  useEffect(() => {
    fetchoppourtunity();
  }, []);
  const fetchoppourtunity = async () => {
    try {
      const response = await fetch(
        "https://backendcrmnurenai.azurewebsites.net/opportunities/"
      );
      const data = await response.json();
      console.log(response);
      setOppourtunity(data);
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
      const response = await post(
        "https://backendcrmnurenai.azurewebsites.net/opportunities/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),
        }
      );
      if (response.ok) {
        fetchoppourtunity();
        setNewContact({
          name: "",
          account: "",
          createdBy: "",
          contacts: "",
          closedBy: "",
          closedOn:"",
          stage:"",
        });
        console.log("New contact created successfully");
      } else {
        console.error("Failed to create new contact");
      }
    } catch (error) {
      console.error("Error creating new contact:", error);
    }
  };






  const handleAllCalls= (event) => {
    console.log("Filter by: ", event.target.value);
  };

  const handleAction = () => {
    console.log("Action required");
  };
  const handlePlusClick = () => {
    console.log("Plus clicked");
  };
  const handleRecords1 = (event) => {
    console.log("Records per page: ", event.target.value);
  };

  return (
    <div className="calls">
      <div className="home_left_box1">
            <Sidebar />
          </div>
          <div className="contain">
          
          <div className="meet" >
          <div className="Addcalls">
           <select className="change" onChange={handleAllCalls}>
             <option value="">All Contacts</option>
             <option value="1">Log in</option>
             <option value="2">Log out</option>
           </select>
         </div>
         <div className="handle5">
            <select onChange={handlePlusClick}>
              <option value="">!!!</option>
              <option value="1">Log in</option>
              <option value="2">Log out</option>
            </select>
            </div>
            <div className="create2">

             <NavLink to="/opportunity" id="btn3">

                        {" "}
                  Create Oppourtunity
                  </NavLink>
            </div>

             <div>
             <select className="changes" onChange={handleAction}>
              <option value="">Action</option>
              <option value="1">Log in</option>
              <option value="2">Log out</option>
            </select>
             </div>
           
          

          </div>
          
       
            <div className="records">
          <select className="page" onChange={handleRecords1}>
            <option value="">10 Records per page</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </div>
          
          <div className="table1">
            <table>
              <thead>
              <tr>
                  <th>Contact Name</th>
                  <th>Account </th>
                  <th> stage </th>
                  <th> Created By  </th>
                  <th>contacts</th>
                  <th>Closed on</th>
                  <th>closed by</th>
                </tr>
              </thead>
              <tbody>
              {oppourtunity.map(Oppo => (
                <tr key={Oppo.id}>
                  <td>{Oppo.name}</td>
                  <td>{Oppo.account}</td>
                  <td>{Oppo.stage}</td>
                  <td>{Oppo.createdBy}</td>
                  <td>{Oppo.contacts}</td>
                  <td>{Oppo.closedOn}</td>
                  <td>{Oppo.closedBy}</td>
                </tr>
              ))}
            </tbody>
            </table>

          </div>

         

          </div>
         
    </div>
          
        
       
  );
};
