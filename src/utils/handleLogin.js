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
        setError(error.message.detail || 'Failed to sign up');
        console.error(error);
    } finally {
        setLoading(false);
    } 
}


export default handleLogin