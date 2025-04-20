import axios from 'axios';


export const API_URL = 'http://127.0.0.1:8000';

// Create axios instance
export const createAxiosInstance = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    withCredentials: true,
  });
}



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
// api.interceptors.request.use((config) => {
//   try {
//     const userKey = localStorage.getItem('currentUserStorageKey');
//     const storedUser = userKey ? localStorage.getItem(userKey) : null;
//     const user = storedUser ? JSON.parse(storedUser) : null;

//     if (!config.headers['Authorization']) {
//       config.headers['Authorization'] = `bearer ${user?.accessToken}`;
//     }
//   } catch (error) {
//     console.error('Error parsing user from localStorage:', error);
//   }
//     return config;
//   }, (error) => Promise.reject(error)
// );





// api.interceptors.response.use(
//   response => response,
//   async (error) => {
//     const prevRequest = error?.config;

//     if (error?.response?.status === 401 && !prevRequest?._retry) {
//       prevRequest._retry = true;


      

//       try {
//         const newAccessToken = await refreshToken();

//         // Update the token in local storage
//         const userKey = localStorage.getItem('currentUserStorageKey');
//         if (userKey) {
//           const storedUser = localStorage.getItem(userKey);
//           if (storedUser) {
//             const user = JSON.parse(storedUser);
//             user.accessToken = newAccessToken;
//             localStorage.setItem(userKey, JSON.stringify(user));
//           }
//         }

//         prevRequest.headers['Authorization'] = `bearer ${newAccessToken}`;

//         return api(prevRequest);

//       } catch (refreshError) {

//         // Remove potentially stale token
//         const userKey = localStorage.getItem('currentUserStorageKey');
//         if (userKey) {
//           const storedUser = localStorage.getItem(userKey);
//           if (storedUser) {
//             const user = JSON.parse(storedUser);
//             delete user.accessToken;
//             localStorage.setItem(userKey, JSON.stringify(user));
//           }
//         }
//         return Promise.reject(refreshError);
//       }      
//     }
//     return Promise.reject(error);
//   }
// );



// API functions
export const createUser = async (userData) => {
  const api = createAxiosInstance();
  return await api.post(`/signup`, userData);
};


export const loginUser = async (userData) => {
  const api = createAxiosInstance();
  return await api.post(`/login`, userData);
};


export const logoutUser = async () => {
  const api = createAxiosInstance();
  return await api.post(`/logout`);
};


export const getUserProfile = async (userId) => {
  const api = createAxiosInstance();
  return await api.get(`/users/${userId}`);
};


export const getUserByUserId = async (userId) => {
  const api = createAxiosInstance();
  const res = await api.get(`/users?userId=${userId}`);
  return res.data[0];
};


export const getCreditHistory = async (userId) => {
  const api = createAxiosInstance();
  return await api.get(`/creditHistory?userId=${userId}`);
};


export const purchaseCredits = async (userId, purchaseData) => {
  const api = createAxiosInstance();
  return await api.patch(`/users/${userId}`, {
    credits: purchaseData.credits,
  });
};


// Then: Update credits using internal `id`
export const updateCredits = async (userId, newCreditAmount) => {
  const api = createAxiosInstance();
  const user = await getUserByUserId(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return api.patch(`/users/${user.id}`, {
    credits: newCreditAmount
  });
};


export default createAxiosInstance;