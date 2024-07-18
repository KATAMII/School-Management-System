import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './classes.css';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [classData, setClassData] = useState({
    className: '',
    classTeacher: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData({
      ...classData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClasses([...classes, classData]);
    setClassData({
      className: '',
      classTeacher: '',
    });
  };

  return (
    <div className="classes-page">
      <Sidebar />
      <div className="main-content">
        <h1>Classes</h1>
        <form className="class-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="className">Class Name</label>
            <input
              type="text"
              id="className"
              name="className"
              value={classData.className}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="classTeacher">Class Teacher</label>
            <input
              type="text"
              id="classTeacher"
              name="classTeacher"
              value={classData.classTeacher}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="add-button">Add Class</button>
        </form>
        <div className="classes-list">
          
          <div className="class-card">
            <h3>Class 10A</h3>
            <p>Teacher: Mr. John Doe</p>
            <button className="delete-button">Delete</button>
          </div>
          <div className="class-card">
            <h3>Class 10A</h3>
            <p>Teacher: Mr. John Doe</p>
            <button className="delete-button">Delete</button>
          </div>
          <div className="class-card">
            <h3>Class 10A</h3>
            <p>Teacher: Mr. John Doe</p>
            <button className="delete-button">Delete</button>
          </div>
          <div className="class-card">
            <h3>Class 10A</h3>
            <p>Teacher: Mr. John Doe</p>
            <button className="delete-button">Delete</button>
          </div>
          
          {classes.map((classItem, index) => (
            <div key={index} className="class-card">
              <h3>{classItem.className}</h3>
              <p>Teacher: {classItem.classTeacher}</p>
             <button className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
