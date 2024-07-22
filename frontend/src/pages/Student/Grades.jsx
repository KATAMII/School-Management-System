import React, { useState, useEffect } from 'react';
import TeacherSidebar from './sidebar';
import './Grades.css';
import { apiBase } from '../../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewGrades = () => {
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

 
  return (
    <div className="enter-grades-page">
      <TeacherSidebar />
      <div className="main-content">
        
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

export default ViewGrades;
