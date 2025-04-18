import {refreshToken} from '../api/api';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const useRefreshToken = () => {


    const navigate = useNavigate();

    const { setCurrentUser } = useAuth();

    const refresh = async () => {

        try {
            const response = await refreshToken();

            if (!response?.data?.access_token) {
                throw new Error('Invalid refresh token response');
            }

            setCurrentUser(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.access_token);
                return {
                    ...prev,
                    accessToken: response.data.access_token
                }
            });
            return response.data.access_token;
        } catch (error) {
            localStorage.removeItem('user');
            console.error("Error refreshing token:", error);
            navigate("/")
        }
    }

    return refresh;
};

export default useRefreshToken;