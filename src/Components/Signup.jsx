import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createUser } from '../api/api';


const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const authContext = useAuth()
  console.log('Auth context:', authContext)
  const { signup } = authContext // Instead of destructuring directly



  // const { signup } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Create user in Firebase Auth
      const userCredential = await signup(email, password);
      
      // Create user in our backend
      await createUser({
        email,
        password,
        name
      });
      
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account: ' + err.message);
    }
    
    setLoading(false);
  }





  return (
    <div>Signup</div>
  )
}

export default Signup