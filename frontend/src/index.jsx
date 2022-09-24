import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFound from './pages/NotFound';
import Connexion from './pages/Connexion';
import Signup from './pages/Connexion/signup.jsx';
import Login from './pages/Connexion/login.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AuthRoute from './components/AuthRoute.jsx';
import ModifyPost from './components/ModifyPost.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Connexion />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<AuthRoute><Home /></AuthRoute>} />
      <Route path="/home/:id" element={<AuthRoute><ModifyPost /></AuthRoute>} />
      <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />
    </Routes>
  </BrowserRouter>
);
