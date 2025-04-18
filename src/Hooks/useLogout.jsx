import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/api";

const useLogout = () => {
    const { setCurrentUser } = useAuth();

    const logout = async () => {
        
        setCurrentUser({});

        await logoutUser(); 

        navigate('/');
    }

    return logout;
}

export default useLogout