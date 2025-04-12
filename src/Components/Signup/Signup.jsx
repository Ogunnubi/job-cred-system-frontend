import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import handleSignup from '../../utils/handleSignup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

const Signup = ({toggleForm}) => {

    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const navigate = useNavigate();
    
      const { 
        setCurrentUser, 
        setLoading, 
        email, 
        setEmail,
        password, 
        setError,
        setPassword
    } = useAuth() // Get setCurrentUser from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await handleSignup(email, password, setError, setLoading, setCurrentUser, navigate);
        } catch (err) {
          console.error('Failed to log in. Please check your credentials.');
        }
    };



  return (
    <form onSubmit={handleSubmit} action="row g-3 px-3">
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
            <span
                className="input-group-text cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
        </div>


        {/* confirm password input */}
        <div className="mb-3 input-group">
            <input 
                type={showConfirmPassword ? "text" : "password"} 
                className="form-control border-start-0 border-end-0" 
                id="passwordInput" 
                required
                placeholder='Confirm your password again'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
                className="input-group-text border-start-0 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
                {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
        </div>


        <button 
            type="submit" 
            className="btn btn-brand" 
            style={{width: "100%"}}
        >
            Create Account
        </button>

        <p className='text-center mt-3'>
            Already have an account ? <span className="toggle__link" onClick={toggleForm}>Log In</span>
        </p>
    </form>
  )
}

export default Signup