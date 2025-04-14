import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { updateCredits, getUserByUserId } from '../api/api.js';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {


  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userCredits, setUserCredits] = useState(0);


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

      console.log(response)
      
      if (response.data && response.data.credits === newCreditAmount) {
        // Update the global state with the new credit amount
        setUserCredits(newCreditAmount);
        
        // Also update in localStorage for persistence
        localStorage.setItem('userCredits', newCreditAmount);
        
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
          const userStorageKey = `userCredits-${currentUser.displayName}-${currentUser.uid}`;
  
          const storedCredits = localStorage.getItem(userStorageKey);
  
          const currentUserId = currentUser.uid;
  
          if (storedCredits) {
            // if we have credits in localStorage, use them
            setUserCredits(parseInt(storedCredits, 10));
          } else if (currentUser) {
            // if we don't have credits in localStorage, fetch from API
            const response = await getUserByUserId(currentUserId);
                  
            if (response?.data?.length > 0) {
              const user = response.data[0];
              setUserCredits(user.credits);
              localStorage.setItem(userStorageKey, user.credits.toString());
            }
          }

        } else {
          const tempCredits = 200;
          setUserCredits(tempCredits);
          localStorage.setItem(userStorageKey, tempCredits.toString());
        }


      } catch (error) {
        console.error("Error fetching user credits:", error);
        setError("Could not load user credits from server.");

        // If no user data is returned from the API, assign 200 credits
        const tempCredits = 200;
        setUserCredits(tempCredits);
        localStorage.setItem(userStorageKey, tempCredits.toString());
      }
    }


  }, [currentUser])





  useEffect(() => {
    const fetchUserCredits = async () => {
      if (currentUser) {
        try {
          // const response = await api.get(`/users?userId=${currentUser.uid}`);

          const userStorageKey = `userCredits-${currentUser.displayName}-${currentUser.uid}`;

          const storedCredits = localStorage.getItem(userStorageKey);

          const currentUserId = currentUser.uid;

          if (storedCredits) {
            setUserCredits(parseInt(storedCredits, 10));
          } else {
            try {
                const response = await getUserByUserId(currentUser.uid);
                
                if (response?.data?.length > 0) {
                  const user = response.data[0];
                  setUserCredits(user.credits);
                  localStorage.setItem(userStorageKey, user.credits.toString());
                } else {
                  // If no user found in API, assign temporary credits
                  const tempCredits = 200;
                  setUserCredits(tempCredits);
                  localStorage.setItem(userStorageKey, tempCredits.toString());
                  console.log(`No user data returned from API, bssigned temporary credits for user: ${currentUser.uid}`);
                }
            } catch (error) {
              // If API fails, assign temporary credits
              const tempCredits = 200;
              setUserCredits(tempCredits);
              localStorage.setItem(userStorageKey, tempCredits.toString());
              console.error("Error fetching user credits:", error);
            } 
          }
        } catch (error) {
          console.error("Error fetching user credits:", error);
          setError("Could not load user credits from server.");
        }
      }
    };
  
    fetchUserCredits();
  }, [currentUser]);



  

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
    setUserCredits
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}