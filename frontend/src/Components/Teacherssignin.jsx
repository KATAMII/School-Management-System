
import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './adminsigin.css';
import { useNavigate } from 'react-router-dom';
import { apiBase } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../server/Authentication/authentication';


const Teachersignin = () => {
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/api/teacher/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success) {
        document.cookie = `student_access_token=${data.token}; path=/`;
        localStorage.setItem('user_id', data.data.id);
        setIsLoggedIn(true);
        navigate('/teacher/dashboard');
        toast.success('Student logged in successfully!');
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password should be minimum 6 characters').required('Required'),
  });


  return (
    <div className="admin-register-container">
      <h1>Teacher Login</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="form">
          
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          
          <button to='/Admin/Dashboard'>Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Teachersignin ;
