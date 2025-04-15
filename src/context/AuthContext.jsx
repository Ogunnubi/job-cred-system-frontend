import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { updateCredits, getUserByUserId } from '../api/api.js';
import { getUserCreditsStorage, setUserCreditsStorage } from '../utils/handleLocalStorage.js';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {


  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userCredits, setUserCredits] = useState(0);
  const [jobs, setJobs] = useState([]);



  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }




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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    const fetchUserCredits = async () => {
      try {
        if (currentUser) {
          
          const { userStorageKey, storedCredits }= getUserCreditsStorage(currentUser)
  
          const currentUserId = currentUser.uid;
  
          if (storedCredits) {
            
            setUserCredits(storedCredits);

          } else if (currentUser && !currentUser.credits) {
            
            const response = await getUserByUserId(currentUserId);
                  
            if (response?.data?.length > 0) {
              const user = response.data[0];
              setUserCredits(user.credits);
              setUserCreditsStorage(userStorageKey, user.credits);
            }
          } 

        }

      } catch (error) {
        console.error("Error fetching user credits:", error);
        setError("Could not load user credits from server.");
      }
    }

    fetchUserCredits();


  }, [currentUser])





 




  const value = {
    currentUser,
    signup,
    login,
    logout,
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