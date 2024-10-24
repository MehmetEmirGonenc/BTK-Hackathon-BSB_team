import React from 'react';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-center">BSB</div>
      <div className="navbar-right">
        <button className="help-btn">Help</button>
      </div>
    </nav>
  );
};

export default Navbar;