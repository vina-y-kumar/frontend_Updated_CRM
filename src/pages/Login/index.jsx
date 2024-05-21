import { NavLink } from "react-router-dom";
import "./login.css";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";
import { useAuth } from "../../authContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authenticated, login } = useAuth(); // Using login from useAuth
  const [tenantId, setTenantId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the request data
    const data = {
        username: username,
        password: password,
    };

    // Send a POST request to the backend
    fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
      // Handle successful login response
      alert('Login successful');
      // Update authentication state and store user data
      login(data.user_id); // Assuming your backend returns user data in `data.user`
      // Redirect to the home page with the tenant_id received from the backend
      const tenantId = data.tenant_id;
      navigate(`/${tenantId}/home`);
    })
    .catch(error => {
        // Handle login failure
        console.error('Login error:', error);
        alert('Login failed');
    });
  };

  useEffect(() => {
    if (authenticated) {
      // Redirect to the home page if user is authenticated
      navigate(`/${tenantId}/home`);
    }
  }, [authenticated, navigate]);

  return (
    <div className="login">
      <Spline scene="https://prod.spline.design/ac1BIJRVXqUWMyDz/scene.splinecode" />
      <div className="container">
        <div className="login_inner">
          <h2 className="login_paragraph">Login</h2>
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
            <button className="login_btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
