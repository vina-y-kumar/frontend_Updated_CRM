import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [organisations, setOrganisations] = useState([]);
  const [tenantId, setTenantId] = useState("");
  const [showNewOrgForm, setShowNewOrgForm] = useState(false);
  const [newOrganisationName, setNewOrganisationName] = useState("");
  const [newOrganisationTenantId, setNewOrganisationTenantId] = useState("");
  const [newOrganisationPassword, setNewOrganisationPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch organisation names from the backend when component mounts
    fetch(`https://webappbaackend.azurewebsites.net/createTenant`)
      .then((res) => res.json())
      .then((data) => {
        // Extract organisation names from the response
        const orgNames = data.map((org) => ({
          id: org.id,
          name: org.organization,
          tenantId: org.id,
        }));
        console.log(orgNames);
        setOrganisations(orgNames);
      })
      .catch((error) => console.error("Error fetching organisations:", error));
  }, []);

   const authRegister = async() => {
    event.preventDefault(); 
    setIsSubmitting(true);
    // Find the tenant ID associated with the selected organisation
    const selectedOrg = organisations.find((org) => org.name === organisation);
    const selectedTenantId = selectedOrg ? selectedOrg.tenantId : "";

    try {
      const response = await fetch(`http://127.0.0.1:8000/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-ID":3,
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          role: role,
          organization: organisation,
          tenant: selectedTenantId, // Pass the tenant ID here
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      alert(data.msg);
  
      
        // Perform navigation only if registration is successful
        navigate(`/login`); // Navigate to login page after successful registration
      
    } catch (error) {
      console.error("Registration failed:", error);
    }
    finally {
      setIsSubmitting(false); // End loading
    }
  };

  const handlePopupSubmit = () => {
    // Handle submission of the new organisation popup form
    // Implement logic to create the new organisation
    fetch(`https://webappbaackend.azurewebsites.net/createTenant/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenant_id: newOrganisationTenantId,
        organization: newOrganisationName,
        password: newOrganisationPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update organisations state with the new organisation name
        setOrganisations([...organisations, { name: newOrganisationName }]);
        // Clear the new organisation form fields
        setNewOrganisationName("");
        setNewOrganisationTenantId("");
        setNewOrganisationPassword("");
        // Close the popup
        setShowNewOrgForm(false);
        alert("New organisation created successfully!");
      })
      .catch((error) =>
        console.error("Error creating new organisation:", error)
      );
  };

  return (
    <div className="auth">
      <Spline scene="https://prod.spline.design/ac1BIJRVXqUWMyDz/scene.splinecode" />
      <div className="container">
        <div className="auth_inner">
          <h2 className="auth_paragraph">Register</h2>
          <form className="auth_form" onSubmit={authRegister}>
            <label htmlFor="username" className="auth_label">
              <input
                className="auth_input"
                type="text"
                placeholder="👤 Username"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label htmlFor="email" className="auth_label">
              <input
                className="auth_input"
                type="email"
                placeholder="✉️ Email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="password" className="auth_label">
              <input
                className="auth_input"
                type="password"
                placeholder="🔑 Password"
                id="pasword"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label htmlFor="role" className="auth_label">
              <select
                className="auth_input"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </label>
            <label htmlFor="organisation" className="auth_label">
              <select
                className="auth_input"
                id="organisation"
                value={organisation}
                onChange={(e) => {
                  setOrganisation(e.target.value);
                  if (e.target.value === "createNew") {
                    setShowNewOrgForm(true);
                  } else {
                    setShowNewOrgForm(false);
                  }
                }}
              >
                <option value="">Select Organisation</option>
                {organisations.map((org) => (
                  <option key={org.id} value={org.name}>
                    {org.name}
                  </option>
                ))}
                <option value="createNew">Create New Organization</option>
              </select>
            </label>
            


            <NavLink className="auth_login" to="/login">
              login?
            </NavLink>

            <button className="auth_btn" type="submit">
              Register
            </button>
          </form>
          
        </div>
      </div>
      {showNewOrgForm && (
              <div className="new-org-form-overlay">
                <div className="new-org-form">
                  <button
                    className="close-btn"
                    onClick={() => setShowNewOrgForm(false)}
                  >
                    &#10006;
                  </button>
                  <label
                    htmlFor="newOrganisationName"
                    className="auth_label"
                  >
                    New Organisation Name:
                    <input
                      className="auth_input"
                      type="text"
                      placeholder="New Organisation Name"
                      id="newOrganisationName"
                      required
                      value={newOrganisationName}
                      onChange={(e) =>
                        setNewOrganisationName(e.target.value)
                      }
                    />
                  </label>
                  <label
                    htmlFor="newOrganisationTenantId"
                    className="auth_label"
                  >
                    Tenant ID:
                    <input
                      className="auth_input"
                      type="text"
                      placeholder="Tenant ID"
                      id="newOrganisationTenantId"
                      required
                      value={newOrganisationTenantId}
                      onChange={(e) =>
                        setNewOrganisationTenantId(e.target.value)
                      }
                    />
                  </label>
                  <label
                    htmlFor="newOrganisationPassword"
                    className="auth_label"
                  >
                    Password:
                    <input
                      className="auth_input"
                      type="password"
                      placeholder="Password"
                      id="newOrganisationPassword"
                      required
                      value={newOrganisationPassword}
                      onChange={(e) =>
                        setNewOrganisationPassword(e.target.value)
                      }
                    />
                  </label>
                  <button
                    className="auth_btn"
                    type="button"
                    onClick={handlePopupSubmit}
                  >
                    Create New Organisation
                  </button>
                </div>
              </div>
            )}
    </div>
  );
};
