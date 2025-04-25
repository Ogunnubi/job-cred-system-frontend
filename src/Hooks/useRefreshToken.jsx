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
            
            
            return newAccessToken;
        } catch (error) {
            console.error("Error refreshing token:", error);
            navigate("/");
        }
    };

    return refresh;
};

export default useRefreshToken;