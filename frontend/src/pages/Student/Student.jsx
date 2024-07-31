import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import "./Students.css";
import { apiBase } from "../../../utils/config";

const StudentStudents = () => {
  const [students, setStudents] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setFetching(true);
      try {
        const response = await fetch(`${apiBase}/api/student/students`);
        const data = await response.json();
        if (data.success) {
          setStudents(data.data);
        } else {
          console.error("Failed to fetch students");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="students-page">
      <Sidebar />
      <div className="main-content">
        <h2 className="title">Registered Students</h2>
        {fetching ? (
          <div className="loading">Loading students...</div>
        ) : (
          <div className="students-list">
            {students.map((student, index) => (
              <div key={index} className="student-card">
                <h3>{student.name}</h3>
                <p>Email: {student.email}</p>
                <p>Class: {student.studentclass}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentStudents;
