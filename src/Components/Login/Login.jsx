import React from 'react'
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import handleLogin from '../utils/handleLogin';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <form action="row g-3 px-3">
        {/* email input */}
        <div className="mb-3 input-group">
            <input 
                type="email" 
                className="form-control border-start-0 border-end-0" 
                id="emailInput" 
                placeholder='Enter your email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        {/* password input */}
        <div className="mb-3 input-group">
            <input 
                type="password" 
                className="form-control border-start-0 border-end-0" 
                id="passwordInput" 
                required
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>


        <button type="submit" className="btn btn-brand" style={{width: "100%"}}>Log in</button>

        <p className='text-center mt-3'>
            Don't have an account? <span className="toggle__link" onClick={toggleForm}>Create one</span>
        </p>
    </form>
  )
}

export default Login