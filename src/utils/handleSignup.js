import { auth, createUserWithEmailAndPassword, updateProfile } from '../firebase/config';

const handleSignup = async (username, email, password, setError, setLoading, setCurrentUser, navigate, confirmPassword) => {
    
    setError('');

    if (!username || !email || !password || !confirmPassword) {
        setError("Please fill in all fields")
        return
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
    }

    // Send data to backend
    try {

        setLoading(true);
    
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update user profile with username
        await updateProfile(userCredential.user, { displayName: username }); 

        // Update AuthContext with the new user
        setCurrentUser(userCredential.user)


        navigate('/jobs') // Redirect to home page after successful login

        
    } catch (error) {
        // Handle specific Firebase errors
        if (error.code === 'auth/email-already-in-use') {
            setError('Email is already in use');
        } else if (error.code === 'auth/weak-password') {
            setError('Password is too weak');
        } else if (error.code === 'auth/invalid-email') {
            setError('Invalid email address');
        } else {
            setError(error.message || 'Failed to create account');
        }
        console.error(error);
        } finally {
        setLoading(false);
    }
}

export default handleSignup