import api from "../api/api"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import { useAuth } from "../context/AuthContext"

const useAxiosPrivate = () => {

    const refresh = useRefreshToken();
    const {currentUser} = useAuth();

    useEffect(() => {

        const requestIntercept = api.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${currentUser?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );


        const responseIntercept = api.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;

                if (!prevRequest.retryCount) {
                    prevRequest.retryCount = 0;
                }

                if (error?.response?.status === 403 && !prevRequest?.sent && prevRequest.retryCount < 2) {
                    prevRequest.retryCount += 1;
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        }

    }, [currentUser, refresh]);


  return api;
}

export default useAxiosPrivate