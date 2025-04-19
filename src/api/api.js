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
  const response = await api.post(`/refresh`);
  if (response.data && response.data.access_token) {
    return response.data.access_token;
  } else {
    throw new Error("Refresh failed: no access token returned.");
  }
};


// Add auth token to requests
api.interceptors.request.use((config) => {
  try {
    const userKey = localStorage.getItem('currentUserStorageKey');
    const storedUser = userKey ? localStorage.getItem(userKey) : null;
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (user?.accessToken) {
      config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
    } else {
      console.warn("No access token found in localStorage");
    }
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    user = null;
  }
    return config;
  },
  (error) => Promise.reject(error)
);





api.interceptors.response.use(
  response => response,
  async (error) => {
    const prevRequest = error?.config;

    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest._retryCount = prevRequest._retryCount || 0;

      if (prevRequest._retryCount >= 3) {
        console.error("Maximum retry attempts reached");
        return Promise.reject(error);
      }

      prevRequest._retryCount += 1;

      try {
        const newAccessToken = await refreshToken();

        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(prevRequest);

      } catch (error) {
        return Promise.reject(error);
      }
      // prevRequest.sent = true;
      
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
  return await api.post(`/logout`, null, {
    withCredentials: true,
  });
};




export const getUserProfile = async (userId) => {
  return api.get(`/users/${userId}`);
};



export const submitJob = async (userId, jobData) => {
  return api.post('/jobs', {
    ...jobData,
    userId,
  });
};



export const getJobs = async () => {
  return api.get(`/jobs`);
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



// return api.post(`/users/${userId}/jobs`, jobData);


// return api.put(`/users/${userId}/credits`, { 
//   credits: newCreditAmount 
// });

// return api.put(`/credits?userId=${userId}`, {
//   credits: newCreditAmount,
// });

// return api.post(`/users/${userId}/credits/purchase`, purchaseData);

// return api.get(`/users/${userId}/credits/history`);


export const purchaseCredits = async (userId, purchaseData) => {
  return api.patch(`/users/${userId}`, {
    credits: purchaseData.credits,
  });
};


export const getCreditHistory = async (userId) => {
  return api.get(`/creditHistory?userId=${userId}`);
};

export default api;