import axios from "../api/axios";
import useAuth from "./useAuth";
import { logoutUser } from "../api/api";

const useLogout = () => {
    const { setCurrentUser } = useAuth();

    const logout = async () => {
        setCurrentUser({});
        try {
            await logoutUser(); 
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout