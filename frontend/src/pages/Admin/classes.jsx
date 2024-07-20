import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './classes.css';
import { apiBase } from '../../../utils/config'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [classData, setClassData] = useState({
    className: '',
    classTeacher: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData({
      ...classData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiBase}/api/class/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Class added successfully!');
        setClasses([...classes, data.data]);
        setClassData({
          className: '',
          classTeacher: '',
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

  const handleDelete = async (id) => {
    console.log(`Deleting class with ID: ${id}`);
    try {
      const response = await fetch(`${apiBase}/api/class/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Class deleted successfully!');
        setClasses(classes.filter((classItem) => classItem.id !== id));
      } else {
        toast.error('Failed to delete class');
        console.error('Failed to delete class:', data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error:', error);
    }
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
          <button type="submit" className="add-button" disabled={loading}>
            {loading ? 'Please wait...' : 'Add Class'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <div className="classes-list">
          {classes.map((classItem) => (
            <div key={classItem.id} className="class-card">
              <h3>{classItem.className}</h3>
              <p>Teacher: {classItem.classTeacher}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(classItem.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Classes;
