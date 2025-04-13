import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { createUser, updateCredits } from '../api/api';



const handleSignup = async (email, password, username, setError, setLoading, setCurrentUser, navigate, confirmPassword,setUserCredits) => {
    
    setError('');

    if (!username || !email || !password || !confirmPassword) {
        setError("Please fill in all fields")
        return
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
    }



    try {

        setLoading(true);
    
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        
        await updateProfile(userCredential.user, { displayName: username }); 

        const initialCredits = 200;

        const user = userCredential.user

        
        setCurrentUser(userCredential.user)

        setUserCredits(initialCredits);


        await createUser({
            email,
            username,
            credits: initialCredits,
            userId: user.uid
        });

        

        navigate('/jobs')

        
    } catch (error) {
        
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