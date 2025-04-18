import './App.css'
import React from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from "./Components/Home"
import Indeed from './Components/Indeed/Indeed';
import Credits from './Components/Credits/Credits';
import Dashboard from './Components/Dashboard/Dashboard';
import PersistLogin from './Components/PersistLogin';
import Layout from './Layout/Layout';

import $ from 'jquery';
window.$ = window.jQuery = $;

console.log("App is rendering!");


// Protected route component
const ProtectedRoute = ({ children }) => {

  const location = useLocation();

  const { currentUser } = useAuth();
  
  if (!currentUser?.accessToken) {
    return <Navigate to="/" state={{from: location}} replace />;
  }
  
  return children;
};





function App() {







  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* Main layout wrapper */}
          <Route element={<Layout />}>
            {/* Route that persists login */}
            <Route element={<PersistLogin />}>
              {/* Home route (index means path="/") */}
              <Route path="/" element={<Home />} />
              
              {/* Protected Routes */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="credits"
                element={
                  <ProtectedRoute>
                    <Credits />
                  </ProtectedRoute>
                }
              />
              <Route
                path="jobs"
                element={
                  <ProtectedRoute>
                    <Indeed />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
