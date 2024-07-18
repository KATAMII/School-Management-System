import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Sidebar from './Sidebar';
import './Assignment.css';

const Assignment = () => {
  const [announcements, setAnnouncements] = useState([]);

  const initialValues = {
    title: '',
    content: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    setAnnouncements([...announcements, values]);
    resetForm();
  };

  return (
    <div className="announcements-page">
      <Sidebar />
      <div className="main-content">
        <h1 className='tittle'>Add Assignments</h1>
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
              <button type="submit" className="add-button" disabled={isSubmitting}>
                Add Assignment
              </button>
            </Form>
          )}
        </Formik>
        <h1 className='tittle'>Assignments</h1>
        <div className="announcements-list">
         
          <div className="announcement-card">
            <h3>Sample Announcement Title</h3>
            <p>This is the content of the sample announcement. You can edit or delete this announcement.</p>
            <div className="butonsssss">
            <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button>
            </div>
          </div>
          <div className="announcement-card">
            <h3>Sample Announcement Title</h3>
            <p>This is the content of the sample announcement. You can edit or delete this announcement.</p>
            <div className="butonsssss">
            <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button>
            </div>
          </div>
          <div className="announcement-card">
            <h3>Sample Announcement Title</h3>
            <p>This is the content of the sample announcement. You can edit or delete this announcement.</p>
            <div className="butonsssss">
            <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button>
            </div>
          </div>
          <div className="announcement-card">
            <h3>Sample Announcement Title</h3>
            <p>This is the content of the sample announcement. You can edit or delete this announcement.</p>
            <div className="butonsssss">
            <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button>
            </div>
          </div>
          {announcements.map((announcement, index) => (
            <div key={index} className="announcement-card">
              <h3>{announcement.title}</h3>
              <p>{announcement.content}</p>
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignment;
