import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import dashboardimg from "../../assets/schoolbg.jpeg";
import "./Dashboard.css";
import { apiBase } from "../../../utils/config";

const Dashboard = () => {
  const [data, setData] = useState({
    studentsCount: 0,
    teachersCount: 0,
    assignmentsCount: 0,
    classesCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes, assignmentsRes, classesRes] =
          await Promise.all([
            fetch(`${apiBase}/api/student/count`),
            fetch(`${apiBase}/api/teacher/count`),
            fetch(`${apiBase}/api/assignment/count`),
            fetch(`${apiBase}/api/class/count`),
          ]);

        const studentsData = await studentsRes.json();
        const teachersData = await teachersRes.json();
        const assignmentsData = await assignmentsRes.json();
        const classesData = await classesRes.json();

        setData({
          studentsCount: studentsData.count,
          teachersCount: teachersData.count,
          assignmentsCount: assignmentsData.count,
          classesCount: classesData.count,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="main-content">
        <h1>Dashboard</h1>
        <img
          src={dashboardimg}
          alt="Dashboard Banner"
          className="dashboard-banner"
        />
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h2>Students</h2>
            <p>{data.studentsCount}</p>
          </div>
          <div className="dashboard-card">
            <h2>Teachers</h2>
            <p>{data.teachersCount}</p>
          </div>
          <div className="dashboard-card">
            <h2>Assignments</h2>
            <p>{data.assignmentsCount}</p>
          </div>
          <div className="dashboard-card">
            <h2>Classes</h2>
            <p>{data.classesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
