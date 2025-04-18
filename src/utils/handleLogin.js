import {loginUser} from '../api/api.js'
import { setUserCreditsStorage } from './handleLocalStorage.js';

const handleLogin = async (email, password, setError, setLoading, setCurrentUser, navigate, setUserCredits, currentUser) => { 
    
    
    setError("")

    if (!email || !password) {
        setError("Please fill in all fields")
        return
    }

    try {
        
        setLoading(true);

        
        const res = await loginUser({ email, password });

        const { access_token, refresh_token, user } = res.data;

        const userData = {
            ...user,
            accessToken: access_token,
            refreshToken: refresh_token
        };

        setCurrentUser(userData);

        setUserCredits(userData.credits);

        const userStorageKey = `userCredits-${user.email}-${user._id}`;

        setUserCreditsStorage(userStorageKey, user.credits);

        console.log(currentUser);

        navigate('/jobs');

        setError('');

    } catch (error) {
        setError(error.message.detail || 'Failed to sign up');
        console.error(error);
    } finally {
        setLoading(false);
    } 
}


export default handleLogin