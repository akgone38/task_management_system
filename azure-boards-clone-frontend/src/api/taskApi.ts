import axios from 'axios';
import { Task } from '../types/types';

// Fetch the API URL from environment variables
// const API_BASE_URL = 'http://localhost:5001/api';
const API_BASE_URL = 'https://tmsbackend.vercel.app/api'

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, task); // Adjust the URL as necessary
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};
