import React from 'react';
import { useNavigate } from 'react-router-dom';
import './chooceuser.css';

function ChooseUser() {
  const navigate = useNavigate();

  function handleLogin(role) {
    navigate(`/${role}`);
  }

  return (
    <div className="choose-user-container">
      <h1>Choose Your Role</h1>
      <div className="card-container">
        <div className="card" onClick={() => handleLogin('Adminsignin')}>
          <h2>Admin</h2>
        </div>
        <div className="card" onClick={() => handleLogin('Studentsignin')}>
          <h2>Student</h2>
        </div>
        <div className="card" onClick={() => handleLogin('Teachersignin')}>
          <h2>Teacher</h2>
        </div>
      </div>
    </div>
  );
}

export default ChooseUser;
