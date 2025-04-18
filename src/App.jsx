import './App.css'
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from "./Components/Home"
import Indeed from './Components/Indeed/Indeed';
import Credits from './Components/Credits/Credits';

import $ from 'jquery';
import Layout from './Layout/Layout';
window.$ = window.jQuery = $;

// Protected route component
const ProtectedRoute = ({ children }) => {

  const location = useLocation();

  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/" from={{location}} replace  />;
  }
  
  return children;
};

function App() {



  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/credits" 
            element={
              <ProtectedRoute>
                <Credits />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobs" 
            element={
              <ProtectedRoute>
                <Indeed />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
