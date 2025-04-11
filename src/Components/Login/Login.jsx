import { useAuth } from '../../context/AuthContext';
import handleLogin from '../../utils/handleLogin';
import { useNavigate } from 'react-router-dom'



const Login = ({toggleForm}) => {

  const navigate = useNavigate();

  const { 
    setCurrentUser, 
    setLoading, 
    email, 
    password, 
    error,
    setError,
    setPassword
  } = useAuth() // Get setCurrentUser from AuthContext
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password, setError, setLoading, setCurrentUser, navigate);
    } catch (err) {
      console.error('Failed to log in. Please check your credentials.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="row g-3 px-3">
        {error && <div className="alert alert-danger">{error}</div>}
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


        <div className="col-12">
            <button type="submit" className="btn btn-brand" style={{width: "100%"}}>Log in</button>
        </div>

        <p className='text-center mt-3'>
            Don't have an account? <span className="toggle__link" onClick={toggleForm}>Create one</span>
        </p>
    </form>
  )
}

export default Login