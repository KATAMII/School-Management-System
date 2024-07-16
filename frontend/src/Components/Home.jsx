import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/schoolbg.jpeg';
import logo from '../assets/schoologo.jpeg';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate('/login');
  }

  return (
    <div className="home-container" >
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="School Logo" />
        </div>
        <ul className="navbar-links">
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/why-choose-us">Why Choose Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
        <div className="navbar-buttons">
          <button onClick={handleLogin}>Sign In</button>
          <button><Link to="/guest">Guest Mode</Link></button>
        </div>
      </nav>
      <div className="home-body">
        <h1 className='title'>School Management System</h1>
        <Link to="/admin-register" className="admin-register-link">Admin Register</Link>
      </div>
    </div>
  );
}

export default Home;
