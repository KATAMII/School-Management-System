import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import "./Teachers.css";
import { apiBase } from "../../../utils/config";

const StudentTeachersview = () => {
  const [teachers, setTeachers] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      setFetching(true);
      try {
        const response = await fetch(`${apiBase}/api/teacher/teachers`);
        const data = await response.json();
        if (data.success) {
          setTeachers(data.data);
        } else {
          console.error("Failed to fetch teachers");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="teachers-page">
      <Sidebar />
      <div className="main-content">
        <h2 className="title">School Teachers</h2>
        {fetching ? (
          <div className="loading">Loading Teachers...</div>
        ) : (
          <div className="teachers-list">
            {teachers.map((teacher, index) => (
              <div key={index} className="teacher-card">
                <h3>{teacher.name}</h3>
                <p>Email: {teacher.email}</p>
                <p>Class: {teacher.teachersclass}</p>
                <p>Subject: {teacher.subject}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTeachersview;
