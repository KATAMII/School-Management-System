import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/schoolbg.jpeg';
import logo from '../assets/schoologo.jpeg';
import ChooseUser from './ChooseUser';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate('/ChooseUser');
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
          <button onClick={handleLogin}>SignIn</button>
          <button><Link to="/guest">Guest</Link></button>
        </div>
      </nav>
      <div className="home-body">
        <h1 className='title' id='tit'>School Management System</h1>
        <h1 className='title'>Welcome All </h1>
      </div>
    </div>
  );
}

export default Home;
