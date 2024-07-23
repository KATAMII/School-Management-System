import React, { useState, useEffect } from 'react';
import TeacherSidebar from './sidebar';
import './grades.css';
import { apiBase } from '../../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EnterGrades = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    marks: '',
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
      const token = getCookie('teacher_access_token');
      console.log('Read cookie:', token); 
      if (!token) {
        setError('No token found');
        console.error('No token found');
        return;
      }
  
      try {
        const response = await fetch(`${apiBase}/api/teacher/students`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include', 
        });
        const data = await response.json();
        console.log('Fetched students:', data); 
        if (response.ok) {
          setStudents(data.students);
        } else {
          console.error('Failed to fetch students:', data.message);
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        setError(error.message);
      }
    };
  

    const fetchGrades = async () => {
        const token = getCookie('teacher_access_token');
        if (!token) {
          setError('No token found');
          return;
        }
  
        try {
          const response = await fetch(`${apiBase}/api/teacher/teacher/grades`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
          });
          const data = await response.json();
          if (response.ok) {
            setGrades(data.grades); 
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError(error.message);
        }
      };
    fetchGrades();
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'marks' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const token = getCookie('teacher_access_token');
    if (!token) {
      setError('No token found');
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`${apiBase}/api/teacher/grades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include', 
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Grade submitted successfully!');
        setFormData({
          studentId: '',
          subject: '',
          marks: '',
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
    <div className="enter-grades-page">
      <TeacherSidebar />
      <div className="main-content">
        <h2 className="title">Enter Grades</h2>
        <form className="grade-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="studentId">Student</label>
            <select
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            >
              <option value="">Select a student</option>
              {students.length > 0 ? (
                students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No students available
                </option>
              )}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="marks">Marks</label>
            <input
              type="number"
              id="marks" 
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Please wait...' : 'Submit Grade'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <h2 className="title">Submitted Grades</h2>
        <div className="grades-list">
          {grades.length > 0 ? (
            grades.map((grade, index) => (
              <div key={index} className="grade-card">
                <h3>{grade.student.name}</h3>
                <p>Subject: {grade.subject}</p>
                <p>Marks: {grade.marks}</p>
              </div>
            ))
          ) : (
            <p>No grades submitted yet.</p>
          )}
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default EnterGrades;
