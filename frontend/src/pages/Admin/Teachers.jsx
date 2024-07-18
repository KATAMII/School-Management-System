import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Teachers.css';

const Teachers = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    class: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents([...students, formData]);
    setFormData({
      name: '',
      email: '',
      password: '',
      class: '',
    });
  };

  return (
    <div className="students-page">
      <Sidebar />
      <div className="main-content">
      <h2 className='title'>Register Teachers</h2>
        <form className="student-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
      
          <div className="form-control">
            <label htmlFor="class">Class</label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="class">Subject</label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">Register Student</button>
        </form>
        <h2 className='title'>Registered Teachers</h2>
        <div className="students-list">
          <div className="student-card">
            <h3>John Doe</h3>
            <p>Email: johndoe@example.com</p>
            <p>Class: 10A</p>
            <p>Subject: Mathematics</p>
            <button className="delete-button">Delete</button>
          </div>
          <div className="student-card">
            <h3>John Doe</h3>
            <p>Email: johndoe@example.com</p>
            <p>Class: 10A</p>
            <p>Subject: Mathematics</p>
            <button className="delete-button">Delete</button>
          </div>
          <div className="student-card">
            <h3>John Doe</h3>
            <p>Email: johndoe@example.com</p>
            <p>Class: 10A</p>
            <button className="delete-button">Delete</button>
          </div>
          <div className="student-card">
            <h3>John Doe</h3>
            <p>Email: johndoe@example.com</p>
            <p>Class: 10A</p>
          </div>
          <div className="student-card">
            <h3>John Doe</h3>
            <p>Email: johndoe@example.com</p>
            <p>Class: 10A</p>
          </div>
          <div className="student-card">
            <h3>John Doe</h3>
            <p>Email: johndoe@example.com</p>
            <p>Class: 10A</p>
          </div>
          <div className="student-card">
            <h3>John Doe</h3>
            <p>Email: johndoe@example.com</p>
            <p>Class: 10A</p>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Teachers;
