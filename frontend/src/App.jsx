import React, { useState } from 'react';
import Header from './components/navbarComponents/Header';
import Login from './components/loginPages/Login'; // Ensure the correct import path
import Alert from './components/alertPage/Alert';
import Home from './components/homePage/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const MyContext = React.createContext();


function App() {
  const [alert, updateAlert] = useState({
    bg: 'yellow',
    content: 'Login before you start',
    display: 'hidden',
  });

  const [user, updateUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
    <>
      <Router>
        <MyContext.Provider value={{ updateAlert, updateUser, user }}>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Alert alert={alert} />
        </MyContext.Provider>
      </Router>
    </>
  );
}

export default App;
