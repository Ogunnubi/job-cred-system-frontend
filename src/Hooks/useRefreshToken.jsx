import { refreshToken } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useRefreshToken = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const refresh = async () => {
        try {
            const newAccessToken = await refreshToken();
            
            setCurrentUser(prev => {
                if (!prev) return { accessToken: newAccessToken };
                
                return {
                    ...prev,
                    accessToken: newAccessToken
                };
            });
            
            // Also update in localStorage to keep them in sync
            const userKey = localStorage.getItem('currentUserStorageKey');
            if (userKey) {
                const storedUser = localStorage.getItem(userKey);
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    user.accessToken = newAccessToken;
                    localStorage.setItem(userKey, JSON.stringify(user));
                }
            }
            
            return newAccessToken;
        } catch (error) {
            console.error("Error refreshing token:", error);
            // Clear any stale tokens
            localStorage.removeItem('user');
            const userKey = localStorage.getItem('currentUserStorageKey');
            if (userKey) {
                localStorage.removeItem(userKey);
            }
            localStorage.removeItem('currentUserStorageKey');
            
            // Redirect to login
            navigate("/");
            throw error; // Propagate the error
        }
    };

    return refresh;
};

export default useRefreshToken;