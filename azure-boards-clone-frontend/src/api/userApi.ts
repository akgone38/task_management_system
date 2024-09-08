import { User } from '../types/types';

// const API_BASE_URL = 'http://localhost:5001/api'; // Adjust as necessary
const API_BASE_URL = 'https://tmsbackend.vercel.app/api';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};
