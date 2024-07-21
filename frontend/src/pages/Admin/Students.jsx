import React, { useState ,useEffect} from 'react';
import Sidebar from './Sidebar';
import './students.css';
import { apiBase } from '../../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    studentclass: '',
    teacherId: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

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

  useEffect(() => {
    
    const token = getCookie('teacher_access_token');
    if (token) {
      const parsedToken = JSON.parse(atob(token.split('.')[1]));
      const teacherId = parsedToken.id; 
      setFormData((prevFormData) => ({
        ...prevFormData,
        teacherId
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
        setStudents([...students, formData]);
        setFormData({
          name: '',
          email: '',
          password: '',
          studentclass: '',
          teacherId: '' 
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
              id="studentclass"
              name="studentclass"
              value={formData.studentclass}
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
              <p>Class: {student.studentclass}</p>
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
