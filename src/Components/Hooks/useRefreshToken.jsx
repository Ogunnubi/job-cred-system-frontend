import {refreshToken} from '../api/api';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setCurrentUser } = useAuth();

    const refresh = async () => {

        const response = await refreshToken();

        setCurrentUser(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    
    return refresh;
};

export default useRefreshToken;