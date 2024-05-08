import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";
import Spline from "@splinetool/react-spline";
import { useState } from "react";

export const Register = () => {
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const authRegister = () => {
    fetch(`https://backendcrmnurenai.azurewebsites.net/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        role:role,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));
    Navigate("/login");
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
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
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
    </div>
  );
};
