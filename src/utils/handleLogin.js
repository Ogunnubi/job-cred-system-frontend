import { auth, signInWithEmailAndPassword } from '../firebase/config';
import {loginUser} from '../api/api.js'

const handleLogin = async (email, password, setError, setLoading, setCurrentUser, navigate, setUserCredits) => { 
    
    
    setError("")

    if (!email || !password) {
        setError("Please fill in all fields")
        return
    }

    try {
        
        setLoading(true);

        
        const response = await loginUser({
            email,
            password
        });

        console.log('User created successfully:', response.data);

        setCurrentUser(response.data.user);
        
        setUserCredits(response.data.user.credits);


        navigate('/jobs') // Redirect to home page after successful login


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