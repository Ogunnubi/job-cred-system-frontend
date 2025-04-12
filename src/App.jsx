import { useState } from 'react'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Signup from './Components/Signup';
import Home from "./Components/Home"
import Login from './Components/Login/Login';
import Jobs from './Components/Jobs/Jobs';

import $ from 'jquery';
import Layout from './Layout/Layout';
window.$ = window.jQuery = $;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {







  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          /> */}
          {/* <Route 
            path="/credits" 
            element={
              <ProtectedRoute>
                <Credits />
              </ProtectedRoute>
            } 
          /> */}
          <Route 
            path="/jobs" 
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            } 
          />
          {/* <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          /> */}
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
