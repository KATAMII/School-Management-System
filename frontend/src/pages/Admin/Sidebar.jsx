import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/students" activeClassName="active-link">Students</NavLink>
          </li>
          <li>
            <NavLink to="/admin/teachers" activeClassName="active-link">Teachers</NavLink>
          </li>
          <li>
            <NavLink to="/admin/announcements" activeClassName="active-link">Announcements</NavLink>
          </li>
          <li>
            <NavLink to="/admin/assignment" activeClassName="active-link">Assignments</NavLink>
          </li>
          <li>
            <NavLink to="/admin/classes" activeClassName="active-link">Classes</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
