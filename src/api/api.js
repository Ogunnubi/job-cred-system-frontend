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

export const getUserProfile = async () => {
  return api.get('/users/me');
};

export const submitJob = async (jobData) => {
  return api.post('/jobs', jobData);
};

export const getJobs = async () => {
  return api.get('/jobs');
};

export const purchaseCredits = async (purchaseData) => {
  return api.post('/credits/purchase', purchaseData);
};

export const getCreditHistory = async () => {
  return api.get('/credits/history');
};

export default api;