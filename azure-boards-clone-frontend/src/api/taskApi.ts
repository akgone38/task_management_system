const API_BASE_URL = 'http://localhost:5001/api'; // Change to your backend URL
import axios from 'axios';
import { Task } from '../types/types';

// API to fetch tasks
// export const fetchTasks = async (): Promise<Task[]> => {
//   const response = await axios.get('/api/tasks'); // Adjust the URL as necessary
//   return response.data;
// };
// export const fetchTasks = async (): Promise<Task[]> => {
//   const response = await axios.get(`${API_BASE_URL}/tasks`);
//   return response.data;
// };
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// API to create a new task
// export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
//   const response = await axios.post('/api/tasks', task); // Adjust the URL as necessary
//   return response.data;
// };
export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, task); // Adjust the URL as necessary
  return response.data;
};