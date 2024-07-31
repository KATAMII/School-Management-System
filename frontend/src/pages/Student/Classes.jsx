import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import "./Classes.css";
import { apiBase } from "../../../utils/config";

const StudentClassesview = () => {
  const [classes, setClasses] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      setFetching(true);
      try {
        const response = await fetch(`${apiBase}/api/class/classes`);
        const data = await response.json();
        if (data.success) {
          setClasses(data.data);
        } else {
          console.error("Failed to fetch classes");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="classes-page">
      <Sidebar />
      <div className="main-content">
        <h1>Classes</h1>
        {fetching ? (
          <div className="loading">Loading Classes...</div>
        ) : (
          <div className="classes-list">
            {classes.map((classItem) => (
              <div key={classItem.id} className="class-card">
                <h3>{classItem.className}</h3>
                <p>Teacher: {classItem.classTeacher}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentClassesview;
