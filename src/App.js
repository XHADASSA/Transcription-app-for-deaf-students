import './App.css';
import Connection from './components/Connection';
import DataUpdate from './components/DataUpdate';
import Transcription from './components/Transcription';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import Lesson from './components/Lesson';
import Homepage from './components/Homepage';

import Header from './general/Header'; 
import AllHeader from './general/AllHeader';
import Contact from './general/Contact'

import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { handlePasswordSubmit } from './components/Function';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && <Header />}
      <AllHeader />
      <Routes>
        {/*דף הבית*/}
        <Route path="/" element={<Homepage />} />
        {/*כניסה למערכת*/}
        <Route path="/Welcome" element={<Welcome />} />
        {/*התחברות למערכת*/}
        <Route path="/Connection" element={<Connection handlePasswordSubmit={(password) => handlePasswordSubmit(password, navigate)} />} />
        {/*בחירת מרצה לשיעור*/}
        <Route path="/Lesson" element={<Lesson />} />
        {/*עדכון נתונים */}
        <Route path="/DataUpdate" element={<DataUpdate />} />
        {/*דף תמלול*/}
        <Route path="/Transcription" element={<Transcription />} />
        {/*הרשמה למערכת*/}
        <Route path="/SignUp" element={<SignUp />} />
        {/*צור קשר*/}
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
