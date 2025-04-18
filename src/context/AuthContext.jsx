import React, { createContext, useContext, useState, useEffect } from 'react';
import { updateCredits } from '../api/api.js';
import { getUserCreditsStorage, removeUserFromStorage, saveUserToStorage, setUserCreditsStorage } from '../utils/handleLocalStorage.js';
import { genStorageKey } from '../utils/handleLocalStorage.js';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {


  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userCredits, setUserCredits] = useState(0);
  const [jobs, setJobs] = useState([]);



  // save user to localStorage
  useEffect(() => {
    if (currentUser?.accessToken) {

      // Create your dynamic key
      const key = genStorageKey(currentUser);

      // Save the user using dynamic key
      saveUserToStorage(key, currentUser);

      // storing a dynamic key under a fixed key
      localStorage.setItem('currentUserStorageKey', key);
    } else {
     
      const userStorageKey = localStorage.getItem('currentUserStorageKey');
      // remove the user using the dynamic key
      if (userStorageKey) {
        removeUserFromStorage(userStorageKey);
      }
      // Also remove the pointer to the dynamic key
      localStorage.removeItem('currentUserStorageKey');
    }
  }, [currentUser]);



  


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
    }


    setLoading(false)

    fetchUserCredits();

  }, [currentUser])



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