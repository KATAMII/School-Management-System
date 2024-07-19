import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Sidebar from './Sidebar';
import './Announcement.css';
import { apiBase } from '../../../utils/config'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    title: '',
    content: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
  });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${apiBase}/api/announcements`);
        const data = await response.json();
        if (data.success) {
          setAnnouncements(data.data);
        } else {
          console.error('Failed to fetch announcements');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiBase}/api/announcements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Announcement created successfully!');
        setAnnouncements([...announcements, data.data]);
        resetForm();
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
    <div className="announcements-page">
      <Sidebar />
      <div className="main-content">
        <h1 className='title'>Add Announcement</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="announcement-form">
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <Field type="text" id="title" name="title" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              <div className="form-control">
                <label htmlFor="content">Content</label>
                <Field as="textarea" id="content" name="content" />
                <ErrorMessage name="content" component="div" className="error" />
              </div>
              <button type="submit" className="add-button" disabled={loading}>
                {loading ? 'Please wait...' : 'Add Announcement'}
              </button>
              {error && <p className="error">{error}</p>}
            </Form>
          )}
        </Formik>
        <h1 className='title'>Announcements</h1>
        <div className="announcements-list">
          {announcements.map((announcement, index) => (
            <div key={index} className="announcement-card">
              <h3>{announcement.title}</h3>
              <p>{announcement.content}</p>
              <div className="butonsssss">
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Announcements;
