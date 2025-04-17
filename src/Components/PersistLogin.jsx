import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import {useRefreshToken} from "../hooks/useRefreshToken";
import { useNavigate } from "react-router-dom";


import React from 'react'

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);

    const refresh = useRefreshToken();

    const {auth} = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error("Error refreshing token:", err);
            } finally {
                setIsLoading(false);
            }
        }


        if (!auth?.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }


    }, [])


    useEffect(() => {
        console.log("isLoading changed:", isLoading);
        console.log("auth:", JSON.stringify(auth?.accessToken));
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