// usersApi.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/userApi';
import { User } from '../../types/types';

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface ErrorResponse {
  message: string;
}

// Fetch all users thunk
export const fetchAllUsers = createAsyncThunk<
  User[], // Return type: array of users
  void,   // No arguments required
  { rejectValue: ErrorResponse } // Rejected type
>(
  'auth/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (!token) {
      return rejectWithValue({ message: 'Unauthorized. Please log in.' });
    }
    
    try {
      const response = await axiosInstance.get<User[]>('/users/users', {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the Authorization header
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch users' });
    }
  }
);

// Register user thunk
export const registerUser = createAsyncThunk<
  AuthResponse, // Return type
  RegisterUserData, // Argument type
  { rejectValue: ErrorResponse } // Rejected type
>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/users/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Registration failed' });
    }
  }
);

// Login user thunk
export const loginUser = createAsyncThunk<
  AuthResponse, 
  LoginCredentials, 
  { rejectValue: ErrorResponse }
>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/users/login', credentials);
      localStorage.setItem('token', response.data.token); // Store token in localStorage after login
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

// Fetch user details thunk
export const fetchUserDetails = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  'auth/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('Unauthorized. Please log in.');
    }
    
    try {
      const response = await axiosInstance.get<User>('/users/user', {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the Authorization header
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user details');
    }
  }
);
