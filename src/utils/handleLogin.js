import {loginUser} from '../api/api.js'


const handleLogin = async (email, password, setError, setLoading, setCurrentUser, navigate) => { 
    
    setError("")

    if (!email || !password) {
        setError("Please fill in all fields")
        return
    }

    try {
        
        setLoading(true);

        const res = await loginUser({ email, password });
        console.log('Login successful:', res.data);
        const { access_token, user } = res.data;
        
        const userData = {
            ...user,
            accessToken: access_token,
        };
        
        
        setCurrentUser(userData);

        localStorage.setItem("authToken", access_token);

        navigate('/jobs', { replace: true });
        setError('');

    } catch (error) {
        setError(error.message.detail || 'Failed to sign up');
        console.error(error);
    } finally {
        setLoading(false);
    } 
}


export default handleLogin