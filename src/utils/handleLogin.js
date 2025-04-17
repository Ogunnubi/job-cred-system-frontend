import { auth, signInWithEmailAndPassword } from '../firebase/config';

const handleLogin = async (email, password, setError, setLoading, setCurrentUser, navigate, setUserCredits) => { 
    
    
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