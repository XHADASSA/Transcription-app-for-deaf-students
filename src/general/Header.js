import React from 'react';
import './Header.css';
import header from './header.png';

const Header = () => {
  return (
    <div className="header">
      <img src={header} alt="header" className="header-logo" />
    </div>
  );
};

export default Header;
