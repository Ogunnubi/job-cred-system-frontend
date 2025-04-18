import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import useRefreshToken from "../Hooks/useRefreshToken";
import { useNavigate } from "react-router-dom";


import React from 'react'

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(false);

    const {currentUser} = useAuth();

    console.log("Current user in PersistLogin:", currentUser);

    // this will actually return access_token from the /refresh endpoint
    const refresh = useRefreshToken();


    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                setIsLoading(true);
                await refresh();
            } catch (err) {
                console.error("Error refreshing token:", err);
            } finally {
                setIsLoading(false);
            }
        }


        if (!currentUser || !currentUser?.accessToken) {
            // console.log("here")
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }


    }, [])


    useEffect(() => {
        console.log("isLoading changed:", isLoading);
        console.log("auth:", JSON.stringify(currentUser?.accessToken));
    }, [isLoading])

  return (
    <>
        {isLoading ? (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : (
            <Outlet />
        )}
    </>
  )
}

export default PersistLogin