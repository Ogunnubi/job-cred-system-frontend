import axios from 'axios';
import { auth } from '../firebase/config';

const API_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptor to add authentication token to requests
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const createUser = async (userData) => {
  return api.post('/users', userData);
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
    return api.get(`/jobs?userId=${userId}`);
  }
  return api.get('/jobs');
};


export const updateCredits = (userId, newCreditAmount) => {
  // return api.put(`/users/${userId}/credits`, { 
  //   credits: newCreditAmount 
  // });

  return api.patch(`/users/${userId}`, {
    credits: newCreditAmount,
  });
};

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