import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import "./Announcements.css";
import { apiBase } from "../../../utils/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiBase}/api/announcement/announcements`,
        );
        const data = await response.json();
        if (data.success) {
          setAnnouncements(data.data);
        } else {
          setError("Failed to fetch announcements");
        }
      } catch (error) {
        setError("Error fetching announcements");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="announcements-page">
      <Sidebar />
      <div className="main-content">
        <h1 className="title">Announcements</h1>
        {loading ? (
          <p>Loading announcements...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="announcements-list">
            {announcements.length > 0 ? (
              announcements.map((announcement, index) => (
                <div key={index} className="announcement-card">
                  <h3>{announcement.title}</h3>
                  <p>{announcement.content}</p>
                </div>
              ))
            ) : (
              <p>No announcements available.</p>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentAnnouncements;
