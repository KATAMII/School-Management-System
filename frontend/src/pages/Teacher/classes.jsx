import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import './classes.css';
import { apiBase } from '../../../utils/config'; 

const Classesview = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${apiBase}/api/class/classes`);
        const data = await response.json();
        if (data.success) {
          setClasses(data.data);
        } else {
          console.error('Failed to fetch classes');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="classes-page">
      <Sidebar />
      <div className="main-content">
        <h1>Classes</h1>
        <div className="classes-list">
          {classes.map((classItem) => (
            <div key={classItem.id} className="class-card">
              <h3>{classItem.className}</h3>
              <p>Teacher: {classItem.classTeacher}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classesview;
