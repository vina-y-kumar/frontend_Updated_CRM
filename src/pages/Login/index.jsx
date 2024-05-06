import { NavLink } from "react-router-dom";
import "./login.css";
import Spline from "@splinetool/react-spline";
import { useState } from "react";
import { useAuth } from "../../authContext";


export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authenticated, setAuthenticated } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct the request data
    const data = {
        username: username,
        password: password,
    };

    // Send a POST request to the backend
    fetch('https://backendcrmnurenai.azurewebsites.net/login/', {
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
        // Redirect to the home page
        setAuthenticated(true);
        window.location.href = '/home';
    })
    .catch(error => {
        // Handle login failure
        console.error('Login error:', error);
        alert('Login failed');
    });
};

if (authenticated) {
  // Redirect to the home page if user is authenticated
  window.location.href = '/home';
}

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
        type="text" // Use type="text" for username
        placeholder="👤 Username" // Adjust the placeholder
        id="username" // Use id="username"
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
          id="password" // Correct typo in id attribute
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
