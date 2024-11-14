import axios from 'axios';
import { Task } from '../types/types';

//URL_UPDATE
// Fetch the API URL from environment variables
// const API_BASE_URL = 'http://localhost:8080/api'; //backend url
const API_BASE_URL = 'https://tmsbackend.vercel.app/api';

// Create an instance of axios with default configuration
export const axiosInstance = axios.create({
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

export const getTaskDetails = async (taskNumber: string) => {
  const response = await axiosInstance.get(`tasks/${taskNumber}`);
  return response.data;
};

export const addComment = async (taskNumber: string, commentData: { text: string }) => {
  const response = await axiosInstance.post(`tasks/${taskNumber}/comments`, commentData);
  return response.data;
};

export const editComment = async (taskNumber: string, commentId: string, commentData: { text: string }) => {
  const response = await axiosInstance.put(`tasks/${taskNumber}/comments/${commentId}`, commentData);
  return response.data;
};
export const updateTaskDetails = async (taskNumber: string, updatedFields: any) => {
  try {
      const response = await axiosInstance.patch(`tasks/${taskNumber}`, updatedFields);
      return response.data;
  } catch (error) {
      console.error("Error updating task details:", error);
      throw error;
  }
};