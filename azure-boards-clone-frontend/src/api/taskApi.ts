import axios from 'axios';
import { Task } from '../types/types';

// Fetch the API URL from environment variables
// const API_BASE_URL = 'http://localhost:8080/api'; //backend url
const API_BASE_URL = 'https://tmsbackend.vercel.app/api';

// Create an instance of axios with default configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Intercept requests to add the JWT token
axiosInstance.interceptors.request.use(config => {
  // Get the token from local storage
  const token = localStorage.getItem('token');
  console.log('Token:', token); 
  
  if (token) {
    // Add the token to the Authorization header
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

// Fetch tasks
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Create a task
export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const response = await axiosInstance.post('/tasks', task); // Adjust the URL as necessary
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};
