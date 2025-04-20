import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import useRefreshToken from "../Hooks/useRefreshToken";

const PersistLogin = () => {

    const {currentUser, persist} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    
    const refresh = useRefreshToken();


    useEffect(() => {
        let isMounted = true;


        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error("Error refreshing token:", err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        !currentUser?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        

        return () => isMounted = false;
    }, [])


  return (
    <>
        {
            !persist
                ? <Outlet />
                : isLoading
                    ? <div className="d-flex            justify-content-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    : <Outlet />        
        }
    </>
  )
}

export default PersistLogin