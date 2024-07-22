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
  const [fetching, setFetching] = useState(false); 
  const [error, setError] = useState('');
  const [editAnnouncement, setEditAnnouncement] = useState(null); 

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
      setFetching(true); 
      try {
        const response = await fetch(`${apiBase}/api/announcement/announcements`);
        const data = await response.json();
        if (data.success) {
          setAnnouncements(data.data);
        } else {
          console.error('Failed to fetch announcements');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setFetching(false); 
      }
    };

    fetchAnnouncements();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiBase}/api/announcement/${editAnnouncement ? 'update' : 'create'}`, {
        method: editAnnouncement ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, id: editAnnouncement?.id }),
      });
      const data = await response.json();
      if (data.success) {
        if (editAnnouncement) {
          setAnnouncements(announcements.map((announcement) => announcement.id === data.data.id ? data.data : announcement));
          toast.success('Announcement updated successfully!');
        } else {
          setAnnouncements([...announcements, data.data]);
          toast.success('Announcement created successfully!');
        }
        resetForm();
        setEditAnnouncement(null); 
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
    console.log(`Deleting announcement with ID: ${id}`);
    try {
      const response = await fetch(`${apiBase}/api/announcement/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Announcement deleted successfully!');
        setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
      } else {
        toast.error('Failed to delete announcement');
        console.error('Failed to delete announcement:', data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleEdit = (announcement) => {
    setEditAnnouncement(announcement); 
  };

  return (
    <div className="announcements-page">
      <Sidebar />
      <div className="main-content">
        <h1 className='title'>{editAnnouncement ? 'Edit Announcement' : 'Add Announcement'}</h1>
        <Formik
          initialValues={editAnnouncement || initialValues}
          validationSchema={validationSchema}
          enableReinitialize 
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
                {loading ? 'Please wait...' : editAnnouncement ? 'Update Announcement' : 'Add Announcement'}
              </button>
              {error && <p className="error">{error}</p>}
            </Form>
          )}
        </Formik>
        <h1 className='title'>Announcements</h1>
        {fetching ? ( 
          <div className="loading">Loading announcements...</div>
        ) : (
          <div className="announcements-list">
            {announcements.map((announcement, index) => (
              <div key={index} className="announcement-card">
                <h3>{announcement.title}</h3>
                <p>{announcement.content}</p>
                <div className="butonsssss">
                  <button className="edit-button" onClick={() => handleEdit(announcement)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(announcement.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Announcements;
