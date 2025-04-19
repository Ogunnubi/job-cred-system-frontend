import axios from 'axios';
import { getUserFromStorage } from '../utils/handleLocalStorage';
import { genStorageKey } from '../utils/handleLocalStorage';
import useRefreshToken from '../Hooks/useRefreshToken'; 


const API_URL = 'http://127.0.0.1:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});



// Refresh access token using refresh token cookie
export const refreshToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/refresh`, {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.data && response.data.access_token) {
      return response.data.access_token;
    } else {
      throw new Error("Refresh failed: no access token returned.");
    }
  } catch (error) {
    console.error("Error in refreshToken:", error);
  }
};


// Add auth token to requests
api.interceptors.request.use((config) => {
  try {
    const userKey = localStorage.getItem('currentUserStorageKey');
    const storedUser = userKey ? localStorage.getItem(userKey) : null;
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `bearer ${user?.accessToken}`;
    }
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }
    return config;
  }, (error) => Promise.reject(error)
);





api.interceptors.response.use(
  response => response,
  async (error) => {
    const prevRequest = error?.config;

    if (error?.response?.status === 401 && !prevRequest?._retry) {
      prevRequest._retry = true;


      

      try {
        const newAccessToken = await refreshToken();

        // Update the token in local storage
        const userKey = localStorage.getItem('currentUserStorageKey');
        if (userKey) {
          const storedUser = localStorage.getItem(userKey);
          if (storedUser) {
            const user = JSON.parse(storedUser);
            user.accessToken = newAccessToken;
            localStorage.setItem(userKey, JSON.stringify(user));
          }
        }

        prevRequest.headers['Authorization'] = `bearer ${newAccessToken}`;

        return api(prevRequest);

      } catch (refreshError) {

        // Remove potentially stale token
        const userKey = localStorage.getItem('currentUserStorageKey');
        if (userKey) {
          const storedUser = localStorage.getItem(userKey);
          if (storedUser) {
            const user = JSON.parse(storedUser);
            delete user.accessToken;
            localStorage.setItem(userKey, JSON.stringify(user));
          }
        }
        return Promise.reject(refreshError);
      }      
    }
    return Promise.reject(error);
  }
);



// API functions
export const createUser = async (userData) => {
  return await api.post(`/signup`, userData);
};


// Login user and receive access token (also sets refresh token cookie)
export const loginUser = async (userData) => {
  return await api.post(`/login`, userData, {
    withCredentials: true,
  });
};






// Logout user (revoke refresh token and clear cookie)
export const logoutUser = async () => {
  // return await api.post(`/logout`, null, {
  //   withCredentials: true,
  // });
  try {
    // Send logout request to server
    await api.post(`/logout`, null, {
      withCredentials: true,
    });
  } finally {
    // Always clear local storage, even if server request fails
    const userKey = localStorage.getItem('currentUserStorageKey');
    if (userKey) {
      localStorage.removeItem(userKey);
    }
    localStorage.removeItem('currentUserStorageKey');
    localStorage.removeItem('user');
  }
};




export const getUserProfile = async (userId) => {
  return api.get(`/users/${userId}`);
};



export const submitJob = async (userId, jobData) => {
  return api.post('/jobs', {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }, 
    body: {
      userId,
      ...jobData,
    }
  });
};



export const getJobs = async () => {
  return api.get(`/jobs`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};






// First: Get user by userId
export const getUserByUserId = async (userId) => {
  const res = await api.get(`/users?userId=${userId}`);
  return res.data[0]; // returns an array
};

// Then: Update credits using internal `id`
export const updateCredits = async (userId, newCreditAmount) => {
  const user = await getUserByUserId(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return api.patch(`/users/${user.id}`, {
    credits: newCreditAmount
  });
};





export const purchaseCredits = async (userId, purchaseData) => {
  return api.patch(`/users/${userId}`, {
    credits: purchaseData.credits,
  });
};


export const getCreditHistory = async (userId) => {
  return api.get(`/creditHistory?userId=${userId}`);
};

export default api;