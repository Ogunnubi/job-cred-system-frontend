import {loginUser} from '../api/api.js'
import { setUserCreditsStorage } from './handleLocalStorage.js';
import { genStorageKey, saveUserToStorage } from './handleLocalStorage.js';

const handleLogin = async (email, password, setError, setLoading, setCurrentUser, navigate, setUserCredits, currentUser) => { 
    
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
        setUserCredits(userData.credits);

        const dynamicKey = genStorageKey(userData);
        setUserCreditsStorage(dynamicKey, user.credits);
        saveUserToStorage(dynamicKey, userData);

        localStorage.setItem('currentUserStorageKey', dynamicKey);

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