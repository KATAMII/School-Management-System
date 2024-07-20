import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const TeacherSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/teacher/students" className={({ isActive }) => (isActive ? 'active-link' : '')}>Students</NavLink>
          </li>
          <li>
            <NavLink to="/teacher/teachers" className={({ isActive }) => (isActive ? 'active-link' : '')}>Teachers</NavLink>
          </li>
          <li>
            <NavLink to="/teacher/announcements" className={({ isActive }) => (isActive ? 'active-link' : '')}>Announcements</NavLink>
          </li>
          <li>
            <NavLink to="/teacher/assignment" className={({ isActive }) => (isActive ? 'active-link' : '')}>Assignments</NavLink>
          </li>
          <li>
            <NavLink to="/teacher/classes" className={({ isActive }) => (isActive ? 'active-link' : '')}>Classes</NavLink>
          </li>
          <li>
            <NavLink to="/teacher/grades" className={({ isActive }) => (isActive ? 'active-link' : '')}>Enter Grades</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TeacherSidebar;


