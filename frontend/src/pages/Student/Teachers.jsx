import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import './Teachers.css';
import { apiBase } from '../../../utils/config';

const StudentTeachersview = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(`${apiBase}/api/teacher/teachers`);
        const data = await response.json();
        if (data.success) {
          setTeachers(data.data);
        } else {
          console.error('Failed to fetch teachers');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="teachers-page">
      <Sidebar />
      <div className="main-content">
        <h2 className='title'>School Teachers</h2>
        <div className="teachers-list">
          {teachers.map((teacher, index) => (
            <div key={index} className="teacher-card">
              <h3>{teacher.name}</h3>
              <p>Email: {teacher.email}</p>
              <p>Class: {teacher.teachersclass}</p>
              <p>Subject: {teacher.subject}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTeachersview;
