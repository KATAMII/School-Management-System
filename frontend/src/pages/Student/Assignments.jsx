import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidebar from "./sidebar";
import "./Assignments.css";
import { apiBase } from "../../../utils/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  const initialValues = {
    title: "",
    content: "",
    file: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    content: Yup.string().required("Required"),
    file: Yup.mixed().required("A file is required"),
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      setFetching(true);
      try {
        const response = await fetch(`${apiBase}/api/assignment/assignments`);
        const data = await response.json();
        if (data.success) {
          setAssignments(data.data);
        } else {
          console.error("Failed to fetch assignments");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setFetching(false);
      }
    };

    const fetchStudentDetails = async () => {
      const token = getCookie("student_access_token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(`${apiBase}/api/student/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setStudentId(data.data.id);
        } else {
          console.error("Failed to fetch student details");
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchAssignments();
    fetchStudentDetails();
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("file", values.file);
    formData.append("studentId", studentId);

    try {
      const response = await fetch(`${apiBase}/api/submit/submit`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Assignment submitted successfully!");
        resetForm();
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (e) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assignments-page">
      <Sidebar />
      <div className="main-content">
        <h1 className="title">Assignments</h1>
        {fetching ? (
          <div className="loading">Loading assignments...</div>
        ) : (
          <div className="assignments-list">
            {assignments.map((assignment, index) => (
              <div key={index} className="assignment-card">
                <h3>{assignment.title}</h3>
                <p>{assignment.content}</p>
              </div>
            ))}
          </div>
        )}

        <h1 className="title">Submit Assignment</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="assignment-form">
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <Field type="text" id="title" name="title" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              <div className="form-control">
                <label htmlFor="content">Content</label>
                <Field as="textarea" id="content" name="content" />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-control">
                <label htmlFor="file">File</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage name="file" component="div" className="error" />
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Submit Assignment"}
              </button>
              {error && <p className="error">{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentAssignments;
