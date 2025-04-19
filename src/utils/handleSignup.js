import { createUser, loginUser } from '../api/api';

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

        await createUser({
            email,
            username,
            password
        });

        const response = await loginUser({ email, password });
        
        setCurrentUser(response.data);
        console.log('Signup successful:', response.data.accessToken);
        setUserCredits(response.data.credits);

        navigate('/jobs');
  
    } catch (error) {
        setError(error.message.detail || 'Failed to sign up');
        console.error(error);
    } finally {
        setLoading(false);
    }
}

export default handleSignup