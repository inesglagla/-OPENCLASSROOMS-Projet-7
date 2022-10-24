import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFound from './pages/NotFound';
import Connexion from './pages/Connexion';
import Signup from './pages/Connexion/signup.jsx';
import Login from './pages/Connexion/login.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AuthRoute from './services/AuthRoute.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Connexion />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<AuthRoute><Home /></AuthRoute>} />
      <Route path="/profile/:id" element={<AuthRoute><Profile /></AuthRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
