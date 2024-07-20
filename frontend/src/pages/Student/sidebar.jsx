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
            <NavLink to="/student/students" className={({ isActive }) => (isActive ? 'active-link' : '')}>Students</NavLink>
          </li>
          <li>
            <NavLink to="/admin/teachers" className={({ isActive }) => (isActive ? 'active-link' : '')}>Teachers</NavLink>
          </li>
          <li>
            <NavLink to="/admin/announcements" className={({ isActive }) => (isActive ? 'active-link' : '')}>Announcements</NavLink>
          </li>
          <li>
            <NavLink to="/admin/assignment" className={({ isActive }) => (isActive ? 'active-link' : '')}>Assignments</NavLink>
          </li>
          <li>
            <NavLink to="/admin/classes" className={({ isActive }) => (isActive ? 'active-link' : '')}>Classes</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
