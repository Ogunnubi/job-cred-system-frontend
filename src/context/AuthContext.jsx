import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config.js';
import { onAuthStateChanged } from 'firebase/auth';
import { updateCredits, getUserByUserId } from '../api/api.js';
import { getUserCreditsStorage, setUserCreditsStorage } from '../utils/handleLocalStorage.js';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {


  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userCredits, setUserCredits] = useState(0);
  const [jobs, setJobs] = useState([]);



  // Store user info including token in localStorage when it changes
  useEffect(() => {
    if (currentUser?.accessToken) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);



  const updateUserCredits = async (userId, newCreditAmount) => {
    try {


      // Call the API to update credits in the backend
      const response = await updateCredits(userId, newCreditAmount);

      
      if (response.data && response.data.credits === newCreditAmount) {
        
        setUserCredits(newCreditAmount);
      

        
        if (currentUser) {
          const userStorageKey = `userCredits-${currentUser.displayName}-${currentUser.uid}`;
          // Also update in localStorage for persistence
          setUserCreditsStorage(userStorageKey, newCreditAmount);
        }
        
        return true;

      } else {
        setError("Failed to update credits on the server");
        return false;
      }
    } catch (error) {
      console.error("Error updating credits:", error);
      setError(error.response?.data?.message || "Error updating credits");
      return false;
    }
  };




  


  useEffect(() => {
    const fetchUserCredits = async () => {

      if (!currentUser) return;
      
      const { userStorageKey, storedCredits } = getUserCreditsStorage(currentUser)


      if(storedCredits) {
        setUserCredits(storedCredits);
      } else if (currentUser.credits) {
        setUserCredits(currentUser.credits);
        setUserCreditsStorage(userStorageKey, currentUser.credits);
      }


      // try {

      //   const currentUserId = currentUser.id;

      //   if (storedCredits) {
      //     setUserCredits(storedCredits);
      //   } else if (currentUser && !currentUser.credits) {
          
      //     const response = await getUserByUserId(currentUserId);
      //     console.log(response);
      //     if (response?.data?.length > 0) {
      //       const user = response.data[0];
      //       setUserCredits(user.credits);
      //       setUserCreditsStorage(userStorageKey, user.credits);
      //     }
      //   } 
      // } catch (error) {
      //   console.error("Error fetching user credits:", error);
      //   setError("Could not load user credits from server.");
      // }  
      
      

    }

    fetchUserCredits();


  }, [currentUser])





  const value = {
    currentUser,
    setLoading,
    loading,
    error,
    setError,
    setCurrentUser,
    updateUserCredits,
    userCredits,
    setUserCredits,
    jobs,
    setJobs
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}