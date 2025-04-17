import { createUser } from '../api/api';


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


        const response = await createUser({
            email,
            username,
            password
        });

        console.log('User created successfully:', response.data);

        setCurrentUser(response.data);
        
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