import axios from 'axios';
//URL_UPDATE
export const axiosInstance= axios.create({
  // baseURL:'http://localhost:8080/api', //replace backendapi url here
  baseURL:'https://tmsbackend.vercel.app/api', //replace backendapi url here
});
// Add a request interceptor to attach the JWT token to each request
axiosInstance.interceptors.request.use(config => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');
  
  if (token) {
    // If the token exists, add it to the Authorization header
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
}, error => {
  // Handle request error
  return Promise.reject(error);
});

// Fetch user details by user ID
export const getUserDetails = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`/users/users`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch all users', error);
    throw error;
  }
};
