import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/api";
import { useNavigate } from 'react-router-dom';


const useLogout = () => {

    const { setCurrentUser } = useAuth();
    
    const navigate = useNavigate();
    
    const logout = async () => {

        setCurrentUser({});

        await logoutUser(); 

        navigate('/');
    }

    return logout;
}

export default useLogout