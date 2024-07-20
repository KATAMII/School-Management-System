import React, { useState, useEffect } from 'react';
import TeacherSidebar from './sidebar';
import './grades.css';
import { apiBase } from '../../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EnterGrades = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    marks: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${apiBase}/api/teacher/students`, {
          method: 'GET',
          credentials: 'include',  
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch students');
        }

        const data = await response.json();
        setStudents(data.students);
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      }
    };

    fetchStudents();
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
      const response = await fetch(`${apiBase}/api/teacher/grades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit grade');
      }

      const data = await response.json();
      toast.success('Grade submitted successfully!');
      setFormData({
        studentId: '',
        subject: '',
        marks: '',
      });
    } catch (e) {
      setError(e.message);
      toast.error(e.message);
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
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default EnterGrades;
