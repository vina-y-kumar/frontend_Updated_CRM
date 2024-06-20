import { NavLink } from "react-router-dom";
import "./login.css";
import Spline from "@splinetool/react-spline";
import { useState } from "react";
import { useAuth } from "../../authContext";
import { useNavigate } from "react-router-dom";

// Extract tenant_id from the URL dynamically within handleSubmit
const getTenantIdFromUrl = () => {
  const pathArray = window.location.pathname.split('/');
  console.log('Path array:', pathArray); // Debugging log
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authenticated, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    setError(""); // Clear previous errors

    console.log('Form submitted');
    console.log('Username:', username);
    console.log('Password:', password);

    const data = {
      username: username,
      password: password,
    };

    console.log('Request data:', data);

    fetch(' https://webappbaackend.azurewebsites.net/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      console.log('Response received:', response);
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Login successful:', data); 
      alert(`Login successful as ${data.role}`);
      login(data.user_id, data.tenant_id, data.role); 

      const tenantId = data.tenant_id;
      console.log('Navigating to:', `/${tenantId}/home`);
      navigate(`/${tenantId}/home`);
    })
    .catch(error => {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
      setIsSubmitting(false);
    });
  };

  return (
    <div className="login" style={{display:'flex',flexDirection:'row'}}>
      
      <div className="container" style={{width:'30%'}}>
        <div className="login_inner">
          <h2 className="login_paragraph">Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form className="login_form" onSubmit={handleSubmit}>
            <label htmlFor="username" className="login_label">
              <input
                className="login_input"
                type="text"
                placeholder="👤 Username"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label htmlFor="password" className="login_label">
              <input
                className="login_input"
                type="password"
                placeholder="🔑 Password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <NavLink className="login_navigate" to="/">
              register?
            </NavLink>
            <button className="login_btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      <div style={{width:'70%'}}>
      <Spline scene="https://prod.spline.design/OmqPiSVCUCyBiIZa/scene.splinecode" />
      </div>
    </div>
  );
};
