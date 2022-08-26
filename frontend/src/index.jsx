import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Connexion from './pages/Connexion'
import Home from './pages/Home'
import Signup from './pages/Connexion/signup.jsx'
import Login from './pages/Connexion/login.jsx'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Connexion />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
