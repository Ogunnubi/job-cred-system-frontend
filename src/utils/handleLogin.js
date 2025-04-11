
import { useState } from 'react'

import { auth, signInWithEmailAndPassword } from '../firebase/config';
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


const navigate = useNavigate();

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [showPassword, setShowPassword] = useState(false)
const [error, setError] = useState("")


const { setCurrentUser, setLoading } = useAuth() // Get setCurrentUser from AuthContext


const handleLogin = async () => { 
    
    e.preventDefault()
    setError("")

    if (!email || !password) {
        setError("Please fill in all fields")
        return
    }

    try {
        
        setLoading(true);


        // Sign in with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Update AuthContext with the new user
        setCurrentUser(userCredential.user)


        navigate('/home') // Redirect to home page after successful login


    } catch (error) {
        // Handle specific Firebase errors
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            setError('Invalid email or password');
        } else if (error.code === 'auth/invalid-email') {
            setError('Invalid email address');
        } else if (error.code === 'auth/too-many-requests') {
            setError('Too many failed login attempts. Please try again later.');
        } else {
            setError(error.message || 'Failed to sign in');
        }
        console.error(error);
    } finally {
        setLoading(false);
    } 
}


export default handleLogin