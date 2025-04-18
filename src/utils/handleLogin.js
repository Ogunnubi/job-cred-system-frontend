import {loginUser} from '../api/api.js'

const handleLogin = async (email, password, setError, setLoading, setCurrentUser, navigate, setUserCredits, currentUser) => { 
    
    
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

        const userData = {
            ...response.data.user,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token
        };

        console.log('User created successfully:', response.data);

        setCurrentUser(userData);

        localStorage.setItem('user', JSON.stringify(userData));

        console.log(currentUser);
        
        // setUserCredits(response.data.user.credits);

        navigate('/jobs')


    } catch (error) {
        setError(error.message.detail || 'Failed to sign up');
        console.error(error);
    } finally {
        setLoading(false);
    } 
}


export default handleLogin