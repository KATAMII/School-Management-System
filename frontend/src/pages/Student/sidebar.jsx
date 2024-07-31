import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
import AuthContext from "../../../../server/Authentication/authentication";

const Sidebar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/ChooseUser");
  };
  return (
    <div className="sidebar">
      <h2>Students Dashboard</h2>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/student/students"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/teachers"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Teachers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/announcements"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Announcements
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/assignment"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Assignments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/classes"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/grades"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              grades
            </NavLink>
          </li>
          <button className="btnn" onClick={handleLogout}>
            Log Out
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
