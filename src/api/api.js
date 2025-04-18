import axios from 'axios';


const API_URL = 'http://127.0.0.1:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});



// Add auth token to requests
api.interceptors.request.use((config) => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (user?.accessToken) {
      config.headers['Authorization'] = `Bearer ${user.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
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



// Refresh access token using refresh token cookie
export const refreshToken = async () => {
  return await api.post(`/refresh`, null, {
    withCredentials: true,
  });
};


// Logout user (revoke refresh token and clear cookie)
export const logoutUser = async () => {
  return await api.post(`/logout`, null, {
    withCredentials: true, // 🔑 Send refresh cookie for clearing
  });
};


export const getUserProfile = async (userId) => {
  return api.get(`/users/${userId}`);
};

export const submitJob = async (userId, jobData) => {
  // return api.post(`/users/${userId}/jobs`, jobData);
  return api.post('/jobs', {
    ...jobData,
    userId,
  });
};

export const getJobs = async (userId) => {
  // if (userId) {
  //   return api.get(`/users/${userId}/jobs`)
  // }
  // return api.get('/jobs');
  if (userId) {
    return api.get(`/jobs?userId=${userId}`, {
      withCredentials: true, // 🔑 Send cookies
    });
  }
  return api.get('/jobs', {
    withCredentials: true, // 🔑 Send cookies
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



// return api.put(`/users/${userId}/credits`, { 
//   credits: newCreditAmount 
// });

// return api.put(`/credits?userId=${userId}`, {
//   credits: newCreditAmount,
// });


export const purchaseCredits = async (userId, purchaseData) => {
  // return api.post(`/users/${userId}/credits/purchase`, purchaseData);

  return api.patch(`/users/${userId}`, {
    credits: purchaseData.credits,
  });
};


export const getCreditHistory = async (userId) => {
  // return api.get(`/users/${userId}/credits/history`);
  return api.get(`/creditHistory?userId=${userId}`);
};

export default api;