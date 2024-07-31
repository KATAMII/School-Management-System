import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidebar from "./Sidebar";
import "./Assignment.css";
import { apiBase } from "../../../utils/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);
  const [editAssignment, setEditAssignment] = useState(null);

  const initialValues = {
    title: "",
    content: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    content: Yup.string().required("Required"),
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

    fetchAssignments();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${apiBase}/api/assignment/${editAssignment ? "update" : "create"}`,
        {
          method: editAssignment ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, id: editAssignment?.id }),
        },
      );
      const data = await response.json();
      if (data.success) {
        if (editAssignment) {
          setAssignments(
            assignments.map((assigment) =>
              assigment.id === data.data.id ? data.data : assigment,
            ),
          );
          toast.success("Assignment updated successfully!");
        } else {
          setAssignments([...assignments, data.data]);
          toast.success("Assignment created successfully!");
        }
        resetForm();
        setEditAssignment(null);
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

  const handleDelete = async (id) => {
    console.log(`Deleting assignment with ID: ${id}`);
    try {
      const response = await fetch(`${apiBase}/api/assignment/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Assignment deleted successfully!");
        setAssignments(assignments.filter((assigment) => assigment.id !== id));
      } else {
        toast.error("Failed to delete assigment");
        console.error("Failed to delete assignment:", data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleEdit = (assigment) => {
    setEditAssignment(assigment);
  };

  return (
    <div className="announcements-page">
      <Sidebar />
      <div className="main-content">
        <h1 className="title">Add Assignments</h1>
        <Formik
          initialValues={editAssignment || initialValues}
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
                <ErrorMessage
                  name="content"
                  component="div"
                  className="error"
                />
              </div>
              <button type="submit" className="add-button" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : editAssignment
                    ? "Update Assignment"
                    : "Add Assignment"}
              </button>
              {error && <p className="error">{error}</p>}
            </Form>
          )}
        </Formik>
        <h1 className="title">Assignments</h1>
        {fetching ? (
          <div className="loading">Loading announcements...</div>
        ) : (
          <div className="announcements-list">
            {assignments.map((assignment, index) => (
              <div key={index} className="announcement-card">
                <h3>{assignment.title}</h3>
                <p>{assignment.content}</p>
                <div className="butonsssss">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(assignment)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(assignment.id)}
                  >
                    Delete
                  </button>
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

export default Assignment;
