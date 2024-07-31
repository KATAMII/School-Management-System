import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Teachers.css";
import { apiBase } from "../../../utils/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Teachers = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    teachersclass: "",
    subject: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${apiBase}/api/teacher/teachers`);
        const data = await response.json();
        if (data.success) {
          setStudents(data.data);
        } else {
          console.error("Failed to fetch students");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiBase}/api/teacher/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Teacher registered successfully!");
        setStudents([...students, data.data]);
        setFormData({
          name: "",
          email: "",
          password: "",
          teachersclass: "",
          subject: "",
        });
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
    console.log(`Deleting teacher with ID: ${id}`);
    try {
      const response = await fetch(`${apiBase}/api/teacher/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Teacher deleted successfully!");
        setStudents(students.filter((student) => student.id !== id));
      } else {
        toast.error("Failed to delete teacher");
        console.error("Failed to delete teacher:", data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="students-page">
      <Sidebar />
      <div className="main-content">
        <h2 className="title">Register Teachers</h2>
        <form className="student-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="class">Class</label>
            <input
              type="text"
              id="teachersclass"
              name="teachersclass"
              value={formData.teachersclass}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="class">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Please wait..." : "Register Teacher"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <h2 className="title">Registered Teachers</h2>
        {loading ? (
          "loading registered teachers"
        ) : (
          <div className="students-list">
            {students.map((student, index) => (
              <div key={index} className="student-card">
                <h3>{student.name}</h3>
                <p>Email: {student.email}</p>
                <p>Class: {student.teachersclass}</p>
                <p>Subject: {student.subject}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Teachers;
