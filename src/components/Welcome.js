import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/welcome.css'

function Welcome () {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome!</h1>
      <div className="welcome-buttons">
        <button onClick={() => navigate('/SignUp')} className="welcome-button">הרשמה</button>
        <button onClick={() => navigate('/Connection')} className="welcome-button">התחברות</button>
      </div>
    </div>
  );
};

export default Welcome;
