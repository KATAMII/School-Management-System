import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './students.css';
import { apiBase } from '../../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  // State to store the list of students
  const [students, setStudents] = useState([]);
  
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    class: '',
  });
  
  // State to manage loading state
  const [loading, setLoading] = useState(false);
  
  // State to manage error messages
  const [error, setError] = useState('');
  
  // useNavigate hook from react-router-dom to navigate programmatically
  const navigate = useNavigate();

  // Fetch the list of students when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${apiBase}/api/student/students`);
        const data = await response.json();
        if (data.success) {
          setStudents(data.data);
        } else {
          console.error('Failed to fetch students');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStudents();
  }, []);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiBase}/api/student/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Student registered successfully!');
        
        const response = await fetch(`${apiBase}/api/students`);
        const data = await response.json();
        setStudents(data.data);
        
       
        setFormData({
          name: '',
          email: '',
          password: '',
          class: '',
        });
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (e) {
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="students-page">
      <Sidebar />
      <div className="main-content">
        <h2 className='title'>Register Students</h2>
        
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
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Please wait...' : 'Register Student'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <h2 className='title'>Registered Students</h2>
        
        <div className="students-list">
          {students.map((student, index) => (
            <div key={index} className="student-card">
              <h3>{student.name}</h3>
              <p>Email: {student.email}</p>
              <p>Class: {student.class}</p>
              <button className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Students;
